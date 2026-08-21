import RelatedLink from "./RelatedLink";

function BattleProfile({ battle }) {

  const relatedPeople = Array.isArray(battle.relatedPeople)
    ? battle.relatedPeople
    : [];

  const relatedPlaces = Array.isArray(battle.relatedPlaces)
    ? battle.relatedPlaces
    : [];

  const relatedEntities = Array.isArray(battle.relatedEntities)
    ? battle.relatedEntities
    : [];

  const sides = Array.isArray(battle.sides)
    ? battle.sides
    : [];

  const timeline = Array.isArray(battle.timeline)
    ? battle.timeline
    : [];


  return (
    <div className="battle-profile">

      {/* =========================
          OVERVIEW
      ========================= */}

      <section className="profile-section">

        <p className="column-label">
          OVERVIEW
        </p>

        <p className="profile-biography">
          {battle.overview ||
            battle.description ||
            "No overview available."}
        </p>

      </section>


      {/* =========================
          BATTLE DETAILS
      ========================= */}

      <section className="profile-section">

        <p className="column-label">
          BATTLE DETAILS
        </p>

        <div className="profile-info-grid">

          <div className="profile-info-item">

            <span>
              DATE
            </span>

            <strong>
              {battle.date || "Unknown"}
            </strong>

          </div>


          <div className="profile-info-item">

            <span>
              LOCATION
            </span>

            <strong>
              {battle.location || "Unknown"}
            </strong>

          </div>


          <div className="profile-info-item">

            <span>
              PERIOD
            </span>

            <strong>
              {battle.period || "Historical Period"}
            </strong>

          </div>

        </div>

      </section>


      {/* =========================
          OPPOSING SIDES
      ========================= */}

      {sides.length > 0 && (

        <section className="profile-section">

          <p className="column-label">
            OPPOSING SIDES
          </p>

          <div className="battle-sides">

            {sides.map((side, index) => (

              <div
                className="battle-side"
                key={side.name || index}
              >

                <div className="battle-side-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>

                  <p className="battle-side-name">
                    {side.name || "Unknown Side"}
                  </p>

                  {side.leader && (

                    <p className="battle-side-leader">
                      Commander: {side.leader}
                    </p>

                  )}

                </div>

              </div>

            ))}

          </div>

        </section>

      )}


      {/* =========================
          OUTCOME
      ========================= */}

      {(battle.outcome || battle.significance) && (

        <section className="profile-section">

          <p className="column-label">
            OUTCOME
          </p>

          {battle.outcome && (

            <div className="battle-outcome">
              {battle.outcome}
            </div>

          )}

          {battle.significance && (

            <p className="profile-biography">
              {battle.significance}
            </p>

          )}

        </section>

      )}


      {/* =========================
          BATTLE TIMELINE
      ========================= */}

      {timeline.length > 0 && (

        <section className="profile-section">

          <p className="column-label">
            BATTLE TIMELINE
          </p>

          <div className="profile-event-list">

            {timeline.map((item, index) => {

              const date =
                item.date ||
                item.time ||
                `Event ${index + 1}`;

              const description =
                item.description ||
                item.event ||
                "";

              return (

                <div
                  className="profile-event"
                  key={`${date}-${index}`}
                >

                  <span className="profile-event-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>

                    <strong className="battle-timeline-time">
                      {date}
                    </strong>

                    {description && (

                      <p className="battle-timeline-description">
                        {description}
                      </p>

                    )}

                  </div>

                </div>

              );

            })}

          </div>

        </section>

      )}


      {/* =========================
          KEY FIGURES
      ========================= */}

      {relatedPeople.length > 0 && (

        <section className="profile-section">

          <p className="column-label">
            KEY FIGURES
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

export default BattleProfile;