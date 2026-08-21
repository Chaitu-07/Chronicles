import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import PersonProfile from "../components/PersonProfile";
import BattleProfile from "../components/BattleProfile";
import EmpireProfile from "../components/EmpireProfile";
import PlaceProfile from "../components/PlaceProfile";
import EventProfile from "../components/EventProfile";
import RelatedLink from "../components/RelatedLink";


function DetailPage() {

  const { type, slug } = useParams();

  const [item, setItem] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);


  /* =========================
     FETCH RECORD
  ========================= */

  useEffect(() => {

    async function fetchRecord() {

      try {

        setLoading(true);

        setError(null);

        const response = await fetch(
          `http://127.0.0.1:5000/api/records/${encodeURIComponent(slug)}`
        );


        if (response.status === 404) {

          setItem(null);

          return;

        }


        if (!response.ok) {

          throw new Error(
            "Failed to load historical record."
          );

        }


        const data = await response.json();

        setItem(data);

      }

      catch (err) {

        console.error(
          "Detail page error:",
          err
        );

        setError(
          err.message
        );

      }

      finally {

        setLoading(false);

      }

    }


    fetchRecord();

  }, [slug]);


  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (
      <section className="detail-page">

        <div className="detail-container">

          <p className="section-label">
            ARCHIVES
          </p>

          <h1>
            Loading Historical Record...
          </h1>

        </div>

      </section>
    );

  }


  /* =========================
     ERROR
  ========================= */

  if (error) {

    return (
      <section className="detail-page">

        <div className="detail-container">

          <p className="section-label">
            ERROR
          </p>

          <h1>
            Unable to Load Record
          </h1>

          <p>
            {error}
          </p>

          <Link
            to="/search"
            className="primary-button"
          >
            Search the Archives
          </Link>

        </div>

      </section>
    );

  }


  /* =========================
     RECORD NOT FOUND
  ========================= */

  if (!item) {

    return (
      <section className="detail-page">

        <div className="detail-not-found">

          <p className="section-label">
            404
          </p>

          <h1>
            Historical Record Not Found
          </h1>

          <p>
            We couldn't find the historical record
            you're looking for.
          </p>

          <Link
            to="/search"
            className="primary-button"
          >
            Search the Archives
          </Link>

        </div>

      </section>
    );

  }


  /* =========================
     TYPE CHECK
  ========================= */

  const recordType =
    item.type?.toLowerCase();

  const urlType =
    type?.toLowerCase();


  /*
     Make sure the URL type matches
     the database record type.
  */

  if (
    urlType &&
    recordType &&
    urlType !== recordType
  ) {

    return (
      <section className="detail-page">

        <div className="detail-not-found">

          <p className="section-label">
            404
          </p>

          <h1>
            Historical Record Not Found
          </h1>

          <p>
            This historical record does not
            match the requested archive type.
          </p>

          <Link
            to="/search"
            className="primary-button"
          >
            Search the Archives
          </Link>

        </div>

      </section>
    );

  }


  return (
    <section className="detail-page">

      <div className="detail-container">


        {/* =========================
            HEADER
        ========================= */}

        <div className="detail-header">

          <div>

            <p className="section-label">
              {item.type}
            </p>

            <h1>
              {item.title}
            </h1>

            {item.subtitle && (

              <p className="detail-subtitle">
                {item.subtitle}
              </p>

            )}

          </div>


          <div className="detail-number">

            {String(
              item.id
            ).padStart(2, "0")}

          </div>

        </div>


        {/* =========================
            PERSON
        ========================= */}

        {item.type === "Person" && (

          <PersonProfile
            person={item}
          />

        )}


        {/* =========================
            BATTLE
        ========================= */}

        {item.type === "Battle" && (

          <BattleProfile
            battle={item}
          />

        )}


        {/* =========================
            EMPIRE
        ========================= */}

        {item.type === "Empire" && (

          <EmpireProfile
            empire={item}
          />

        )}


        {/* =========================
            PLACE
        ========================= */}

        {item.type === "Place" && (

          <PlaceProfile
            place={item}
          />

        )}


        {/* =========================
            EVENT
        ========================= */}

        {item.type === "Event" && (

          <EventProfile
            event={item}
          />

        )}


        {/* =========================
            OTHER ENTITY TYPES
        ========================= */}

        {item.type !== "Person" &&
          item.type !== "Battle" &&
          item.type !== "Empire" &&
          item.type !== "Place" &&
          item.type !== "Event" && (

            <>

              <div className="detail-overview">

                <p className="column-label">
                  OVERVIEW
                </p>

                <p className="detail-description">
                  {item.description}
                </p>

              </div>


              <div className="detail-info">

                <div className="detail-info-item">

                  <span>
                    DATE
                  </span>

                  <strong>
                    {item.date || "Unknown"}
                  </strong>

                </div>


                <div className="detail-info-item">

                  <span>
                    LOCATION
                  </span>

                  <strong>
                    {item.location || "Unknown"}
                  </strong>

                </div>


                <div className="detail-info-item">

                  <span>
                    CATEGORY
                  </span>

                  <strong>
                    {item.category || item.type}
                  </strong>

                </div>

              </div>

            </>

          )}


        {/* =========================
            RELATED HISTORY
        ========================= */}

        {item.relatedEntities &&
          item.relatedEntities.length > 0 && (

            <div className="detail-entities">

              <p className="column-label">
                RELATED HISTORY
              </p>

              <div className="profile-tags related-history-tags">

                {item.relatedEntities.map(
                  (entity) => (

                    <RelatedLink
                      item={entity}
                      key={
                        entity.slug
                      }
                    />

                  )
                )}

              </div>

            </div>

          )}


        {/* =========================
            SEARCH TERMS
        ========================= */}

        {item.keywords &&
          item.keywords.length > 0 && (

            <div className="detail-keywords">

              <p className="column-label">
                SEARCH TERMS
              </p>

              <div className="keyword-list">

                {item.keywords.map(
                  (keyword) => (

                    <span
                      className="keyword"
                      key={keyword}
                    >
                      {keyword}
                    </span>

                  )
                )}

              </div>

            </div>

          )}


        {/* =========================
            NAVIGATION
        ========================= */}

        <div className="detail-navigation">

          <Link
            to="/search"
            className="secondary-button"
          >
            ← Back to Search
          </Link>

          <Link
            to="/"
            className="secondary-button"
          >
            Return Home
          </Link>

        </div>

      </div>

    </section>
  );

}


export default DetailPage;