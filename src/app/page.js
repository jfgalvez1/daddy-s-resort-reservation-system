import NewReservation from '@/components/NewReservations';

export default function HomePage() {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-black">
        Welcome to Our Resort
      </h2>
      <p className="text-gray-600 mb-6">Create a new reservation below.</p>
      <NewReservation />
    </div>
  );
}
