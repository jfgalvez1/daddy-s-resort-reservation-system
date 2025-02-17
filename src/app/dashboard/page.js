"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const { data: session, status } = useSession(); // Get session data and status
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null); // For editing
  const [showEditModal, setShowEditModal] = useState(false); // Modal visibility

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (!session?.user) redirect("/"); // Redirect if not authenticated
  }, [session, status]);

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await fetch("/api/reservations");
      const data = await response.json();
      setReservations(data);
    };

    if (session?.user) {
      fetchReservations();
    }
  }, [session]);

  // Handle Delete
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this reservation?")) {
      try {
        const response = await fetch(`/api/reserved/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setReservations((prev) =>
            prev.filter((reservation) => reservation._id !== id)
          );
          alert("Reservation deleted successfully");
        } else {
          alert("Error deleting reservation");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Handle Edit
  const handleEdit = (reservation) => {
    setEditingReservation(reservation); // Set the reservation to edit
    setShowEditModal(true); // Open the modal
  };

  // Handle Save Changes for Edit
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/reserved/${editingReservation._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingReservation), // Updated reservation data
      });

      if (response.ok) {
        const updatedReservation = await response.json();
        setReservations((prev) =>
          prev.map((reservation) =>
            reservation._id === updatedReservation._id
              ? updatedReservation
              : reservation
          )
        );
        alert("Reservation updated successfully");
        setShowEditModal(false); // Close the modal
      } else {
        alert("Error updating reservation");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session?.user) {
    return null; // Prevent rendering until redirection
  }

  return (
    <div className="bg-white text-black shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      {reservations.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Exclusivity</th>
              <th className="border border-gray-300 px-4 py-2">Contains</th>
              <th className="border border-gray-300 px-4 py-2">Contact No.</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Check-In</th>
              <th className="border border-gray-300 px-4 py-2">Check-Out</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.exclusivity}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.othersType?.length > 0 ? (
                    <ul>
                      {reservation.othersType.map((other, index) => (
                        <li key={index}>-{other}</li>
                      ))}
                    </ul>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.phone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.bookingStatus}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(reservation.checkIn).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(reservation.checkOut).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  >
                    Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(reservation)}
                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(reservation._id)}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  >
                    Delete
                  </button>
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
};

export default DashboardPage;
