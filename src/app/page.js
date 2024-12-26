import LoginForm from './../components/LoginForm';

export default function HomePage() {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-black">
        Welcome to Our Resort
      </h2>
      <div className="flex flex-col justify-center items-center m-4">
        <h1 className="text-3xl my-3">Hey, time to Sign In</h1>
        <LoginForm />
      </div>
    </div>
  );
}
