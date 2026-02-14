import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    start: "",
    destination: "",
    days: 1,
    interests: [],
    mode: "Drive",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>SmartTrip</h1>
        <p style={styles.subtitle}>
          Plan smarter. Travel better.
        </p>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Plan Your Trip</h2>

        <input
          name="start"
          placeholder="Start Location"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          name="destination"
          placeholder="Destination"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          name="days"
          type="number"
          min="1"
          placeholder="Number of Days"
          style={styles.input}
          onChange={handleChange}
        />

        <div style={styles.checkboxGroup}>
          {["Temple", "Nature", "Food", "Adventure"].map((item) => (
            <label key={item} style={styles.checkbox}>
              <input
                type="checkbox"
                onChange={() => handleCheckbox(item)}
              />
              {item}
            </label>
          ))}
        </div>

        <select
          name="mode"
          style={styles.input}
          onChange={handleChange}
        >
          <option>Drive</option>
          <option>Walk</option>
        </select>

        <button
          style={styles.primaryButton}
          onClick={() => navigate("/planner", { state: formData })}
        >
          Generate Itinerary
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0e7ff, #f8fafc)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "60px",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#1e40af",
  },
  subtitle: {
    color: "#475569",
    marginTop: "6px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    width: "360px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    marginBottom: "15px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5f5",
    outline: "none",
  },
  checkboxGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    marginBottom: "12px",
  },
  checkbox: {
    fontSize: "14px",
    color: "#334155",
  },
  primaryButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default Home;
