import { Link } from "react-router-dom";

import { timelineData } from "../data/historicalData";

function TimelinePage() {
  const sortedTimeline = [...timelineData].sort(
    (a, b) => a.year - b.year
  );

  return (
    <section className="timeline-page">

      <div className="timeline-container">

        {/* =========================
            HEADER
        ========================= */}

        <header className="timeline-header">

          <p className="section-label">
            CHRONICLES
          </p>

          <h1>
            Historical Timeline
          </h1>

          <p className="timeline-intro">
            Explore major people, battles, empires,
            and events across history.
          </p>

        </header>


        {/* =========================
            TIMELINE
        ========================= */}

        <div className="timeline">

          {sortedTimeline.map((item, index) => (

            <div
              className="timeline-item"
              key={`${item.year}-${item.slug}`}
            >

              {/* YEAR */}

              <div className="timeline-year">
                {item.year}
              </div>


              {/* DOT */}

              <div className="timeline-marker">

                <span />

              </div>


              {/* CONTENT */}

              <div className="timeline-content">

                <p className="timeline-date">
                  {item.date}
                </p>

                <h2>
                  {item.title}
                </h2>

                <p className="timeline-type">
                  {item.type}
                </p>

                <p className="timeline-description">
                  {item.description}
                </p>

                <Link
                  to={`/${item.type.toLowerCase()}/${item.slug}`}
                  className="timeline-link"
                >
                  Explore Record →
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default TimelinePage;