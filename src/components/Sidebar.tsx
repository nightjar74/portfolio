"use client";

import { usePathname } from "next/navigation";
import {
  Flex,
  Text,
  Row,
  Heading,
  Button,
  IconButton,
  SmartLink,
} from "@once-ui-system/core";
import {
  routes,
  person,
  about,
  videoGallery,
  work,
  gallery,
} from "@/resources";
import Link from "next/link";
import styles from "./Sidebar.module.scss";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const pathname = usePathname() ?? "";
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar automatically when the route changes (on mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/about", label: "ABOUT", active: pathname === "/about" },
    {
      href: "/videoGallery",
      label: "VIDEO",
      active: pathname.startsWith("/videoGallery"),
    },
    { href: "/work", label: "DESIGN", active: pathname.startsWith("/work") },
    {
      href: "/gallery",
      label: "PHOTO",
      active: pathname.startsWith("/gallery"),
    },
  ];

  return (
    <>
      {/* 1. MOBILE TOGGLE BUTTON - Only visible on small screens */}
      <Row
        position="fixed"
        top="0"
        left="0"
        zIndex={10}
        padding="16"
        //hide="s"
        style={{ display: isOpen ? "none" : "flex" }}
      >
        <IconButton
          icon="menu"
          variant="secondary"
          onClick={() => setIsOpen(true)}
          className="mobile-menu-trigger"
        />
      </Row>
      <Flex
        as="aside"
        fillHeight
        maxWidth={20}
        background="page"
        direction="column"
        paddingX="40"
        paddingY="80"
        position="fixed"
        left="0"
        top="0"
        zIndex={10}
        borderRight="neutral-alpha-weak"
        justify-content="space-between"
        style={{
          width: "320px",
          transition: "transform 0.3s ease",
          // On mobile: slide out of view (left). On desktop: always visible (0).
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
        className="sidebar-responsive"
      >
        {/* Mobile Close Button */}
        <Flex position="absolute" top="16" right="16">
          <IconButton
            icon="close"
            onClick={() => setIsOpen(false)}
            variant="tertiary"
            className="mobile-only-close"
          />
        </Flex>
        {/* Branding Section */}
        <Flex direction="column" gap="8">
          <SmartLink href="/" style={{ marginLeft: "0px", marginRight: "0px" }}>
            <Heading
              variant="display-strong-m"
              style={{ lineHeight: "1", textTransform: "uppercase" }}
            >
              {person.firstName}
              <br />
              {person.lastName}
            </Heading>
          </SmartLink>
        </Flex>

        {/* Navigation Section */}
        <Flex direction="column" gap="24" marginTop="64">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ textDecoration: "none" }}
            >
              <Text
                variant="body-strong-m"
                style={{
                  letterSpacing: "0.1em",
                  color: link.active
                    ? "var(--neutral-on-background-strong)"
                    : "var(--neutral-on-background-medium)",
                  transition: "color 0.2s ease",
                }}
              >
                {link.label}
              </Text>
            </Link>
          ))}
        </Flex>

        {/* Footer/Contact Section */}
        <Flex fillWidth position="absolute" bottom="0" left="0">
          <Button
            href="/contact"
            fillWidth
            size="l"
            variant="primary"
            style={{
              borderRadius: "0",
              height: "80px",
              backgroundColor: "#FF4D4D",
            }}
          >
            <Text variant="body-strong-s" style={{ letterSpacing: "0.2em" }}>
              CONTACT
            </Text>
          </Button>
        </Flex>
      </Flex>

      {/* 3. MOBILE OVERLAY - Closes sidebar when clicking outside */}
      {isOpen && (
        <Flex
          position="fixed"
          //inset="0"
          zIndex={10}
          background="overlay"
          onClick={() => setIsOpen(false)}
          style={{ backdropFilter: "blur(4px)" }}
        />
      )}

      {/* 4. DESKTOP OVERRIDE */}
      <style jsx global>{`
        @media (min-width: 915px) {
          .sidebar-responsive {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </>
  );
};
