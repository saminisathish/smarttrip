function Planner() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Trip Plan</h1>

      <div style={styles.layout}>
        {/* Left: Itinerary */}
        <div style={styles.panel}>
          <h2>Itinerary</h2>
          <p>Day 1 – Places will appear here</p>
          <p>Day 2 – Places will appear here</p>
          <p>Day 3 – Places will appear here</p>
        </div>

        {/* Right: Map */}
        <div style={styles.panel}>
          <h2>Map View</h2>
          <p>Map will be displayed here</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "30px"
  },
  title: {
    textAlign: "center",
    color: "#2563eb",
    marginBottom: "20px"
  },
  layout: {
    display: "flex",
    gap: "20px"
  },
  panel: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    flex: 1,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  }
};

export default Planner;
