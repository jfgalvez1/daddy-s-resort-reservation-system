'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import { v4 as uuidv4 } from 'uuid';
import 'react-calendar/dist/Calendar.css'; // Import Calendar styles

export default function NewReservation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    roomType: [],
    bookingStatus: '',
    exclusivity: '',
    exclusive: false,
  });
  const [dates, setDates] = useState([new Date(), new Date()]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [checkIn, checkOut] = dates;

    const reservation_id = uuidv4();
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, reservation_id, checkIn, checkOut }),
    });

    console.log('RESPONSE', response);

    if (response.ok) {
      alert('Reservation created successfully!');
      setFormData({ name: '', phone: '', roomType: [], bookingStatus: '' });
    } else {
      alert('Failed to create reservation.');
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedRoomTypes = checked
        ? [...prevData.roomType, value] // Add the room type to the array
        : prevData.roomType.filter((room) => room !== value); // Remove the room type from the array
      return { ...prevData, roomType: updatedRoomTypes };
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Name Input */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700"
        >
          Name of Guest
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />
      </div>

      {/* Phone Input */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-gray-700"
        >
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />
      </div>

      {/* Exclusivity */}
      <div>
        <label
          htmlFor="exclusivity"
          className="block text-sm font-semibold text-gray-700"
        >
          Exclusivity
        </label>
        <select
          id="exclusivity"
          value={formData.exclusivity}
          onChange={(e) =>
            setFormData({ ...formData, exclusivity: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        >
          <option value="" disabled>
            Exclusivity
          </option>
          <option value="exclusive">Exclusive</option>
          <option value="exclusive-w-room">Exclusive w/ Rooms</option>
          <option value="not-exclusive">Not Exclusive</option>
        </select>
      </div>

      {/* Room Type Checkboxes */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Room Type
        </label>
        <div className="space-y-2">
          {[
            'couple-a',
            'couple-b',
            'couple-c',
            'couple-d',
            'family-a',
            'family-b',
            'family-c',
            'family-d',
          ].map((room) => (
            <div key={room} className="flex items-center">
              <input
                type="checkbox"
                id={room}
                value={room}
                checked={formData.roomType.includes(room)}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor={room} className="text-sm">{`${room
                .replace(/-/g, ' ')
                .toUpperCase()}`}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Date Picker */}
      <div>
        <label
          htmlFor="dates"
          className="block text-sm font-semibold text-gray-700"
        >
          Select Dates
        </label>
        <Calendar
          id="dates"
          selectRange={true}
          onChange={setDates}
          value={dates}
          className="rounded-lg border border-gray-300"
        />
      </div>

      {/* Booking Status */}
      <div>
        <label
          htmlFor="bookingStatus"
          className="block text-sm font-semibold text-gray-700"
        >
          Booking Status
        </label>
        <select
          id="bookingStatus"
          value={formData.bookingStatus}
          onChange={(e) =>
            setFormData({ ...formData, bookingStatus: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        >
          <option value="" disabled>
            Select Booking Status
          </option>
          <option value="pencil">Pencil Booking</option>
          <option value="paid">Paid Reservation</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Submit Reservation
      </button>
    </form>
  );
}
