import VideoContainer from "@/components/video/videoContainer";
import type { VideoItem } from "../../types/videoTypes";
import Desc from "@/components/video/desc";

const ITEMS: VideoItem[] = [
  {
    id: "ch1",
    label: "",
    title: "Alpaca",
    thumbnailUrl: "/images/thumbnails/alpaca-thumb.png",
    previewUrl: "/videos/gallery/alpaca.mp4",
    videoUrl: "/videos/gallery/alpaca.mp4",
  },
  {
    id: "ch2",
    label: "",
    title: "Alpacas",
    thumbnailUrl: "/images/thumbnails/alpaca-thumb-2.png",
    previewUrl: "/videos/gallery/alpaca-2.mp4",
    videoUrl: "/videos/gallery/alpaca-2.mp4",
  },
  {
    id: "ch3",
    label: "",
    title: "Another Alpaca",
    thumbnailUrl: "/images/thumbnails/alpaca-thumb-3.png",
    previewUrl: "/videos/gallery/alpaca-3.mp4",
    videoUrl: "/videos/gallery/alpaca-3.mp4",
  },
  {
    id: "ch4",
    label: "",
    title: "More Alpaca",
    thumbnailUrl: "/images/thumbnails/alpaca-thumb-4.png",
    previewUrl: "/videos/gallery/alpaca-4.mp4",
    videoUrl: "/videos/gallery/alpaca-4.mp4",
  },
];

export default function Video() {
  return (
    <div className="video-container">
      <div className="box" />
      <Desc />
      <div style={{ width: "90%" }}>
        <VideoContainer items={ITEMS} />
      </div>
    </div>
  );
}
