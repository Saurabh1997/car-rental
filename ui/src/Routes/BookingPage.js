import { useState } from "react";
import axios from "axios";
import ValidationError from "components/ValidationError";
import { useAuth } from "components/AuthProvider";

export default function BookingPage({ car, dateRange, onSuccess }) {
  const { userId } = useAuth();
  console.log(" user ID ", userId);
  const [userID, setUserID] = useState(userId ?? "");
  const [licenseDate, setLicenseDate] = useState("");
  const [validationErrorText, setValidationErrorText] = useState(null);

  const submitBooking = async (e) => {
    try {
      e.preventDefault();
      if (
        userID &&
        car &&
        dateRange &&
        licenseDate &&
        new Date(dateRange.to) instanceof Date &&
        new Date(licenseDate) instanceof Date
      ) {
        if (new Date(licenseDate) > new Date(dateRange.to)) {
          setValidationErrorText(null);
          await axios.post(
            `${process.env.REACT_APP_API_URL}/bookings/postBooking`,
            {
              userId: userID,
              carId: car.carId,
              from: dateRange.from,
              to: dateRange.to,
              drivingLicenseValidTill: licenseDate,
            }
          );
          alert("Booking Successful");
          onSuccess();
        } else {
          setValidationErrorText(
            "Driving license must be valid through the booking period."
          );
        }
      } else {
        setValidationErrorText(
          "Please fill in all fields before confirming your booking."
        );
      }
    } catch (err) {
      if (err && err.response && err.response?.data?.data) {
        setValidationErrorText(err.response?.data?.data);
      } else {
        alert(err.response?.data?.error || "Booking failed");
      }
    }
  };

  return (
    <div className="mt-6 border-t pt-4">
      {validationErrorText && (
        <ValidationError validationErrorText={validationErrorText} />
      )}
      <h2 className="text-xl font-bold mb-2">
        Book: {car.brand} {car.model}
      </h2>
      <form onSubmit={submitBooking}>
        <div className="flex flex-col gap-2 text-black">
          <input
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
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
          <button className="bg-purple-700 text-white px-4 py-2 rounded">
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}
