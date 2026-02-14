import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function Planner() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Trip Plan</h1>

      <div style={styles.layout}>
        {/* Left: Itinerary */}
        <div style={styles.panel}>
          <h2>Itinerary</h2>
          <p>Day 1 – Chamundi Temple</p>
          <p>Day 2 – Mysuru Palace</p>
          <p>Day 3 – Brindavan Gardens</p>
        </div>

        {/* Right: Map */}
        <div style={styles.panel}>
          <h2>Map View</h2>

          <MapContainer
            center={[12.2958, 76.6394]}
            zoom={12}
            style={{ height: "350px", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[12.2958, 76.6394]}>
              <Popup>Mysuru</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "30px",
  },
  title: {
    textAlign: "center",
    color: "#2563eb",
    marginBottom: "20px",
  },
  layout: {
    display: "flex",
    gap: "20px",
  },
  panel: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    flex: 1,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
};

export default Planner;
