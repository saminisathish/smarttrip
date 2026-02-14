import { useEffect, useState } from "react";

function Analytics() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("smarttrip_data")) || [];
    setTrips(data);
  }, []);

  const totalTrips = trips.length;

  const interestCount = {};
  const destinationCount = {};

  trips.forEach((trip) => {
    trip.interests?.forEach((interest) => {
      interestCount[interest] =
        (interestCount[interest] || 0) + 1;
    });

    destinationCount[trip.destination] =
      (destinationCount[trip.destination] || 0) + 1;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Analytics Dashboard</h1>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h2>{totalTrips}</h2>
          <p>Total Trips</p>
        </div>

        <div style={styles.card}>
          <h2>{Object.keys(destinationCount).length}</h2>
          <p>Destinations</p>
        </div>

        <div style={styles.card}>
          <h2>{Object.keys(interestCount).length}</h2>
          <p>Interest Types</p>
        </div>
      </div>

      <div style={styles.section}>
        <h3>Interest Distribution</h3>
        <ul>
          {Object.entries(interestCount).map(
            ([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            )
          )}
        </ul>
      </div>

      <div style={styles.section}>
        <h3>Destination Popularity</h3>
        <ul>
          {Object.entries(destinationCount).map(
            ([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f1f5f9",
    padding: "30px",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e40af",
    marginBottom: "30px",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  section: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
};

export default Analytics;
