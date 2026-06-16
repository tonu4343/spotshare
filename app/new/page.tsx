'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function NewSpotPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = '';

    if (file) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) {
        alert(uploadError.message);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase.from('spots').insert({
      title,
      description,
      image_url: imageUrl,
    });
    const {
  data: { session },
} = await supabase.auth.getSession();

console.log(session);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push('/');
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold">Post New Spot</h1>

        <input
          className="mb-4 w-full rounded-lg border p-3"
          placeholder="Spot title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="mb-4 w-full rounded-lg border p-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          className="mb-6"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        <button
          disabled={loading}
          className="w-full rounded-lg bg-black p-3 font-bold text-white"
        >
          {loading ? 'Uploading...' : 'Post Spot'}
        </button>
      </form>
    </main>
  );
}