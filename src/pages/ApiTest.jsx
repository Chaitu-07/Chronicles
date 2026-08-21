import { useEffect, useState } from "react";

import { getRecord } from "../api/records";


function ApiTest() {
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecord() {
      try {
        const data = await getRecord(
          "recapture-of-jerusalem"
        );

        setRecord(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadRecord();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div>
      <h1>{record.title}</h1>

      <p>{record.subtitle}</p>

      <p>{record.description}</p>

      <p>
        Location: {record.location}
      </p>

      <p>
        Date: {record.date}
      </p>
    </div>
  );
}

export default ApiTest;