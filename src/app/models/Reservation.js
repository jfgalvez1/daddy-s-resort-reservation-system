import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema, model, models } = mongoose;

const ReservationSchema = new Schema({
  reservation_id: {
    type: String,
    default: () => uuidv4(),
    unique: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Reservation =
  models.Reservation || model('Reservation', ReservationSchema);

export default Reservation;
