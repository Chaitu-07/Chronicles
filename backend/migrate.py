import json
from pathlib import Path

from app import create_app, db
from app.models import HistoricalRecord


# =========================================
# PATH TO EXPORTED DATA
# =========================================

DATA_FILE = (
    Path(__file__).resolve().parent.parent
    / "migration"
    / "historicalData.json"
)


# =========================================
# LOAD FLASK APP
# =========================================

app = create_app()


# =========================================
# LOAD JSON
# =========================================

if not DATA_FILE.exists():

    print("ERROR: historicalData.json was not found.")

    print(f"Expected location: {DATA_FILE}")

    raise SystemExit(1)


with open(
    DATA_FILE,
    "r",
    encoding="utf-8"
) as file:

    records = json.load(file)


print(
    f"Found {len(records)} records to migrate."
)


# =========================================
# MIGRATION
# =========================================

with app.app_context():

    inserted = 0
    updated = 0
    skipped = 0

    for data in records:

        slug = data.get("slug")

        if not slug:

            print(
                "SKIPPED record without slug:",
                data.get("title")
            )

            skipped += 1

            continue


        # -------------------------------------
        # FIND EXISTING RECORD
        # -------------------------------------

        record = HistoricalRecord.query.filter_by(
            slug=slug
        ).first()


        # -------------------------------------
        # CREATE OR UPDATE
        # -------------------------------------

        if record is None:

            record = HistoricalRecord(
                type=data.get("type"),
                slug=slug,
                title=data.get("title")
            )

            db.session.add(record)

            inserted += 1

            action = "INSERTED"

        else:

            updated += 1

            action = "UPDATED"


        # -------------------------------------
        # BASIC INFORMATION
        # -------------------------------------

        record.type = data.get(
            "type",
            record.type
        )

        record.title = data.get(
            "title",
            record.title
        )

        record.subtitle = data.get(
            "subtitle"
        )

        record.description = data.get(
            "description"
        )

        record.date = data.get(
            "date"
        )

        record.location = data.get(
            "location"
        )

        record.category = data.get(
            "category"
        )


        # -------------------------------------
        # DETAILED INFORMATION
        # -------------------------------------

        record.overview = data.get(
            "overview"
        )

        record.period = data.get(
            "period"
        )

        record.region = data.get(
            "region"
        )

        record.significance = data.get(
            "significance"
        )


        # -------------------------------------
        # JSON FIELDS
        # -------------------------------------

        record.timeline = data.get(
            "timeline",
            []
        )

        record.related_people = data.get(
            "relatedPeople",
            []
        )

        record.related_places = data.get(
            "relatedPlaces",
            []
        )

        record.related_entities = data.get(
            "relatedEntities",
            []
        )

        record.keywords = data.get(
            "keywords",
            []
        )


        print(
            f"{action}: {record.type} - {record.title}"
        )


    # =========================================
    # SAVE EVERYTHING
    # =========================================

    try:

        db.session.commit()

    except Exception as error:

        db.session.rollback()

        print()
        print("MIGRATION FAILED")
        print(error)

        raise SystemExit(1)


    # =========================================
    # SUMMARY
    # =========================================

    print()
    print("=" * 50)
    print("MIGRATION COMPLETE")
    print("=" * 50)

    print(f"Total records : {len(records)}")
    print(f"Inserted      : {inserted}")
    print(f"Updated       : {updated}")
    print(f"Skipped       : {skipped}")
    print("=" * 50)