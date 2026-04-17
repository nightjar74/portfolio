import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
  Grid,
  SmartLink,
} from "@once-ui-system/core";
import styles from "./Navigation.module.scss";

export default function HomeNav() {
  const navItems = [
    {
      title: "About",
      href: "/about",
      image: "/images/nav/about.jpg",
      span: "large",
    },
    {
      title: "Videos",
      href: "/videoGallery",
      image: "/images/nav/videos.jpg",
      span: "small",
    },
    {
      title: "Projects",
      href: "/work",
      image: "/images/nav/projects.jpg",
      span: "small",
    },
  ];

  return (
    <Column
      maxWidth="m"
      paddingY={0}
      horizontal="center"
      background="surface"
      radius="xl-8"
    >
      <RevealFx translateY="16" delay={0.7} fillWidth>
        <Grid
          columns={2}
          gap={1}
          fillWidth
          // On small screens, stack everything
          s={{ columns: "1" }}
        >
          <SmartLink
            href={"/about"}
            className={`${styles.navLink} styles.largeSpan`}
          >
            <img
              src="/images/gallery/Alpaca-v1.jpg"
              className={styles.navGridImage}
              alt="About"
            />
            <div className={styles.navGridOverlay}>
              <Heading
                variant="display-strong-xs"
                onBackground="neutral-strong"
              >
                About
              </Heading>
            </div>
          </SmartLink>

          {/* Stacked Column for the other two (1/3 width) on larger screens */}
          <Column gap={1} fillWidth>
            <SmartLink
              href="/videoGallery"
              className={`${styles.navLink} ${styles.smallSpan}`}
            >
              <img
                src="/images/gallery/Alpaca-v2.jpg"
                className={styles.navGridImage}
                alt="Videos"
              />
              <div className={styles.navGridOverlay}>
                <Heading
                  variant="display-strong-xs"
                  onBackground="neutral-strong"
                >
                  Videos
                </Heading>
              </div>
            </SmartLink>

            <SmartLink
              href={"/work"}
              className={`${styles.navLink} ${styles.smallSpan}`}
            >
              <img
                src="/images/gallery/Alpaca-v3.jpg"
                className={styles.navGridImage}
                alt="Projects"
              />
              <div className={styles.navGridOverlay}>
                <Heading
                  variant="display-strong-xs"
                  onBackground="neutral-strong"
                >
                  Projects
                </Heading>
              </div>
            </SmartLink>
          </Column>
        </Grid>
      </RevealFx>
    </Column>
  );
}
