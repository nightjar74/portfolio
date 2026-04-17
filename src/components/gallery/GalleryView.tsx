"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Media, MasonryGrid } from "@once-ui-system/core";
import { gallery } from "@/resources";
import { useLightbox } from "@/hooks/useLightBox";

export default function GalleryView() {
  const {
    activeIndex,
    currentImage,
    isVisible,
    isOpen,
    isClosing,
    open,
    close,
    prev,
    next,
    touchHandlers,
  } = useLightbox();

  return (
    <>
      <MasonryGrid columns={2} s={{ columns: 1 }}>
        {gallery.images.map((image, index) => (
          <div
            key={index}
            onClick={(e) => {
              const rect = (
                e.currentTarget as HTMLElement
              ).getBoundingClientRect();
              open(index, rect);
            }}
            style={{ cursor: "zoom-in" }}
          >
            <Media
              priority={index < 10}
              sizes="(max-width: 560px) 100vw, 50vw"
              radius="m"
              aspectRatio={
                image.orientation === "horizontal" ? "16 / 9" : "3 / 4"
              }
              src={image.src}
              alt={image.alt}
            />
          </div>
        ))}
      </MasonryGrid>

      {/* Lightbox overlay */}
      {isVisible && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `rgba(0, 0, 0, ${isOpen ? 0.88 : 0})`,
            transition: isClosing
              ? "background-color 420ms cubic-bezier(0.4, 0, 0.2, 1)"
              : "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            backdropFilter: `blur(${isOpen ? 8 : 0}px)`,
            WebkitBackdropFilter: `blur(${isOpen ? 8 : 0}px)`,
          }}
          {...touchHandlers}
        >
          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            style={{
              position: "absolute",
              left: 20,
              top: "50%",
              transform: `translateY(-50%) scale(${isOpen ? 1 : 0.7})`,
              opacity: isOpen ? 1 : 0,
              transition: "opacity 300ms ease, transform 300ms ease",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 10001,
              flexShrink: 0,
            }}
            aria-label="Previous image"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Image container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "min(90vw, 1200px)",
              maxHeight: "90vh",
              transform: isOpen
                ? "scale(1) translateY(0)"
                : isClosing
                  ? "scale(0.88) translateY(12px)"
                  : "scale(0.88) translateY(12px)",
              opacity: isOpen ? 1 : 0,
              transition: isClosing
                ? "transform 420ms cubic-bezier(0.4, 0, 0.2, 1), opacity 380ms cubic-bezier(0.4, 0, 0.2, 1)"
                : "transform 340ms cubic-bezier(0.34, 1.3, 0.64, 1), opacity 280ms ease",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
              willChange: "transform, opacity",
            }}
          >
            {currentImage && (
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                style={{
                  display: "block",
                  maxWidth: "min(90vw, 1200px)",
                  maxHeight: "90vh",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: 12,
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  //draggable: false,
                }}
                draggable={false}
              />
            )}

            {/* Counter */}
            <div
              style={{
                position: "absolute",
                bottom: 14,
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.55)",
                color: "rgba(255,255,255,0.85)",
                fontSize: 13,
                fontFamily: "system-ui, sans-serif",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "0.05em",
                padding: "4px 12px",
                borderRadius: 999,
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                pointerEvents: "none",
                whiteSpace: "nowrap",
              }}
            >
              {activeIndex !== null ? activeIndex + 1 : 0} /{" "}
              {gallery.images.length}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            style={{
              position: "absolute",
              right: 20,
              top: "50%",
              transform: `translateY(-50%) scale(${isOpen ? 1 : 0.7})`,
              opacity: isOpen ? 1 : 0,
              transition: "opacity 300ms ease, transform 300ms ease",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 10001,
              flexShrink: 0,
            }}
            aria-label="Next image"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            style={{
              position: "absolute",
              top: 16,
              right: 20,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              opacity: isOpen ? 1 : 0,
              transform: `scale(${isOpen ? 1 : 0.7})`,
              transition: "opacity 300ms ease, transform 300ms ease",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 10001,
            }}
            aria-label="Close"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
