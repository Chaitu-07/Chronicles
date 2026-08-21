from app import db


class HistoricalRecord(db.Model):
    __tablename__ = "historical_records"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    type = db.Column(
        db.String(50),
        nullable=False
    )

    slug = db.Column(
        db.String(150),
        unique=True,
        nullable=False
    )

    title = db.Column(
        db.String(200),
        nullable=False
    )

    subtitle = db.Column(
        db.String(300)
    )

    description = db.Column(
        db.Text
    )

    date = db.Column(
        db.String(100)
    )

    location = db.Column(
        db.String(200)
    )

    category = db.Column(
        db.String(100)
    )

    # ========================================
    # DETAILED HISTORICAL INFORMATION
    # ========================================

    overview = db.Column(
        db.Text
    )

    period = db.Column(
        db.String(200)
    )

    region = db.Column(
        db.String(200)
    )

    significance = db.Column(
        db.Text
    )

    # ========================================
    # JSON DATA
    # ========================================

    timeline = db.Column(
        db.JSON
    )

    related_people = db.Column(
        db.JSON
    )

    related_places = db.Column(
        db.JSON
    )

    related_entities = db.Column(
        db.JSON
    )

    keywords = db.Column(
        db.JSON
    )

    # ========================================
    # CONVERT DATABASE RECORD TO DICTIONARY
    # ========================================

    def to_dict(self):

        return {
            "id": self.id,
            "type": self.type,
            "slug": self.slug,
            "title": self.title,
            "subtitle": self.subtitle,
            "description": self.description,
            "date": self.date,
            "location": self.location,
            "category": self.category,

            "overview": self.overview,
            "period": self.period,
            "region": self.region,
            "significance": self.significance,

            "timeline": self.timeline or [],
            "relatedPeople": self.related_people or [],
            "relatedPlaces": self.related_places or [],
            "relatedEntities": self.related_entities or [],
            "keywords": self.keywords or [],
        }