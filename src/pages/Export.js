import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Export() {
  const { state } = useLocation();
  const trip = state || {};

  const handleDownloadPDF = async () => {
    const element = document.getElementById("pdf-content");

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("SmartTrip_Itinerary.pdf");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Trip Summary</h1>

      <div id="pdf-content" style={styles.card}>
        <h2>SmartTrip – Travel Itinerary</h2>

        <p><b>Destination:</b> {trip.destination}</p>
        <p><b>Number of Days:</b> {trip.days}</p>
        <p><b>Interests:</b> {trip.interests?.join(", ")}</p>
        <p><b>Travel Mode:</b> {trip.mode}</p>

        <hr />

        <h3>Day-wise Plan</h3>

        {trip.itinerary?.map((day) => (
          <div key={day.day}>
            <p><b>Day {day.day}</b></p>
            <ul>
              {day.places.map((place) => (
                <li key={place.name}>{place.name}</li>
              ))}
            </ul>
          </div>
        ))}

        <p style={{ marginTop: "10px" }}>
          Generated on: {new Date().toLocaleDateString()}
        </p>
      </div>

      <button style={styles.button} onClick={handleDownloadPDF}>
        Download PDF
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "30px",
    textAlign: "center",
  },
  title: {
    color: "#2563eb",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "auto",
    textAlign: "left",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  button: {
    marginTop: "20px",
    padding: "12px 20px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Export;
