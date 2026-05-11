"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface TrailerModalProps {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  videoKey: string;
}

export default function TrailerModal({
  open,
  onOpenChange,
  videoKey,
}: TrailerModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-5xl border-none bg-black p-0">
        <DialogTitle className="sr-only">
          Movie Trailer
        </DialogTitle>

        <div className="aspect-video w-full overflow-hidden rounded-xl">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="border-0"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}