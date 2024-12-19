import mongoose from 'mongoose'; // Import mongoose
import { NextResponse } from 'next/server';
import Reservation from '@/app/models/Reservation';
import connectMongoDB from '@/db/connect';

const DB_NAME = 'resort-reservation-db';

// Update a reservation by ID (PUT)
export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  await connectMongoDB();

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(id, body, {
      new: true, // Return the updated document
      runValidators: true, // Run model validators
    });
    if (!updatedReservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedReservation);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating reservation' },
      { status: 500 }
    );
  }
}

// Delete a reservation by ID (DELETE)
export async function DELETE(request, { params }) {
  const { id } = params;

  await connectMongoDB();

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: 'Reservation deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting reservation' },
      { status: 500 }
    );
  }
}
