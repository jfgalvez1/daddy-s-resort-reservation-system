import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const ReservationSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Check if the model already exists (to avoid recompilation in development)
const Reservation =
  models.Reservation || model("Reservation", ReservationSchema);

export default Reservation;
