import connectMongoDB from "@/db/connect";
import User from "@/app/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400 }
      );
    }

    await connectMongoDB();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Return user data on success
    return new Response(
      JSON.stringify({
        id: user._id,
        email: user.email,
        name: user.name || "Anonymous", // Add name if available
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
