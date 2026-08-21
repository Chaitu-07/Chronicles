const API_URL = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(query);

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);


  /* =========================
     KEEP INPUT IN SYNC
  ========================= */

  useEffect(() => {
    setSearchInput(query);
  }, [query]);


  /* =========================
     FETCH SEARCH RESULTS
  ========================= */

  useEffect(() => {

    async function searchRecords() {

      /*
       * If there is no search query,
       * don't load all 23 records.
       */

      if (!query.trim()) {

        setResults([]);
        setLoading(false);
        setError(null);

        return;
      }


      try {

        setLoading(true);
        setError(null);

        const url = query
          ? `${API_URL}/api/records?q=${encodeURIComponent(query)}`
          : `${API_URL}/api/records`;

        const response = await fetch(url);

        if (!response.ok) {

          throw new Error(
            "Failed to load historical records."
          );

        }

        const data = await response.json();

        setResults(data);

      } catch (err) {

        console.error(
          "Search error:",
          err
        );

        setError(
          err.message
        );

        setResults([]);

      } finally {

        setLoading(false);

      }

    }

    searchRecords();

  }, [query]);


  /* =========================
     HANDLE SEARCH
  ========================= */

  function handleSearch(event) {

    event.preventDefault();

    const trimmedSearch = searchInput.trim();

    if (!trimmedSearch) {

      setSearchParams({});

      return;
    }

    setSearchParams({
      q: trimmedSearch
    });

  }


  /* =========================
     CLEAR SEARCH
  ========================= */

  function handleClearSearch() {

    setSearchInput("");

    setSearchParams({});

  }


  return (
    <section className="search-page">

      <div className="search-container">


        {/* =========================
            HEADER
        ========================= */}

        <div className="search-header">

          <div>

            <p className="section-label">
              HISTORICAL ARCHIVES
            </p>

            <h1>
              Historical Archives
            </h1>

            <p className="search-count">

              {query
                ? `${results.length} ${
                    results.length === 1
                      ? "record"
                      : "records"
                  } found`
                : "Search the historical archives"}

            </p>

          </div>

        </div>


        {/* =========================
            SEARCH BOX
        ========================= */}

        <form
          className="archive-search-form"
          onSubmit={handleSearch}
        >

          <input
            type="text"
            value={searchInput}
            onChange={(event) =>
              setSearchInput(event.target.value)
            }
            placeholder="Search people, battles, empires, places..."
            className="archive-search-input"
          />

          <button
            type="submit"
            className="primary-button"
          >
            Search
          </button>

          {query && (

            <button
              type="button"
              className="secondary-button"
              onClick={handleClearSearch}
            >
              Clear
            </button>

          )}

        </form>


        {/* =========================
            INITIAL STATE
        ========================= */}

        {!query && !loading && (

          <div className="search-empty">

            <p className="section-label">
              ARCHIVES
            </p>

            <h2>
              Search the Chronicles
            </h2>

            <p>
              Search for a historical person, place,
              battle, empire, or event.
            </p>

          </div>

        )}


        {/* =========================
            LOADING
        ========================= */}

        {loading && (

          <div className="search-empty">

            <p className="section-label">
              SEARCHING
            </p>

            <h2>
              Searching the Archives...
            </h2>

            <p>
              Looking through the historical records.
            </p>

          </div>

        )}


        {/* =========================
            ERROR
        ========================= */}

        {error && !loading && (

          <div className="search-empty">

            <p className="section-label">
              ERROR
            </p>

            <h2>
              Unable to Load Archives
            </h2>

            <p>
              {error}
            </p>

            <button
              className="primary-button"
              onClick={() =>
                window.location.reload()
              }
            >
              Try Again
            </button>

          </div>

        )}


        {/* =========================
            NO RESULTS
        ========================= */}

        {query &&
          !loading &&
          !error &&
          results.length === 0 && (

            <div className="search-empty">

              <p className="section-label">
                NO RESULTS
              </p>

              <h2>
                No historical records found
              </h2>

              <p>
                We couldn't find any records matching
                "{query}".
              </p>

              <p>
                Try searching for another historical
                name, place, event, battle, or empire.
              </p>

            </div>

          )}


        {/* =========================
            RESULTS
        ========================= */}

        {query &&
          !loading &&
          !error &&
          results.length > 0 && (

            <div className="search-results">

              {results.map((record) => (

                <Link
                  to={`/${record.type.toLowerCase()}/${record.slug}`}
                  className="search-result"
                  key={`${record.type}-${record.slug}`}
                >

                  {/* NUMBER */}

                  <div className="search-result-number">

                    {String(record.id).padStart(2, "0")}

                  </div>


                  {/* CONTENT */}

                  <div className="search-result-content">

                    <p className="search-result-type">
                      {record.type}
                    </p>

                    <h2>
                      {record.title}
                    </h2>

                    {record.subtitle && (

                      <p className="search-result-subtitle">
                        {record.subtitle}
                      </p>

                    )}

                    {record.description && (

                      <p className="search-result-description">
                        {record.description}
                      </p>

                    )}

                  </div>


                  {/* ARROW */}

                  <div className="search-result-arrow">
                    →
                  </div>

                </Link>

              ))}

            </div>

          )}

      </div>

    </section>
  );
}

export default SearchPage;