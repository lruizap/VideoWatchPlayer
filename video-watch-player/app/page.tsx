import { VideoCollection } from "@/components/Videos/VideoCollection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-zinc-700">
      <VideoCollection />
    </div>
  );
}
