import React, { useState } from "react";

interface Report {
  id: number;
  type: string;
  location: string;
  severity: string;
  description: string;
  status: string;
  time: string;
  photo?: string;
 coordinates?: {
  lat: number;
  lng: number;
   } | null;
}

interface CitizenReportProps {
  onReportSubmit: (report: Report) => void;
}

const CitizenReport: React.FC<CitizenReportProps> = ({
  onReportSubmit,
}) => {
  const [type, setType] = useState("Landslide");
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState("Medium");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [coordinates, setCoordinates] = useState<{
  lat: number;
  lng: number;
} | null>(null);

const [gettingLocation, setGettingLocation] = useState(false);
const getMyLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by this browser.");
    return;
  }

  setGettingLocation(true);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setCoordinates({ lat, lng });

      setLocation(
        `${lat.toFixed(5)}, ${lng.toFixed(5)}`
      );

      setGettingLocation(false);
    },
    () => {
      alert(
        "Unable to get your location. Please allow location permission."
      );
      setGettingLocation(false);
    }
  );
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!location.trim() || !description.trim()) {
      alert("Please enter location and description.");
      return;
    }

   const newReport: Report = {
  id: Date.now(),
  type,
  location,
  severity,
  description,
  status: "Pending Verification",
  time: new Date().toLocaleTimeString(),
  photo: photo ? URL.createObjectURL(photo) : undefined,
  coordinates,
  
};

    onReportSubmit(newReport);

    setLocation("");
    setDescription("");
    setPhoto(null);
  };

  return (
    <div className="p-5 bg-slate-900 rounded-xl border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-1">
        🚨 Report Road Incident
      </h2>

      <p className="text-sm text-slate-400 mb-5">
        Submit a field or citizen report
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="text-sm text-slate-300">
            Incident Type
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-slate-800 text-white border border-slate-700"
          >
            <option>Landslide</option>
            <option>Flood</option>
            <option>Road Blockage</option>
            <option>Accident</option>
            <option>Road Damage</option>
            <option>Heavy Traffic</option>
            <option>Other</option>
          </select>
        </div>
           
           <div>
  <label className="text-sm text-slate-300">
    Location
  </label>

  <div className="flex gap-2 mt-1">

    <input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      placeholder="Example: NH-6, Sonapur"
      className="flex-1 p-2 rounded bg-slate-800 text-white border border-slate-700"
    />

    <button
      type="button"
      onClick={getMyLocation}
      disabled={gettingLocation}
      className="px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
    >
      {gettingLocation ? "📡..." : "📍 GPS"}
    </button>

  </div>

  {coordinates && (
    <p className="text-xs text-green-400 mt-2">
      📍 GPS location captured
    </p>
  )}
</div>
       
        <div>
          <label className="text-sm text-slate-300">
            Severity
          </label>

          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-slate-800 text-white border border-slate-700"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-slate-300">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the incident..."
            rows={4}
            className="w-full mt-1 p-2 rounded bg-slate-800 text-white border border-slate-700"
          />
        </div>

        <div>
  <label className="text-sm text-slate-300">
    Evidence Photo
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      setPhoto(e.target.files?.[0] || null);
    }}
    className="w-full mt-1 p-2 rounded bg-slate-800 text-white border border-slate-700 text-sm"
  />

  {photo && (
    <p className="text-xs text-green-400 mt-2">
      📷 {photo.name}
    </p>
  )}
</div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold"
        >
          🚨 Submit Report
        </button>

      </form>
    </div>
  );
};

export default CitizenReport;