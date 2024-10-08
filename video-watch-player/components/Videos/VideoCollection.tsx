// components/VideoCollection.tsx

"use client";

import { trpc } from "@/server/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import Link from "next/link";

export function VideoCollection() {
  const videoCollections = trpc.videoCollection.get.useQuery();
  const addVideoCollection = trpc.videoCollection.create.useMutation();
  const utils = trpc.useUtils();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addNewVideoCollection = () => {
    try {
      addVideoCollection.mutateAsync(
        {
          title,
          description,
        },
        {
          onSettled: () => videoCollections.refetch(),
        }
      );

      setTitle("");
      setDescription("");

      utils.videoCollection.get.invalidate();
    } catch (error) {
      console.error("Error al crear la colección de videos:", error);
    }
  };

  return (
    <div>
      <h1 className="text-white text-2xl pb-5 text-center mb-5">
        Video Collections
      </h1>
      <div className="grid grid-cols-4 gap-5">
        {videoCollections.data?.map((collection) => (
          <Link key={collection.id} href={`/videocollection/${collection.id}`}>
            <Card>
              <CardHeader>
                <CardTitle>{collection.title}</CardTitle>
                <CardDescription>{collection.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <Card className="flex justify-center items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create your video collection</DialogTitle>
              <DialogDescription>
                Create your video collection for your video content.
              </DialogDescription>
              <div className="flex flex-col gap-3">
                <p>Title:</p>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p>Description:</p>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={addNewVideoCollection}>Save</Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
