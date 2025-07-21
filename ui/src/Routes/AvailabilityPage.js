import { useState } from "react";
import axios from "axios";

export default function Availability({ setSelectedCar, setDateRange }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [availableCars, setAvailableCars] = useState([]);

  const fetchAvailability = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4141/api/availability?from=${from}&to=${to}`
      );
      setAvailableCars(res.data);
      setDateRange({ from, to });
    } catch (err) {
      console.log(" err", err);
      alert("Error fetching availability");
    }
  };

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border rounded px-2 py-1 bg-slate-400 border-blue-400"
          id={"from-date"}
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border rounded px-2 py-1 border-blue-400 bg-slate-400"
          id={"to-date"}
        />
        <button
          onClick={fetchAvailability}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Check Availability
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {availableCars.map((car) => (
          <div key={car.carId} className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">
              {car.brand} {car.model}
            </h3>
            <p>Avg Price/Day: ${car.averagePrice}</p>
            <p>Total Price: ${car.totalPrice}</p>
            <button
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
              onClick={() => setSelectedCar(car)}
            >
              Book This Car
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
