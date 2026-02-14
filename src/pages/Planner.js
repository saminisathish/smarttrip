import { useLocation } from "react-router-dom";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const placesByInterest = {
  Temple: [
    { name: "Chamundi Temple", position: [12.2743, 76.6709] },
  ],
  Nature: [
    { name: "Brindavan Gardens", position: [12.4217, 76.5728] },
  ],
  Food: [
    { name: "Local Market", position: [12.297, 76.639] },
  ],
  Adventure: [
    { name: "Trekking Point", position: [12.35, 76.6] },
  ],
};

function FlyToPlace({ position }) {
  const map = useMap();
  map.setView(position, 14);
  return null;
}

function Planner() {
  const location = useLocation();
  const trip = location.state;

  const days = trip?.days || 1;
  const interests = trip?.interests || [];

  const itinerary = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    places:
      placesByInterest[interests[i % interests.length]] || [],
  }));

  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Trip to {trip?.destination || "Your Destination"}
      </h1>

      <div style={styles.layout}>
        {/* ITINERARY */}
        <div style={styles.panel}>
          <h2>Itinerary</h2>

          {itinerary.map((day) => (
            <div key={day.day}>
              <h3>Day {day.day}</h3>
              <ul>
                {day.places.map((place) => (
                  <li
                    key={place.name}
                    style={styles.placeItem}
                    onClick={() => setSelectedPlace(place)}
                  >
                    {place.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* MAP */}
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

            {itinerary.flatMap((day) =>
              day.places.map((place) => (
                <Marker key={place.name} position={place.position}>
                  <Popup>{place.name}</Popup>
                </Marker>
              ))
            )}

            {selectedPlace && (
              <FlyToPlace position={selectedPlace.position} />
            )}
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
  placeItem: {
    cursor: "pointer",
    color: "#2563eb",
    marginBottom: "5px",
  },
};

export default Planner;
