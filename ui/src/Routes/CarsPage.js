import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:4141/api/getAllCars")
      .then((res) => setCars(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
      <header className="bg-slate-950 shadow-md p-4">
        <h1 className="text-2xl font-bold text-center">Carental - Our Fleet</h1>
      </header>

      <main className="p-6 max-w-5xl mx-auto">
        {error && <p className="text-red-400">Error: {error}</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {cars.map((car, idx) => (
            <div
              key={idx}
              className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-1">
                {car.brand} {car.model}
              </h2>
              <p className="text-sm mb-2">Stock: {car.stock}</p>
              <div className="text-sm space-y-1">
                <p>
                  Peak Season: <strong>${car.price.peak}</strong>
                </p>
                <p>
                  Mid Season: <strong>${car.price.mid}</strong>
                </p>
                <p>
                  Off Season: <strong>${car.price.off}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
