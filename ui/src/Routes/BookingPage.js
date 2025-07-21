// src/components/BookingForm.jsx
import { useState } from "react";
import axios from "axios";

export default function BookingForm({ car, dateRange, onSuccess }) {
  const [userId, setUserId] = useState("");
  const [licenseDate, setLicenseDate] = useState("");

  const submitBooking = async () => {
    try {
      const res = await axios.post("http://localhost:4141/api/postBooking", {
        userId,
        carId: car.carId,
        from: dateRange.from,
        to: dateRange.to,
        drivingLicenseValidTill: licenseDate,
      });
      alert("Booking Successful");
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.error || "Booking failed");
    }
  };

  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-xl font-bold mb-2">
        Book: {car.brand} {car.model}
      </h2>
      <div className="flex flex-col gap-2 text-black">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
          className="border rounded px-2 py-1"
        />
        <h4 className="text-white">Driving License Valid Till:</h4>
        <input
          type="date"
          value={licenseDate}
          onChange={(e) => setLicenseDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={submitBooking}
          className="bg-purple-700 text-white px-4 py-2 rounded"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
