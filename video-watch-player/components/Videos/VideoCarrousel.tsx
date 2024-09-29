"use client";

import React from "react";
import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/server/client";
import { Button } from "../ui/button";

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

export default function VideoCarrousel(videoCollectionId: {
  videoCollectionId: any;
}) {
  const videocollection = trpc.videoCollection.getById.useQuery({
    id: +videoCollectionId.videoCollectionId,
  });

  const delVideo = trpc.videos.delete.useMutation();

  const deleteVideo = (id: number) => {
    delVideo.mutate(
      { id },
      {
        onSettled: () => videocollection.refetch(),
      }
    );
  };

  return (
    <Carousel className="flex justify-center items-center">
      <CarouselContent>
        {videocollection.data?.videos.map((video) => (
          <CarouselItem
            key={video.id}
            className="flex justify-center items-center"
          >
            <Card className="m-3 flex flex-col items-center justify-center p-2 shadow-md max-w-xs">
              <CardHeader className="text-center mb-3">
                <CardTitle className="text-lg font-semibold">
                  {video.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {video.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mb-3">
                <video controls className="max-w-xs h-auto">
                  <source src={`${video.url}`} type="video/mp4" />
                </video>
              </CardContent>

              <Table className="text-center">
                <TableRow>
                  <TableCell className="items-center">
                    <TableHead className="font-semibold text-sm">
                      Likes
                    </TableHead>
                    <CardContent className="text-sm">{video.likes}</CardContent>
                  </TableCell>
                  <TableCell className="items-center">
                    <TableHead className="font-semibold text-sm">
                      Views
                    </TableHead>
                    <CardContent className="text-sm">{video.views}</CardContent>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="pt-3">
                    <Button className="p-2 text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                        />
                      </svg>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button>
                      <AlertDialog>
                        <AlertDialogTrigger>Delete Video</AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your video and remove your data
                              from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="p-5 text-xs"
                              onClick={() => {
                                deleteVideo(+video.id);
                              }}
                            >
                              Delete Video
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </Button>
                  </TableCell>
                </TableRow>
              </Table>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
