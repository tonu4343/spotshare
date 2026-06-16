import { supabase } from '@/lib/supabase';

export default async function Home() {
  const { data: spots, error } = await supabase
    .from('spots')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <main className="p-8">
        <h1>Error</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-8 text-5xl font-bold">SpotShare</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {spots?.map((spot) => (
          <div key={spot.id} className="overflow-hidden rounded-xl bg-white shadow">
            {spot.image_url && (
              <img
                src={spot.image_url}
                alt={spot.title}
                className="h-64 w-full object-cover"
              />
            )}

            <div className="p-6">
              <h2 className="text-2xl font-bold">{spot.title}</h2>
              <p className="mt-3 text-gray-600">{spot.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}