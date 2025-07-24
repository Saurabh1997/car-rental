import { useState } from "react";
import axios from "axios";
import ValidationError from "components/ValidationError";

export default function Availability({ setSelectedCar, setDateRange }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [availableCars, setAvailableCars] = useState([]);
  const [validationErrorText, setValidationErrorText] = useState(null);

  const fetchAvailability = async (e) => {
    try {
      e.preventDefault();
      if (
        from &&
        to &&
        new Date(from) instanceof Date &&
        new Date(to) instanceof Date
      ) {
        if (new Date(from) < new Date(to)) {
          setValidationErrorText(null);
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/bookings/checkAvailability?from=${from}&to=${to}`
          );
          setAvailableCars(res.data.data);
          setDateRange({ from, to });
        } else {
          setValidationErrorText(
            "Please make sure the start date is before the end date."
          );
        }
      } else {
        setValidationErrorText(
          "Please select both start and end dates to check availability appropriately."
        );
      }
    } catch (err) {
      alert("Error fetching availability");
    }
  };

  return (
    <div>
      {validationErrorText && (
        <ValidationError validationErrorText={validationErrorText} />
      )}
      <h2 className="text-2xl font-semibold text-white mb-2 text-center">
        Choose your rental period
      </h2>
      <form onSubmit={fetchAvailability}>
        <div className="flex gap-4 mb-4">
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded px-2 py-1 bg-slate-400 border-blue-400"
            id={"from-date"}
            min={new Date().toISOString().split("T")[0]}
          />
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded px-2 py-1 border-blue-400 bg-slate-400"
            id={"to-date"}
            min={new Date().toISOString().split("T")[0]}
          />
          <button
            // onClick={fetchAvailability}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Check Availability
          </button>
        </div>
      </form>
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
