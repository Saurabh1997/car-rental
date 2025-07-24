import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "components/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cars/getAllCars`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCars(res.data.data))
      .catch((err) => {
        if (err && err.response.status === 403) {
          navigate("/login", { state: { path: "/cars" } });
        }
        setError(err.message);
      });
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
