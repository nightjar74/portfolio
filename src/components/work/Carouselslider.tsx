import React from "react";
import { Flex } from "@once-ui-system/core";

const CarouselBars = ({ clients, active, setActive }: any) => {
  // Logic for Infinite Looping:
  // calculate the offset to keep the 'active' item at the 2nd position (index 1).
  // Each bar is 100px + 4px gap (gap={1} is 8px maybe?).
  const BAR_WIDTH = 100;
  const GAP = 8;
  const CENTER_OFFSET = BAR_WIDTH + GAP;

  // The translation moves the track so the active index is centered
  const translateX = -active * (BAR_WIDTH + GAP) + CENTER_OFFSET;

  return (
    <div
      style={{
        maxWidth: "320px",
        overflow: "hidden",
        //margin: "0 auto",
        position: "relative",
      }}
    >
      <Flex
        gap={1}
        align="center"
        style={{
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: `translateX(${translateX}px)`,
        }}
      >
        {clients.map((c: any, i: number) => (
          <button
            key={c.id}
            onClick={() => setActive(i)}
            aria-label={`View ${c.shortName}`}
            style={{
              all: "unset",
              cursor: "pointer",
              padding: "4px 0",
              flexShrink: 0, // Prevents bars from squishing
            }}
          >
            <span
              style={{
                display: "block",
                width: `${BAR_WIDTH}px`,
                height: "2px",
                background: i === active ? c.accent : "gray",
                borderRadius: "1px",
                opacity: i === active ? 1 : 0.4, // Visual cue for focus
                transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </button>
        ))}
      </Flex>
    </div>
  );
};

export default CarouselBars;
