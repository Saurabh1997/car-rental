import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "components/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function AllBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/bookings/getAllBookings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBookings(res.data.data))
      .catch((err) => {
        if (err && err.response.status === 403) {
          navigate("/login", { state: {path:"/bookings"} });
        } else {
          setError(err.message);
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white">
      <header className="bg-slate-950 shadow-md p-4 border-b border-slate-700">
        <h1 className="text-3xl font-extrabold text-center tracking-wide">
          Bookings
        </h1>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        {error && <p className="text-red-400">Error: {error}</p>}

        <section className="bg-white text-black rounded-xl shadow-xl p-6 mt-10 mx-auto w-full md:w-[90%]">
          <h2 className="text-2xl font-semibold mb-4 text-center text-slate-900">
            All Bookings
          </h2>

          {bookings.length === 0 ? (
            <p className="text-center text-slate-600">No bookings found.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking, idx) => (
                <div
                  key={idx}
                  className="bg-slate-100 border border-slate-300 rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">
                    {booking.userId} - {booking?.car?.brand} -{" "}
                    {booking?.car?.model}
                  </h3>
                  <p className="text-sm text-slate-600">
                    From: {new Date(booking?.from).toDateString()}
                  </p>
                  <p className="text-sm text-slate-600">
                    To: {new Date(booking.to).toDateString()}
                  </p>
                  <p className="text-sm text-slate-600">
                    Driving License Valid till:{" "}
                    {new Date(booking.drivingLicenseValidTill).toDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
