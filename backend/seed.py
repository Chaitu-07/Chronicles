from app import create_app, db
from app.models import HistoricalRecord


app = create_app()


with app.app_context():

    record = HistoricalRecord(
        id=23,

        type="Event",

        slug="recapture-of-jerusalem",

        title="Recapture of Jerusalem",

        subtitle="1187 AD",

        description=(
            "Saladin's forces recaptured Jerusalem after "
            "the city's surrender."
        ),

        date="October 1187 AD",

        location="Jerusalem",

        category="Military Event",

        overview=(
            "Following the decisive victory at Hattin, "
            "Saladin's forces advanced through the Kingdom "
            "of Jerusalem. The city itself was besieged "
            "and eventually surrendered in October 1187."
        ),

        period="High Medieval Period",

        region="Levant",

        significance=(
            "The recapture of Jerusalem transformed the "
            "political balance of the Crusader states and "
            "became one of the defining moments of "
            "Saladin's career."
        ),

        timeline=[
            {
                "date": "July 1187",
                "description": (
                    "Saladin defeated the main Crusader "
                    "field army at Hattin."
                )
            },
            {
                "date": "September 1187",
                "description": (
                    "Ayyubid forces reached Jerusalem "
                    "and began the siege."
                )
            },
            {
                "date": "October 1187",
                "description": (
                    "Jerusalem surrendered to "
                    "Saladin's forces."
                )
            }
        ],

        related_people=[
            {
                "title": "Saladin",
                "type": "Person",
                "slug": "saladin"
            }
        ],

        related_places=[
            {
                "title": "Jerusalem",
                "type": "Place",
                "slug": "jerusalem"
            },
            {
                "title": "Hattin",
                "type": "Place",
                "slug": "hattin"
            }
        ],

        related_entities=[
            {
                "title": "Ayyubid Sultanate",
                "type": "Empire",
                "slug": "ayyubid-sultanate"
            },
            {
                "title": "Kingdom of Jerusalem",
                "type": "Empire",
                "slug": "kingdom-of-jerusalem"
            }
        ],

        keywords=[
            "jerusalem",
            "saladin",
            "1187",
            "ayyubid",
            "crusades"
        ]
    )

    db.session.add(record)

    db.session.commit()

    print(
        "Full Recapture of Jerusalem record added successfully."
    )