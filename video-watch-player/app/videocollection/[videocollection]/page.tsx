"use client";

import { trpc } from "@/server/client";
import VideoCarrousel from "@/components/Videos/VideoCarrousel";
import VideoTable from "@/components/Videos/VideoTable";
import Link from "next/link";

export default function VideoCollectionPage({
  params,
}: {
  params: { videocollection: number };
}) {
  const videocollection = trpc.videoCollection.getById.useQuery({
    id: +params.videocollection,
  });

  return (
    <div className="min-h-screen overflow-hidden bg-zinc-700">
      <div className="flex min-h-screen flex-col items-center justify-between p-10">
        <div className="flex flex-col items-center mb-5">
          <div className="flex items-center">
            <h1 className="text-white text-2xl pb-5 text-center">
              {videocollection.data?.title}
            </h1>
            <Link
              href="/"
              className="ml-4 inline-flex items-center p-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="mb-5 max-w-full">
          <VideoTable videoCollectionId={videocollection.data?.id} />
        </div>

        <div className="max-w-full">
          <VideoCarrousel videoCollectionId={videocollection.data?.id} />
        </div>
      </div>
    </div>
  );
}
