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
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import LineWaves from "@/components/ui/line-waves";
import HomeNav from "@/components/work/Navigation";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    //image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingTop="12" horizontal="center">
      <LineWaves
        speed={0.3}
        innerLineCount={32}
        outerLineCount={36}
        warpIntensity={1}
        rotation={-45}
        edgeFadeWidth={0}
        colorCycleSpeed={1}
        brightness={0.2}
        color1="#070707"
        color2="#000000"
        color3="#ffffff"
        enableMouseInteraction
        mouseInfluence={2}
      />
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          <RevealFx
            marginTop={15}
            translateY="4"
            fillWidth
            horizontal="center"
            paddingBottom="16"
          >
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx
            marginBottom={15}
            translateY="8"
            delay={0.2}
            fillWidth
            horizontal="center"
            paddingBottom="32"
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
            >
              {home.subline}
            </Text>
          </RevealFx>
        </Column>
      </Column>
      {/* navigation menu */}
      <HomeNav />
      <Column
        fillWidth
        horizontal="center"
        gap="m"
        background="surface"
        radius="xl-8"
        marginTop={2}
        marginBottom={5}
      >
        <Column maxWidth="m" horizontal="center" align="center">
          <RevealFx
            translateY="4"
            fillWidth
            horizontal="center"
            paddingBottom="16"
          >
            <Heading
              wrap="balance"
              variant="heading-default-xl"
              marginTop={2}
              marginBottom={1}
              style={{ color: "white", fontSize: "2.8em", lineHeight: 1.16 }}
            >
              From award-winning Huacaya fleeces to sustainably grown greenhouse
              produce, explore the diverse agricultural yields and farm
              management systems I have cultivated throughout the years.
            </Heading>
          </RevealFx>
        </Column>
      </Column>
    </Column>
  );
}
