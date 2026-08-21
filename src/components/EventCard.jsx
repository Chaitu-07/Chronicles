import { Link } from "react-router-dom";

function EventCard({ event }) {

  const eventType = event.type
    ? event.type.toLowerCase()
    : "event";

  return (
    <article className="event-card">

      {/* YEAR / DATE */}

      <div className="event-year">
        {event.date || event.year || "Unknown"}
      </div>


      {/* CONTENT */}

      <div className="event-content">

        <div className="event-meta">

          <p className="event-location">
            {event.location || event.region || ""}
          </p>

          <span className="event-category">
            {event.category || event.type}
          </span>

        </div>


        <h3>
          {event.title}
        </h3>


        {event.subtitle && (
          <p className="event-subtitle">
            {event.subtitle}
          </p>
        )}


        <p>
          {event.description}
        </p>


        {/* DISCOVER LINK */}

        <Link
          to={`/${eventType}/${event.slug}`}
          className="text-button"
        >
          Discover Event →
        </Link>

      </div>

    </article>
  );
}

export default EventCard;