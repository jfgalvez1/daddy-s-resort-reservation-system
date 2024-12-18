"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import Calendar styles

export default function NewReservation() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [dates, setDates] = useState([new Date(), new Date()]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [checkIn, checkOut] = dates;

    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, checkIn, checkOut }),
    });

    console.log("RESPONSE", response);

    if (response.ok) {
      alert("Reservation created successfully!");
      setFormData({ name: "", email: "", phone: "" });
    } else {
      alert("Failed to create reservation.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        required
      />
      <Calendar
        selectRange={true}
        onChange={setDates}
        value={dates}
        className="rounded-lg border border-gray-300"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Submit Reservation
      </button>
    </form>
  );
}
