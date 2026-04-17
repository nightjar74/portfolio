export interface VideoItem {
  /** Unique stable identifier */
  id: string;
  /** Section label above the card, e.g. "CHAPTER 1" */
  label: string;
  /** Card title shown at the bottom of the thumbnail */
  title: string;
  /** Full-res thumbnail shown before hover */
  thumbnailUrl: string;
  /** Short looping clip shown on hover (can be the same as videoUrl) */
  previewUrl: string;
  /** Full video played inside the modal */
  videoUrl: string;
  /** Optional accessible description */
  description?: string;
}
