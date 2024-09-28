"use client";

import { trpc } from "@/server/client";

import VideoCarrousel from "@/components/Videos/VideoCarrousel";
import VideoTable from "@/components/Videos/VideoTable";

export default function VideoCollectionPage({
  params,
}: {
  params: { videocollection: number };
}) {
  const videocollection = trpc.videoCollection.getById.useQuery({
    id: +params.videocollection,
  });

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-zinc-700">
        <h1 className="text-white text-2xl pb-5 text-center mb-5">
          {videocollection.data?.title}
        </h1>
        <div className="mb-5">
          <VideoTable videoCollectionId={videocollection.data?.id} />
        </div>
        <div>
          <VideoCarrousel videoCollectionId={videocollection.data?.id} />
        </div>
      </div>
    </div>
  );
}
