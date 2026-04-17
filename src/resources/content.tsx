import { AuroraText } from "@/components/ui/aurora-text";
import {
  About,
  VideoGallery,
  Gallery,
  Home,
  Newsletter,
  Person,
  Social,
  Work,
} from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "der",
  lastName: "Schäfer",
  name: `der Schäfer`,
  role: "Alpaca farmer and cucumber cultivator",
  avatar: "",
  email: "example@gmail.com",
  location: "Europe/Vienna", // Expecting the IANA time zone identifier,
  languages: ["English", "Norwegian", "Dutch"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "#",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "#",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "#",
    essential: false,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "#",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `#`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/favicon.png",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as an ${person.role}`,
  headline: (
    <>
      <AuroraText>Cultivating</AuroraText> excellence from pasture to fleece.
    </>
  ),
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I'm Aðalberg, an Alpaca farmer at{" "}
      <Text as="span" size="xl" weight="strong">
        Golden Fleece Alpacas
      </Text>
      , where i specialize in alpaca management <br /> selective breeding, and
      sustainable Alpaca fleece cultivation
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "#",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Aðalberg is an Austrian-based alpaca farmer with a passion for
        transforming the rugged demands of livestock management into
        sustainable, high-quality fleece production. His work spans animal
        husbandry, the precision of fiber morphology, and the convergence of
        traditional agricultural practices with modern agritech.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Golden Fleece Alpacas",
        timeframe: "2022 - Present",
        role: "Senior Alpaca Farmer",
        achievements: [
          <>
            Managed a herd of 50+ Huacaya alpacas, implementing a selective
            breeding program that improved fiber density by 25%.
          </>,
          <>
            Streamlined the annual shearing process and fleece grading system,
            increasing the yield of Grade 1 "Baby Alpaca" fiber for local
            artisans.
          </>,
        ],
        images: [
          {
            src: "/images/gallery/alpacas_ai.png",
            alt: "Alpaca Herd Management",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Green Valley Dairy",
        timeframe: "2018 - 2022",
        role: "Dairy Herd Manager",
        achievements: [
          <>
            Oversaw daily operations for a 200-head Holstein dairy farm,
            maintaining rigorous sanitation standards and animal health
            protocols.
          </>,
          <>
            Optimized automated milking systems (AMS) and nutritional planning,
            resulting in a 15% increase in average daily milk production per
            cow.
          </>,
        ],
        images: [],
      },
      {
        company: "Sun-Kissed Acres",
        timeframe: "2015 - 2018",
        role: "Cucumber Cultivation Specialist",
        achievements: [
          <>
            Mastered hydroponic and field-grown cucumber production, delivering
            premium yields for organic wholesale markets.
          </>,
          <>
            Implemented an integrated pest management (IPM) strategy that
            reduced chemical pesticide reliance by 40% while maintaining crop
            quality.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Bogor Agricultural University (IPB)",
        description: (
          <>
            Degree in Animal Science, specializing in Livestock Management and
            Genetics.
          </>
        ),
      },
      {
        name: "Global Alpaca Institute",
        description: (
          <>
            Advanced certification in Camelid health, fiber morphology, and
            sustainable shearing practices.
          </>
        ),
      },
      {
        name: "Modern Agritech Academy",
        description: (
          <>
            Completed intensive coursework in Hydroponic Systems and Greenhouse
            Climate Control.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical Skills",
    skills: [
      {
        title: "Animal Husbandry",
        description: (
          <>
            Expertise in herd health management, fiber grading, and automated
            milking systems (AMS) for high-yield production.
          </>
        ),
        tags: [
          {
            name: "Veterinary Care",
            icon: "health",
          },
          {
            name: "Fiber Grading",
            icon: "fiber",
          },
        ],
        images: [],
      },
      {
        title: "Agricultural Optimization",
        description: (
          <>
            Specialized in hydroponic system maintenance and Integrated Pest
            Management (IPM) for sustainable cucumber cultivation.
          </>
        ),
        tags: [
          {
            name: "Hydroponics",
            icon: "water",
          },
          {
            name: "Sustainability",
            icon: "leaf",
          },
        ],
        images: [],
      },
    ],
  },
};

const videoGallery: VideoGallery = {
  path: "/videoGallery",
  label: "Videos",
  title: "",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/Alpaca-h1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Alpaca-v4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Alpaca-h3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Alpaca-v1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Alpaca-v2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Alpaca-h2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Alpaca-h4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Alpaca-v3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, videoGallery, work, gallery };
