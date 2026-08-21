import RelatedLink from "./RelatedLink";

function EmpireProfile({ empire }) {

  const rulers = Array.isArray(empire.rulers)
    ? empire.rulers
    : [];

  const importantPlaces = Array.isArray(empire.importantPlaces)
    ? empire.importantPlaces
    : [];

  const majorEvents = Array.isArray(empire.majorEvents)
    ? empire.majorEvents
    : [];

  const relatedEntities = Array.isArray(empire.relatedEntities)
    ? empire.relatedEntities
    : [];


  return (
    <div className="empire-profile">

      {/* =========================
          OVERVIEW
      ========================= */}

      <section className="profile-section">

        <p className="column-label">
          OVERVIEW
        </p>

        <p className="profile-biography">
          {empire.overview ||
            empire.description ||
            "No overview available."}
        </p>

      </section>


      {/* =========================
          HISTORICAL DETAILS
      ========================= */}

      <section className="profile-section">

        <p className="column-label">
          HISTORICAL DETAILS
        </p>

        <div className="profile-info-grid">

          <div className="profile-info-item">

            <span>
              DATE
            </span>

            <strong>
              {empire.date || "Unknown"}
            </strong>

          </div>


          <div className="profile-info-item">

            <span>
              PERIOD
            </span>

            <strong>
              {empire.period || "Historical Period"}
            </strong>

          </div>


          <div className="profile-info-item">

            <span>
              REGION
            </span>

            <strong>
              {empire.region ||
                empire.location ||
                "Unknown"}
            </strong>

          </div>

        </div>

      </section>


      {/* =========================
          GOVERNMENT
      ========================= */}

      {empire.government && (

        <section className="profile-section">

          <p className="column-label">
            GOVERNMENT
          </p>

          <p className="profile-biography">
            {empire.government}
          </p>

        </section>

      )}


      {/* =========================
          TERRITORY
      ========================= */}

      {(empire.territory || empire.location) && (

        <section className="profile-section">

          <p className="column-label">
            TERRITORY
          </p>

          <p className="profile-biography">
            {empire.territory ||
              empire.location}
          </p>

        </section>

      )}


      {/* =========================
          FOUNDING POWER
      ========================= */}

      {(empire.founder || empire.capital) && (

        <section className="profile-section">

          <p className="column-label">
            FOUNDING POWER
          </p>

          <div className="empire-foundation-grid">

            {empire.founder && (

              <div className="empire-foundation-item">

                <span>
                  FOUNDER
                </span>

                <strong>
                  {empire.founder}
                </strong>

              </div>

            )}


            {empire.capital && (

              <div className="empire-foundation-item">

                <span>
                  CAPITAL
                </span>

                <strong>
                  {empire.capital}
                </strong>

              </div>

            )}

          </div>

        </section>

      )}


      {/* =========================
          MAJOR RULERS
      ========================= */}

      {rulers.length > 0 && (

        <section className="profile-section">

          <p className="column-label">
            MAJOR RULERS
          </p>

          <div className="profile-tags">

            {rulers.map((ruler) => (

              <RelatedLink
                item={ruler}
                key={ruler.slug}
              />

            ))}

          </div>

        </section>

      )}


      {/* =========================
          IMPORTANT PLACES
      ========================= */}

      {importantPlaces.length > 0 && (

        <section className="profile-section">

          <p className="column-label">
            IMPORTANT PLACES
          </p>

          <div className="profile-tags">

            {importantPlaces.map((place) => (

              <RelatedLink
                item={place}
                key={place.slug}
              />

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

export default EmpireProfile;