function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <p className="hero-label">
          AN INTERACTIVE HISTORY EXPERIENCE
        </p>

        <h1>
          Explore the
          <span>World Through Time</span>
        </h1>

        <p className="hero-description">
          Journey across civilizations, empires, battles, rulers,
          and defining moments that shaped human history.
        </p>

        <div className="hero-buttons">

          <a href="#eras" className="primary-button">
            Explore History
          </a>

          <a href="#events" className="secondary-button">
            View Events
          </a>

        </div>

      </div>

    </section>
  );
}

export default Hero;