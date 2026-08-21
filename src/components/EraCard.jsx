function EraCard({ era, isSelected, onSelect }) {
  return (
    <article
      className={`era-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(era)}
    >
      <div className="era-icon">
        {era.icon}
      </div>

      <p className="era-period">
        {era.period}
      </p>

      <h3>
        {era.title}
      </h3>

      <p className="era-description">
        {era.description}
      </p>

      <button
        className="card-button"
        onClick={(event) => {
          event.stopPropagation();
          onSelect(era);
        }}
      >
        Explore Era →
      </button>
    </article>
  );
}

export default EraCard;