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
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-5xl font-bold">SpotShare</h1>

        <div className="flex gap-3">
          <a
            href="/login"
            className="rounded-lg bg-white px-4 py-2 font-bold shadow"
          >
            Login
          </a>

          <a
            href="/new"
            className="rounded-lg bg-black px-4 py-2 font-bold text-white shadow"
          >
            Post Spot
          </a>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {spots?.map((spot) => (
          <div
            key={spot.id}
            className="overflow-hidden rounded-xl bg-white shadow"
          >
            {spot.image_url && (
              <img
                src={spot.image_url}
                alt={spot.title}
                className="h-64 w-full object-cover"
              />
            )}

            <div className="p-6">
              <h2 className="text-2xl font-bold">
                {spot.title}
              </h2>

              <p className="mt-3 text-gray-600">
                {spot.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}