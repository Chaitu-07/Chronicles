from flask import Blueprint, jsonify, request
from sqlalchemy import cast, Text

from app import db
from app.models import HistoricalRecord


api = Blueprint(
    "api",
    __name__,
    url_prefix="/api"
)


# =========================================
# HEALTH CHECK
# =========================================

@api.get("/health")
def health_check():

    return jsonify({
        "status": "success",
        "message": "Chronicles API is running"
    })


# =========================================
# GET ALL RECORDS / SEARCH RECORDS
# =========================================

@api.get("/records")
def get_records():

    query = request.args.get(
        "q",
        "",
        type=str
    ).strip()


    # =====================================
    # SEARCH
    # =====================================

    if query:

        search_term = f"%{query}%"

        records = HistoricalRecord.query.filter(
            db.or_(
                HistoricalRecord.title.ilike(search_term),

                HistoricalRecord.description.ilike(
                    search_term
                ),

                HistoricalRecord.location.ilike(
                    search_term
                ),

                HistoricalRecord.category.ilike(
                    search_term
                ),

                HistoricalRecord.slug.ilike(
                    search_term
                ),

                # Search inside JSON keywords
                cast(
                    HistoricalRecord.keywords,
                    Text
                ).ilike(search_term)
            )
        ).order_by(
            HistoricalRecord.id
        ).all()


    # =====================================
    # GET ALL RECORDS
    # =====================================

    else:

        records = HistoricalRecord.query.order_by(
            HistoricalRecord.id
        ).all()


    return jsonify([
        record.to_dict()
        for record in records
    ])


# =========================================
# GET SINGLE RECORD
# =========================================

@api.get("/records/<string:slug>")
def get_record(slug):

    record = HistoricalRecord.query.filter_by(
        slug=slug
    ).first()


    if record is None:

        return jsonify({
            "status": "error",
            "message": "Historical record not found"
        }), 404


    return jsonify(
        record.to_dict()
    )


# =========================================
# GET RECORDS BY TYPE
# =========================================

@api.get("/records/type/<string:record_type>")
def get_records_by_type(record_type):

    records = HistoricalRecord.query.filter_by(
        type=record_type
    ).order_by(
        HistoricalRecord.id
    ).all()


    return jsonify([
        record.to_dict()
        for record in records
    ])