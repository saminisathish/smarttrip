import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>SmartTrip – Travel Planner</h1>

      <div style={styles.card}>
        <h2 style={styles.subtitle}>Plan Your Trip</h2>

        <input style={styles.input} placeholder="Start Location" />
        <input style={styles.input} placeholder="Destination" />
        <input
          style={styles.input}
          type="number"
          placeholder="Number of Days"
        />

        <div style={styles.checkboxGroup}>
          <label><input type="checkbox" /> Temple</label>
          <label><input type="checkbox" /> Nature</label>
          <label><input type="checkbox" /> Food</label>
          <label><input type="checkbox" /> Adventure</label>
        </div>

        <select style={styles.input}>
          <option>Travel Mode</option>
          <option>Walk</option>
          <option>Drive</option>
        </select>

        <button
          style={styles.button}
          onClick={() => navigate("/planner")}
        >
          Generate Itinerary
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "40px"
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: "20px"
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  subtitle: {
    marginBottom: "15px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px"
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default Home;
