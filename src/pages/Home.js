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

  const handleSubmit = () => {
    navigate("/planner", { state: formData });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>SmartTrip – Travel Planner</h1>

      <div style={styles.card}>
        <h2>Plan Your Trip</h2>

        <input
          name="start"
          style={styles.input}
          placeholder="Start Location"
          onChange={handleChange}
        />

        <input
          name="destination"
          style={styles.input}
          placeholder="Destination"
          onChange={handleChange}
        />

        <input
          name="days"
          type="number"
          min="1"
          style={styles.input}
          placeholder="Number of Days"
          onChange={handleChange}
        />

        <div style={styles.checkboxGroup}>
          {["Temple", "Nature", "Food", "Adventure"].map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                onChange={() => handleCheckbox(item)}
              />{" "}
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

        <button style={styles.button} onClick={handleSubmit}>
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
    paddingTop: "40px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Home;
