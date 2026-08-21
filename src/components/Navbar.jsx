import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();


  const handleSectionClick = (sectionId) => {

    if (location.pathname === "/") {

      const element =
        document.getElementById(sectionId);

      if (element) {

        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      }

    } else {

      navigate(`/#${sectionId}`);

      setTimeout(() => {

        const element =
          document.getElementById(sectionId);

        if (element) {

          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

        }

      }, 100);

    }

  };


  return (
    <nav className="navbar">

      <div className="navbar-container">


        {/* LOGO */}

        <Link
          to="/"
          className="logo"
        >

          <span className="logo-symbol">
            ✦
          </span>

          <span>
            CHRONICLES
          </span>

        </Link>


        {/* NAVIGATION */}

        <div className="nav-links">


          <Link to="/">
            Home
          </Link>


          <button
            type="button"
            onClick={() =>
              handleSectionClick("timeline")
            }
          >
            Timeline
          </button>


          <button
            type="button"
            onClick={() =>
              handleSectionClick("eras")
            }
          >
            Eras
          </button>


          <button
            type="button"
            onClick={() =>
              handleSectionClick("events")
            }
          >
            Events
          </button>


          <Link to="/search">
            Search
          </Link>


        </div>

      </div>

    </nav>
  );
}

export default Navbar;