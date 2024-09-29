import React, { useRef, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { trpc } from "@/server/client";

export default function VideoTable(videoCollectionId: {
  videoCollectionId: any;
}) {
  const videocollection = trpc.videoCollection.getById.useQuery({
    id: +videoCollectionId.videoCollectionId,
  });

  const utils = trpc.useUtils();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  const addVideo = trpc.videos.create.useMutation();

  const addNewVideo = () => {
    try {
      if (!videocollection.data?.id) {
        return;
      }

      if (fileRef.current?.files) {
        const formData = new FormData();
        const file = fileRef.current.files[0];
        formData.append("files", file);
        const request = { method: "POST", body: formData };
        fetch("/api/file", request);

        addVideo.mutateAsync(
          {
            title,
            description,
            videoCollectionId: videocollection.data?.id,
            url: `/${file.name}`,
          },
          {
            onSettled: () => videocollection.refetch(),
          }
        );

        setTitle("");
        setDescription("");

        utils.videoCollection.get.invalidate();
      }
    } catch (error) {
      console.error("Error al crear la colección de videos:", error);
    }
  };

  const delVideo = trpc.videos.delete.useMutation();

  const deleteVideo = (id: number) => {
    delVideo.mutate({ id });
  };

  const delVideoCollection = trpc.videoCollection.delete.useMutation();

  const deleteVideoCollection = (id: number) => {
    delVideoCollection.mutate(
      { id },
      {
        onSettled: () => {
          window.location.href = "/";
        },
      }
    );
  };

  return (
    <Table className="bg-white rounded-tr-md rounded-tl-md">
      <TableCaption className="bg-white pb-5 mt-0 pt-5 rounded-br-md rounded-bl-md">
        A carrousel of your videos about {videocollection.data?.title}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Add Video</TableHead>
          <TableHead>Delete Collection</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">
            {videocollection.data?.title}
          </TableCell>
          <TableCell>{videocollection.data?.description}</TableCell>
          <TableCell>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Video</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Video</DialogTitle>
                  <DialogDescription>
                    Add video for {videocollection.data?.title} collection for
                    your video content.
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
                    <p>Video:</p>
                    <Input type="file" ref={fileRef} />
                    <Button onClick={addNewVideo}>Save</Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableCell>
          <TableCell>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-red-800">Delete Collection</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your Collection and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      onClick={() => {
                        if (videocollection?.data?.videos?.length != 0) {
                          videocollection.data?.videos.map((video) =>
                            deleteVideo(video.id)
                          );
                        }

                        deleteVideoCollection(
                          videoCollectionId.videoCollectionId
                        );
                      }}
                      className="bg-red-800"
                    >
                      Delete Collection
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
