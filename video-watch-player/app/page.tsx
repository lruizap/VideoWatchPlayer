"use client";

import { trpc } from "@/server/client";

export default function Home() {
  const videos = trpc.videos.get.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(videos.data)}
    </main>
  );
}
