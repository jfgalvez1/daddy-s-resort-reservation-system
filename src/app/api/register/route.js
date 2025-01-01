import connectMongoDB from '@/db/connect';
import User from '@/app/models/User';

export async function POST(req) {
  try {
    const { email, password } = await req.json(); // Use `req.json()` to parse body

    await connectMongoDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 400,
      });
    }

    // Create new user
    const newUser = new User({ email, password });

    // Save the new user to the database
    await newUser.save();

    // Send success response
    return new Response(JSON.stringify({ message: 'Registration successful' }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
