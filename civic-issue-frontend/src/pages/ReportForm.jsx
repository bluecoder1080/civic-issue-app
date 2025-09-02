import { useState } from "react";
import axios from "../api"; // your axios instance or import 'axios' directly

export default function ReportForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Auto location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (err) => {
          alert("Could not get location");
          console.error(err);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !location) return alert("Fill all fields");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    if (imageFile) formData.append("image", imageFile);

    try {
      setSubmitting(true);
      const res = await axios.post("http://localhost:5000/api/issues", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      // reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setImageFile(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to submit issue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Submit a Civic Issue</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Location</label>
          <input value={location} readOnly />
          <button type="button" onClick={handleGetLocation}>Get Current Location</button>
        </div>
        <div>
          <label>Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Issue"}
        </button>
      </form>
    </div>
  );
}
