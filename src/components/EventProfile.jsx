import RelatedLink from "./RelatedLink";

function EventProfile({ event }) {
  return (
    <div className="event-profile">

      {/* =========================
          OVERVIEW
      ========================= */}

      <section className="profile-section">

        <p className="column-label">
          OVERVIEW
        </p>

        <p className="profile-biography">
          {event.overview || event.description}
        </p>

      </section>


      {/* =========================
          EVENT DETAILS
      ========================= */}

      <section className="profile-section">

        <p className="column-label">
          EVENT DETAILS
        </p>

        <div className="profile-info-grid">

          <div className="profile-info-item">

            <span>
              DATE
            </span>

            <strong>
              {event.date || "Unknown"}
            </strong>

          </div>


          <div className="profile-info-item">

            <span>
              PERIOD
            </span>

            <strong>
              {event.period || "Historical Period"}
            </strong>

          </div>


          <div className="profile-info-item">

            <span>
              REGION
            </span>

            <strong>
              {event.region || event.location || "Unknown"}
            </strong>

          </div>

        </div>

      </section>


      {/* =========================
          HISTORICAL SIGNIFICANCE
      ========================= */}

      {event.significance && (

        <section className="profile-section">

          <p className="column-label">
            HISTORICAL SIGNIFICANCE
          </p>

          <p className="profile-biography">
            {event.significance}
          </p>

        </section>

      )}


      {/* =========================
          TIMELINE
      ========================= */}

      {event.timeline &&
        event.timeline.length > 0 && (

          <section className="profile-section">

            <p className="column-label">
              EVENT TIMELINE
            </p>

            <div className="profile-event-list">

              {event.timeline.map((item, index) => (

                <div
                  className="profile-event"
                  key={`${item.date}-${index}`}
                >

                  <span className="profile-event-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>

                    <strong>
                      {item.date}
                    </strong>

                    <p>
                      {item.description}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </section>

        )}


      {/* =========================
          KEY FIGURES
      ========================= */}

      {event.relatedPeople &&
        event.relatedPeople.length > 0 && (

          <section className="profile-section">

            <p className="column-label">
              KEY FIGURES
            </p>

            <div className="profile-tags">

              {event.relatedPeople.map((person) => (

                <RelatedLink
                  item={person}
                  key={person.slug}
                />

              ))}

            </div>

          </section>

        )}


      {/* =========================
          IMPORTANT PLACES
      ========================= */}

      {event.relatedPlaces &&
        event.relatedPlaces.length > 0 && (

          <section className="profile-section">

            <p className="column-label">
              IMPORTANT PLACES
            </p>

            <div className="profile-tags">

              {event.relatedPlaces.map((place) => (

                <RelatedLink
                  item={place}
                  key={place.slug}
                />

              ))}

            </div>

          </section>

        )}


      {/* =========================
          RELATED HISTORY
      ========================= */}

      {event.relatedEntities &&
        event.relatedEntities.length > 0 && (

          <section className="profile-section">

            <p className="column-label">
              RELATED HISTORY
            </p>

            <div className="profile-tags">

              {event.relatedEntities.map((entity) => (

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

export default EventProfile;