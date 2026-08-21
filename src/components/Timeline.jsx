function Timeline({
  periods,
  selectedPeriod,
  onSelectPeriod,
}) {
  return (
    <div className="timeline">

      <div className="timeline-line"></div>

      <div className="timeline-items">

        {periods.map((period) => (
          <button
            key={period.id}
            className={`timeline-item ${
              selectedPeriod.id === period.id
                ? "active"
                : ""
            }`}
            onClick={() => onSelectPeriod(period)}
          >
            <span className="timeline-dot"></span>

            <span className="timeline-year">
              {period.year}
            </span>

            <span className="timeline-title">
              {period.shortTitle}
            </span>
          </button>
        ))}

      </div>

    </div>
  );
}

export default Timeline;