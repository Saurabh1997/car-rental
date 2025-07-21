import { useState } from "react";
import Availability from "./AvailabilityPage";
import BookingForm from "./BookingPage";
export default function MainPage() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">
        Carental - Bolttech Barcelona
      </h1>
      <div className="max-w-4xl mx-auto shadow rounded p-6">
        <div
          onClick={() => {
            setSelectedCar(null);
          }}
        >
          Back
        </div>
        {selectedCar == null && (
          <Availability
            setSelectedCar={setSelectedCar}
            setDateRange={setDateRange}
          />
        )}
        {selectedCar && (
          <BookingForm
            car={selectedCar}
            dateRange={dateRange}
            onSuccess={() => setSelectedCar(null)}
          />
        )}
      </div>
    </div>
  );
}
