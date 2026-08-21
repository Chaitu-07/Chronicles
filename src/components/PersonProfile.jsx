import RelatedLink from "./RelatedLink";

function PersonProfile({ person }) {

  const relatedPeople = Array.isArray(person.relatedPeople)
    ? person.relatedPeople
    : [];

  const relatedPlaces = Array.isArray(person.relatedPlaces)
    ? person.relatedPlaces
    : [];

  const relatedEntities = Array.isArray(person.relatedEntities)
    ? person.relatedEntities
    : [];

  const titles = Array.isArray(person.titles)
    ? person.titles
    : [];

  const majorEvents = Array.isArray(person.majorEvents)
    ? person.majorEvents
    : [];


  return (
    <div className="person-profile">

      {/* =========================
          BIOGRAPHY
      ========================= */}

      <section className="profile-section">

        <p className="column-label">
          BIOGRAPHY
        </p>

        <p className="profile-biography">
          {person.biography ||
            person.overview ||
            person.description ||
            "No biography available."}
        </p>

      </section>


      {/* =========================
          LIFE
      ========================= */}

      <section className="profile-section">

        <p className="column-label">
          LIFE
        </p>

        <div className="profile-info-grid">

          <div className="profile-info-item">

            <span>
              DATE
            </span>

            <strong>
              {person.date || "Unknown"}
            </strong>

          </div>


          <div className="profile-info-item">

            <span>
              BIRTHPLACE
            </span>

            <strong>
              {person.location || "Unknown"}
            </strong>

          </div>


          <div className="profile-info-item">

            <span>
              CATEGORY
            </span>

            <strong>
              {person.category || "Historical Figure"}
            </strong>

          </div>

        </div>

      </section>


      {/* =========================
          TITLES
      ========================= */}

      {titles.length > 0 && (

        <section className="profile-section">

          <p className="column-label">
            TITLES
          </p>

          <div className="profile-tags">

            {titles.map((title) => (

              <span
                className="profile-tag"
                key={title}
              >
                {title}
              </span>

            ))}

          </div>

        </section>

      )}


      {/* =========================
          MAJOR EVENTS
      ========================= */}

      {majorEvents.length > 0 && (

        <section className="profile-section">

          <p className="column-label">
            MAJOR EVENTS
          </p>

          <div className="profile-event-list">

            {majorEvents.map((event, index) => {

              const eventTitle =
                typeof event === "string"
                  ? event
                  : event.title;

              const eventKey =
                typeof event === "string"
                  ? event
                  : event.slug || event.title;

              return (

                <div
                  className="profile-event"
                  key={eventKey}
                >

                  <span className="profile-event-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>
                    {eventTitle}
                  </span>

                </div>

              );

            })}

          </div>

        </section>

      )}


      {/* =========================
          RELATED PEOPLE
      ========================= */}

      {relatedPeople.length > 0 && (

        <section className="profile-section">

          <p className="column-label">
            RELATED PEOPLE
          </p>

          <div className="profile-tags">

            {relatedPeople.map((relatedPerson) => (

              <RelatedLink
                item={relatedPerson}
                key={relatedPerson.slug}
              />

            ))}

          </div>

        </section>

      )}


      {/* =========================
          IMPORTANT PLACES
      ========================= */}

      {relatedPlaces.length > 0 && (

        <section className="profile-section">

          <p className="column-label">
            IMPORTANT PLACES
          </p>

          <div className="profile-tags">

            {relatedPlaces.map((place) => (

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

      {relatedEntities.length > 0 && (

        <section className="profile-section">

          <p className="column-label">
            RELATED HISTORY
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

export default PersonProfile;