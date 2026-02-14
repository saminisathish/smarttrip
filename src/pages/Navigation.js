import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Destination (demo – later we make it dynamic)
const destination = {
  name: "Chamundi Temple",
  position: [12.2743, 76.6709],
};

// 🔹 This component keeps map following the user
function FollowUser({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 16);
    }
  }, [position, map]);

  return null;
}

function Navigation() {
  const [userPosition, setUserPosition] = useState(null);
  const [status, setStatus] = useState("Click Start Navigation");
  const [watchId, setWatchId] = useState(null);

  // START GPS
  const startNavigation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in this browser");
      return;
    }

    setStatus("Fetching live location...");

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setUserPosition([
          pos.coords.latitude,
          pos.coords.longitude,
        ]);
        setStatus("Live navigation active");
      },
      (error) => {
        console.error(error);
        setStatus("Location permission denied");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );

    setWatchId(id);
  };

  // STOP GPS
  const stopNavigation = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setStatus("Navigation paused");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Live Navigation</h1>
      <p style={styles.status}>{status}</p>

      <MapContainer
        center={destination.position}
        zoom={14}
        style={{ height: "70vh", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Destination */}
        <Marker position={destination.position}>
          <Popup>{destination.name}</Popup>
        </Marker>

        {/* User */}
        {userPosition && (
          <>
            <Marker position={userPosition}>
              <Popup>Your Location</Popup>
            </Marker>

            <Polyline
              positions={[userPosition, destination.position]}
              color="blue"
            />

            <FollowUser position={userPosition} />
          </>
        )}
      </MapContainer>

      <div style={styles.controls}>
        <button style={styles.button} onClick={startNavigation}>
          Start
        </button>
        <button style={styles.button} onClick={stopNavigation}>
          Pause
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    color: "#2563eb",
  },
  status: {
    textAlign: "center",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "15px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Navigation;
