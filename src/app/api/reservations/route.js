import mongoose from 'mongoose'; // Import mongoose
import connectMongoDB from '@/db/connect';

const DB_NAME = 'resort-reservation-db';

export async function GET(req) {
  try {
    // Connect to MongoDB using mongoose
    await connectMongoDB(); // This ensures the DB is connected before querying

    // Use mongoose to query reservations collection
    const reservations = await mongoose.connection.db
      .collection('reservations')
      .find()
      .toArray();

    return new Response(JSON.stringify(reservations), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch reservations',
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Connect to MongoDB using mongoose
    await connectMongoDB(); // This ensures the DB is connected before inserting

    // Parse the request body
    const body = await req.json();

    // Use mongoose to insert the reservation into the "reservations" collection
    const result = await mongoose.connection.db
      .collection('reservations')
      .insertOne(body);

    return new Response(
      JSON.stringify({ message: 'Reservation created', id: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Detailed POST Error:', {
      message: error.message,
      code: error.code,
      codeName: error.codeName,
      stack: error.stack,
    });

    return new Response(
      JSON.stringify({
        error: 'Failed to create reservation',
        details: error.message,
        code: error.code,
      }),
      { status: 500 }
    );
  }
}
