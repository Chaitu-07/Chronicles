import RelatedLink from "./RelatedLink";

function PlaceProfile({ place }) {

  const relatedPeople = Array.isArray(place.relatedPeople)
    ? place.relatedPeople
    : [];

  const relatedPlaces = Array.isArray(place.relatedPlaces)
    ? place.relatedPlaces
    : [];

  const majorEvents = Array.isArray(place.majorEvents)
    ? place.majorEvents
    : [];

  const relatedEntities = Array.isArray(place.relatedEntities)
    ? place.relatedEntities
    : [];


  return (
    <div className="place-profile">

      {/* =========================
          OVERVIEW
      ========================= */}

      <section className="profile-section">

        <p className="column-label">
          OVERVIEW
        </p>

        <p className="profile-biography">
          {place.overview ||
            place.description ||
            "No overview available."}
        </p>

      </section>


      {/* =========================
          LOCATION DETAILS
      ========================= */}

      <section className="profile-section">

        <p className="column-label">
          LOCATION DETAILS
        </p>

        <div className="profile-info-grid">

          <div className="profile-info-item">

            <span>
              REGION
            </span>

            <strong>
              {place.region ||
                place.location ||
                "Unknown"}
            </strong>

          </div>


          <div className="profile-info-item">

            <span>
              TYPE
            </span>

            <strong>
              {place.placeType ||
                place.category ||
                "Historical Place"}
            </strong>

          </div>


          <div className="profile-info-item">

            <span>
              PERIOD
            </span>

            <strong>
              {place.period ||
                place.date ||
                "Ancient – Present"}
            </strong>

          </div>

        </div>

      </section>


      {/* =========================
          HISTORICAL SIGNIFICANCE
      ========================= */}

      {place.significance && (

        <section className="profile-section">

          <p className="column-label">
            HISTORICAL SIGNIFICANCE
          </p>

          <p className="profile-biography">
            {place.significance}
          </p>

        </section>

      )}


      {/* =========================
          HISTORICAL ASSOCIATIONS
      ========================= */}

      {relatedPeople.length > 0 && (

        <section className="profile-section">

          <p className="column-label">
            HISTORICAL FIGURES
          </p>

          <div className="profile-tags">

            {relatedPeople.map((person) => (

              <RelatedLink
                item={person}
                key={person.slug}
              />

            ))}

          </div>

        </section>

      )}


      {/* =========================
          RELATED PLACES
      ========================= */}

      {relatedPlaces.length > 0 && (

        <section className="profile-section">

          <p className="column-label">
            RELATED PLACES
          </p>

          <div className="profile-tags">

            {relatedPlaces.map((relatedPlace) => (

              <RelatedLink
                item={relatedPlace}
                key={relatedPlace.slug}
              />

            ))}

          </div>

        </section>

      )}


      {/* =========================
          HISTORICAL EVENTS
      ========================= */}

      {majorEvents.length > 0 && (

        <section className="profile-section">

          <p className="column-label">
            HISTORICAL EVENTS
          </p>

          <div className="profile-tags">

            {majorEvents.map((event) => (

              <RelatedLink
                item={event}
                key={event.slug}
              />

            ))}

          </div>

        </section>

      )}


      {/* =========================
          HISTORICAL POWERS
      ========================= */}

      {relatedEntities.length > 0 && (

        <section className="profile-section">

          <p className="column-label">
            HISTORICAL POWERS
          </p>

          <div className="profile-tags">

            {relatedEntities.map((entity) => (

              <RelatedLink
                item={entity}
                key={entity.slug}
              />

            ))}

          </div>

        </section>

      )}

    </div>
  );
}

export default PlaceProfile;