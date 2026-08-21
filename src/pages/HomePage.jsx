import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import EraCard from "../components/EraCard";
import EventCard from "../components/EventCard";
import Timeline from "../components/Timeline";

const API_URL = import.meta.env.VITE_API_URL;
/* =========================================================
   HISTORICAL ERAS
========================================================= */

const historicalEras = [

  {
    id: 1,
    period: "3000 BC – 500 BC",
    title: "Ancient Civilizations",
    description:
      "Explore the civilizations that shaped the foundations of human society, from Mesopotamia and Egypt to ancient India, China, Greece, and Persia.",
    icon: "𓂀",
  },

  {
    id: 2,
    period: "500 BC – 500 AD",
    title: "Classical World",
    description:
      "Discover the rise of Greece, Rome, the Mauryan Empire, the Han Dynasty, Persia, and the great civilizations of the classical age.",
    icon: "🏛️",
  },

  {
    id: 3,
    period: "500 – 1000 AD",
    title: "Age of Kingdoms",
    description:
      "Explore the Byzantine Empire, Islamic Golden Age, Tang China, and kingdoms that transformed the medieval world.",
    icon: "⚔️",
  },

  {
    id: 4,
    period: "1000 – 1500 AD",
    title: "Medieval World",
    description:
      "Enter an age of powerful sultanates, European kingdoms, Mongol expansion, Crusades, and major Asian empires.",
    icon: "👑",
  },

];


/* =========================================================
   TIMELINE PERIODS
========================================================= */

const timelinePeriods = [

  {
    id: 1,
    year: "3000 BC",
    title: "Age of Ancient Civilizations",
    shortTitle: "Ancient World",
    description:
      "The earliest great civilizations emerged around river valleys, establishing cities, writing systems, organized governments, trade networks, and monumental architecture.",
    civilizations: [
      "Ancient Egypt",
      "Mesopotamia",
      "Indus Valley Civilization",
      "Early China",
    ],
    events: [
      "Rise of Egyptian civilization",
      "Development of cuneiform",
      "Growth of the Indus Valley cities",
    ],
  },

  {
    id: 2,
    year: "1500 BC",
    title: "Bronze Age Kingdoms",
    shortTitle: "Bronze Age",
    description:
      "Powerful kingdoms and trading civilizations dominated the ancient world while bronze technology, warfare, religion, and long-distance trade continued to develop.",
    civilizations: [
      "New Kingdom Egypt",
      "Mycenaean Greece",
      "Hittite Empire",
      "Shang China",
    ],
    events: [
      "Expansion of the Egyptian New Kingdom",
      "Rise of the Hittite Empire",
      "Growth of Mycenaean civilization",
    ],
  },

  {
    id: 3,
    year: "500 BC",
    title: "The Classical World",
    shortTitle: "Classical Age",
    description:
      "The classical world saw the rise of major empires and intellectual traditions across the Mediterranean, Persia, India, and China.",
    civilizations: [
      "Achaemenid Persia",
      "Ancient Greece",
      "Mauryan Empire",
      "Han China",
    ],
    events: [
      "Persian Wars",
      "Rise of the Mauryan Empire",
      "Expansion of Greek influence",
    ],
  },

  {
    id: 4,
    year: "0",
    title: "The Roman and Classical Age",
    shortTitle: "Roman World",
    description:
      "Rome became one of the most powerful states of the ancient Mediterranean while major civilizations flourished across Asia and the Middle East.",
    civilizations: [
      "Roman Empire",
      "Parthian Empire",
      "Han China",
      "Kushan Empire",
    ],
    events: [
      "Expansion of the Roman Empire",
      "Silk Road trade",
      "Growth of Christianity",
    ],
  },

  {
    id: 5,
    year: "500 AD",
    title: "The Age of Transformation",
    shortTitle: "Early Medieval",
    description:
      "The ancient world transformed into a new political and cultural landscape as Rome declined, Byzantium endured, and new kingdoms and civilizations emerged.",
    civilizations: [
      "Byzantine Empire",
      "Sasanian Empire",
      "Gupta Empire",
      "Early Islamic World",
    ],
    events: [
      "Fall of the Western Roman Empire",
      "Rise of powerful Germanic kingdoms",
      "Expansion of Byzantine influence",
    ],
  },

  {
    id: 6,
    year: "1000 AD",
    title: "The High Medieval World",
    shortTitle: "High Medieval",
    description:
      "Powerful kingdoms, sultanates, and empires dominated Eurasia while trade routes connected Europe, Africa, and Asia.",
    civilizations: [
      "Byzantine Empire",
      "Seljuk Empire",
      "Chola Empire",
      "Song China",
    ],
    events: [
      "Rise of the Seljuk Turks",
      "Growth of Indian Ocean trade",
      "Norman expansion",
    ],
  },

  {
    id: 7,
    year: "1200 AD",
    title: "The Age of Empires",
    shortTitle: "Age of Empires",
    description:
      "The thirteenth century witnessed extraordinary imperial expansion, especially with the rise of the Mongol Empire across much of Eurasia.",
    civilizations: [
      "Mongol Empire",
      "Ayyubid Sultanate",
      "Delhi Sultanate",
      "Song China",
    ],
    events: [
      "Expansion of the Mongol Empire",
      "Crusades in the eastern Mediterranean",
      "Rise of the Delhi Sultanate",
    ],
  },

  {
    id: 8,
    year: "1500 AD",
    title: "The Early Modern World",
    shortTitle: "Early Modern",
    description:
      "Large centralized empires emerged across the world while maritime exploration connected previously distant regions.",
    civilizations: [
      "Ottoman Empire",
      "Mughal Empire",
      "Safavid Empire",
      "Ming China",
    ],
    events: [
      "Rise of the Mughal Empire",
      "Ottoman expansion",
      "European maritime exploration",
    ],
  },

];


/* =========================================================
   HOME PAGE
========================================================= */

function HomePage() {

  /* =========================================================
     STATE
  ========================================================= */

  const [selectedEra, setSelectedEra] =
    useState(null);

  const [selectedPeriod, setSelectedPeriod] =
    useState(timelinePeriods[0]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [records, setRecords] =
    useState([]);

  const [loadingEvents, setLoadingEvents] =
    useState(true);

  const [eventError, setEventError] =
    useState(null);


  /* =========================================================
     EVENT CATEGORIES
  ========================================================= */

  const eventCategories = [
    "All",
    "Battles",
    "Empires",
    "Rulers",
    "Religion",
    "Discovery",
  ];


  /* =========================================================
     LOAD RECORDS FROM POSTGRESQL
  ========================================================= */

  useEffect(() => {

    async function loadRecords() {

      try {

        setLoadingEvents(true);
        setEventError(null);

        const API_URL = import.meta.env.VITE_API_URL;

        const response = await fetch(
            `${API_URL}/api/records`
        );

        if (!response.ok) {

          throw new Error(
            "Failed to load historical records."
          );

        }

        const data = await response.json();

        setRecords(data);

      } catch (error) {

        console.error(
          "Home page records error:",
          error
        );

        setEventError(
          "Unable to load historical events."
        );

      } finally {

        setLoadingEvents(false);

      }

    }

    loadRecords();

  }, []);


  /* =========================================================
     FILTER RECORDS
  ========================================================= */

  let filteredEvents = [];


  /*
   * ALL
   *
   * The default Historical Events section
   * contains actual events and battles.
   */

  if (selectedCategory === "All") {

    filteredEvents = records.filter(
      (record) =>
        record.type === "Event" ||
        record.type === "Battle"
    );

  }


  /*
   * BATTLES
   */

  else if (selectedCategory === "Battles") {

    filteredEvents = records.filter(
      (record) =>
        record.type === "Battle"
    );

  }


  /*
   * EMPIRES
   */

  else if (selectedCategory === "Empires") {

    filteredEvents = records.filter(
      (record) =>
        record.type === "Empire"
    );

  }


  /*
   * RULERS
   */

  else if (selectedCategory === "Rulers") {

    filteredEvents = records.filter(
      (record) =>
        record.type === "Person"
    );

  }


  /*
   * RELIGION
   */
else if (selectedCategory === "Religion") {

  const religionKeywords = [
    "religion",
    "christianity",
    "christian",
    "islam",
    "muslim",
    "caliphate",
    "caliph",
    "church",
    "mosque",
    "religious",
  ];

  filteredEvents = records.filter((record) => {

    const text = [
      record.title,
      record.subtitle,
      record.description,
      record.overview,
      record.category,
      ...(Array.isArray(record.keywords)
        ? record.keywords
        : []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return religionKeywords.some((keyword) =>
      text.includes(keyword)
    );

  });

}


else if (selectedCategory === "Discovery") {

  const discoveryKeywords = [
    "discovery",
    "explorer",
    "explorers",
    "voyage",
    "navigation",
    "geographical discovery",
    "new world",
    "maritime exploration",
  ];

  filteredEvents = records.filter((record) => {

    const text = [
      record.title,
      record.subtitle,
      record.description,
      record.overview,
      ...(Array.isArray(record.keywords)
        ? record.keywords
        : []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return discoveryKeywords.some((keyword) =>
      text.includes(keyword)
    );

  });

}

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>

      <Hero />


      {/* =====================================================
          HISTORICAL TIMELINE
      ===================================================== */}

      <section
        className="timeline-section"
        id="timeline"
      >

        <div className="section-heading timeline-heading">

          <p className="section-label">
            EXPLORE HISTORY THROUGH TIME
          </p>

          <h2>
            The Historical Timeline
          </h2>

          <p>
            Move through thousands of years of human
            history and discover the civilizations and
            events that shaped each age.
          </p>

        </div>


        <Timeline
          periods={timelinePeriods}
          selectedPeriod={selectedPeriod}
          onSelectPeriod={setSelectedPeriod}
        />


        <div className="timeline-detail">

          <div className="timeline-detail-header">

            <div>

              <p className="timeline-detail-year">
                {selectedPeriod.year}
              </p>

              <h3>
                {selectedPeriod.title}
              </h3>

            </div>


            <div className="timeline-detail-number">

              {String(
                selectedPeriod.id
              ).padStart(2, "0")}

            </div>

          </div>


          <p className="timeline-detail-description">
            {selectedPeriod.description}
          </p>


          <div className="timeline-columns">

            <div className="timeline-column">

              <p className="column-label">
                MAJOR CIVILIZATIONS
              </p>

              <ul>

                {selectedPeriod.civilizations.map(
                  (civilization) => (

                    <li key={civilization}>
                      {civilization}
                    </li>

                  )
                )}

              </ul>

            </div>


            <div className="timeline-column">

              <p className="column-label">
                IMPORTANT DEVELOPMENTS
              </p>

              <ul>

                {selectedPeriod.events.map(
                  (event) => (

                    <li key={event}>
                      {event}
                    </li>

                  )
                )}

              </ul>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          HISTORICAL ERAS
      ===================================================== */}

      <section
        className="section eras-section"
        id="eras"
      >

        <div className="section-heading">

          <p className="section-label">
            JOURNEY THROUGH TIME
          </p>

          <h2>
            Historical Eras
          </h2>

          <p>
            Every age left behind stories that changed
            the course of civilization.
          </p>

        </div>


        <div className="era-grid">

          {historicalEras.map((era) => (

            <EraCard
              key={era.id}
              era={era}
              isSelected={
                selectedEra?.id === era.id
              }
              onSelect={setSelectedEra}
            />

          ))}

        </div>


        {selectedEra && (

          <div className="era-preview">

            <div className="era-preview-icon">
              {selectedEra.icon}
            </div>


            <div className="era-preview-content">

              <p className="section-label">
                SELECTED ERA
              </p>

              <h3>
                {selectedEra.title}
              </h3>

              <p className="era-preview-period">
                {selectedEra.period}
              </p>

              <p className="era-preview-description">
                {selectedEra.description}
              </p>


              <button
                className="close-preview"
                onClick={() =>
                  setSelectedEra(null)
                }
              >
                Close Preview
              </button>

            </div>

          </div>

        )}

      </section>


      {/* =====================================================
          EVENTS
      ===================================================== */}

      <section
        className="section events-section"
        id="events"
      >

        <div className="section-heading">

          <p className="section-label">
            MOMENTS THAT CHANGED HISTORY
          </p>

          <h2>
            Historical Events
          </h2>

          <p>
            Explore battles, empires, rulers, religious
            developments, and discoveries across history.
          </p>

        </div>


        {/* EVENT FILTERS */}

        <div className="event-filters">

          {eventCategories.map((category) => (

            <button
              key={category}
              className={`filter-button ${
                selectedCategory === category
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>


        {/* EVENT RESULTS */}

        <div className="events-list">

          {loadingEvents && (

            <div className="no-events">
              Loading historical records...
            </div>

          )}


          {!loadingEvents &&
            eventError && (

              <div className="no-events">
                {eventError}
              </div>

            )}


          {!loadingEvents &&
            !eventError &&
            filteredEvents.length > 0 && (

              filteredEvents.map((event) => (

                <EventCard
                  key={`${event.type}-${event.id}`}
                  event={event}
                />

              ))

            )}


          {!loadingEvents &&
            !eventError &&
            filteredEvents.length === 0 && (

              <div className="no-events">
                No historical records found.
              </div>

            )}

        </div>

      </section>


      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        className="about-section"
        id="about"
      >

        <div>

          <p className="section-label">
            THE CHRONICLES PROJECT
          </p>

          <h2>
            History is more than dates.
          </h2>

          <p>
            Chronicles is an interactive historical
            platform designed to connect people, places,
            empires, battles, and events across time.
          </p>

        </div>

      </section>

    </>
  );
}


export default HomePage;