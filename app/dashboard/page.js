"use client";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await fetch("/api/reservations");
      const data = await response.json();
      setReservations(data);
    };
    fetchReservations();
  }, []);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      {reservations.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Check-In</th>
              <th className="border border-gray-300 px-4 py-2">Check-Out</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.phone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(reservation.checkIn).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(reservation.checkOut).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No reservations found.</p>
      )}
    </div>
  );
}
