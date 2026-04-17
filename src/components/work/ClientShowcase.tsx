"use client";

import React, { useEffect, useState } from "react";
import { Flex, Grid, Text, Heading, Tag, Line } from "@once-ui-system/core";
import Image from "next/image";
import { Button } from "../ui/Button";
import CarouselBars from "./Carouselslider";
import PixelTrail from "../ui/PixelTrail";
import { ConfettiFireworks } from "../ui/ConfettiButton";
import PreloadTexture from "@/utils/preloadTexture";
import { useTextureGallery } from "@/hooks/useTextureGallery";

export interface Client {
  id: number;
  shortName: string;
  fullName: string;
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  accent: string;
}

const clients: Client[] = [
  {
    id: 1,
    shortName: "NHS",
    fullName: "Golden\nFleece\nAlpacas",
    tags: ["WordPress", "Animation", "Campaigns", "Illustration"],
    imageSrc: "/images/gallery/alpacas_ai.png",
    imageAlt: "Alpacas illustration",
    accent: "#0072CE",
  },
  {
    id: 2,
    shortName: "TATE",
    fullName: "Green\nValley\nDairy",
    tags: ["Identity", "Editorial", "Print", "Digital"],
    imageSrc: "/images/gallery/green-valley-dairy-farm.png",
    imageAlt: "Tate Modern editorial project",
    accent: "#E63329",
  },
  {
    id: 3,
    shortName: "GDS",
    fullName: "Sun-Kissed\nAcres",
    tags: ["UX Research", "Design Systems", "Accessibility"],
    imageSrc: "/images/gallery/farm-ai.png",
    imageAlt: "Government Digital Service",
    accent: "#00703C",
  },
];

function ClientName({ name }: { name: string }) {
  return (
    <Flex direction="column" gap="0">
      {name.split("\n").map((line, i) => (
        <Heading
          key={i}
          as="h2"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "black",
          }}
        >
          {line}
        </Heading>
      ))}
    </Flex>
  );
}

/* function TagList({ tags }: { tags: string[] }) {
  return (
    <Flex wrap gap={6}>
      {tags.map((tag) => (
        <Tag
          key={tag}
          label={tag}
          size="s"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            border: "1px solid var(--neutral-border-medium)",
            background: "transparent",
            color: "var(--neutral-on-background-medium)",
            borderRadius: "2px",
            padding: "3px 8px",
          }}
        />
      ))}
    </Flex>
  );
} */

function Paragraph({ text }: { text: string }) {
  return (
    <Flex
      direction="column"
      fillWidth
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        //paddingTop: "12px",
        paddingBottom: "20px",
      }}
    >
      <Text
        variant="body-default-s"
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "11px",
          lineHeight: "1.6",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "black",
        }}
      >
        {text}
      </Text>
    </Flex>
  );
}

export default function Showcase() {
  const {
    active,
    client,
    handleNext,
    handlePrev,
    isLoading,
    total,
    setActive,
  } = useTextureGallery(clients);

  return (
    <Flex
      direction="column"
      //className="frosted-aurora"
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        background: "white",
        border: "1px solid var(--neutral-border-medium)",
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {/* Top bar */}
      <Flex
        align="center"
        style={{
          justifyContent: "space-between",
          padding: "10px 24px",
          borderBottom: "1px solid var(--neutral-border-medium)",
        }}
      >
        <Text
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "black",
          }}
        >
          Selected Work
        </Text>
        <Text
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.18em",
            color: "var(--neutral-on-background-weak)",
          }}
        >
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </Text>
      </Flex>

      {/* Main grid — fixed 500px so total ≈ 560px with bars */}
      <Grid
        className="responsive-grid"
        /*         style={{
          gridTemplateColumns: "minmax(0, 360px) 1fr",
          gap: "0",
          height: "500px",
        }} */
      >
        {/* Left panel */}
        <Flex
          direction="column"
          style={{
            justifyContent: "space-between",
            padding: "28px 32px",
            borderRight: "1px solid var(--neutral-border-medium)",
            height: "100%",
            overflow: "hidden",
          }}
          className="gap-5 lg:gap-0"
        >
          <Flex direction="column" gap="16">
            <Flex direction="column" gap="8">
              <Text
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--neutral-on-background-weak)",
                }}
              >
                Client
              </Text>
              <div
                style={{
                  width: "28px",
                  height: "2px",
                  background: client.accent,
                  transition: "background 0.5s ease",
                  borderRadius: "1px",
                }}
              />
            </Flex>
            <ClientName name={client.fullName} />
          </Flex>

          <Flex
            direction="column"
            gap={2} /* style={{ backgroundColor: "black" }} */
          >
            {/* <TagList tags={client.tags} /> */}
            <Paragraph text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
            <Line />
            <ConfettiFireworks />
          </Flex>
        </Flex>

        {/* Right panel — image */}
        <div
          className="image-panel"
          style={{ position: "relative", overflow: "hidden", height: "100%" }}
        >
          <PixelTrail
            gridSize={15}
            trailSize={0.2}
            maxAge={300}
            interpolate={5.4}
            color="#fafafa"
            gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
            imgPath={client.imageSrc}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.12) 0%, transparent 55%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "18px",
              right: "22px",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1,
              color: "rgba(255,255,255,0.1)",
              letterSpacing: "-0.04em",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {client.shortName}
          </div>
        </div>
      </Grid>

      {/* Bottom nav bar */}
      <Flex
        align="center"
        style={{
          justifyContent: "space-between",
          padding: "10px 24px",
          borderTop: "1px solid var(--neutral-border-medium)",
        }}
      >
        {/*         <Flex
          gap={1}
          align="center"
          style={{ maxWidth: "375px", overflow: "hidden" }}
        >
          {clients.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              aria-label={`View ${c.shortName}`}
              style={{ all: "unset", cursor: "pointer", padding: "4px 0" }}
            >
              <span
                style={{
                  display: "block",
                  width: i === active ? "100px" : "100px",
                  height: "2px",
                  background:
                    i === active
                      ? client.accent
                      : "var(--neutral-border-strong)",
                  borderRadius: "1px",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </button>
          ))}
        </Flex> */}
        <CarouselBars clients={clients} active={active} setActive={setActive} />

        <Flex gap="0">
          <button
            //onClick={() => setActive((a) => (a - 1 + total) % total)}
            onClick={handlePrev}
            aria-label="Previous"
            style={{
              all: "unset",
              cursor: "pointer",
              padding: "5px 14px",
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "black",
              borderRight: "1px solid var(--neutral-border-medium)",
            }}
          >
            ← Prev
          </button>
          <button
            //onClick={() => setActive((a) => (a + 1) % total)}
            onClick={handleNext}
            aria-label="Next"
            style={{
              all: "unset",
              cursor: "pointer",
              padding: "5px 14px",
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "black",
            }}
          >
            Next →
          </button>
        </Flex>
      </Flex>
    </Flex>
  );
}
