import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import TimelinePage from "./pages/TimelinePage";
import DetailPage from "./pages/DetailPage";
import ApiTest from "./pages/ApiTest";

function App() {
  return (
    <div className="app">

      <Navbar />

      <main>

        <Routes>

          <Route
            path="/api-test"
            element={<ApiTest />}
          />

          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/search"
            element={<SearchPage />}
          />

          <Route
            path="/timeline"
            element={<TimelinePage />}
          />

          <Route
            path="/:type/:slug"
            element={<DetailPage />}
          />

        </Routes>

      </main>

      <footer className="footer">

        <p>
          © 2026 Chronicles
        </p>

        <p>
          Explore. Discover. Remember.
        </p>

      </footer>

    </div>
  );
}

export default App;