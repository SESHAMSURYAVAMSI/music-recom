"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface TrailerModalProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  videoKey: string;
}

export default function TrailerModal({
  open,
  onOpenChange,
  videoKey,
}: TrailerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden border-none bg-transparent p-0 shadow-none sm:max-w-6xl">
        <DialogTitle className="sr-only">Movie Trailer</DialogTitle>

        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-xl transition duration-300 hover:scale-110 hover:bg-red-500"
        >
          <X size={22} />
        </button>

        {/* Video Container */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=1&rel=0`}
              title="Movie Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
