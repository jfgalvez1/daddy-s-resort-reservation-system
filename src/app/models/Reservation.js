import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    reservation_id: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    roomType: { type: [String], required: false },
    others: { type: [String], required: false },
    bookingStatus: {
      type: String,
      enum: ["Unconfirmed Reservation", "Paid Reservation"],
      required: true,
    },
    exclusivity: {
      type: String,
      enum: ["not-exclusive", "exclusive"],
      required: true,
    },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Reservation ||
  mongoose.model("Reservation", ReservationSchema);
