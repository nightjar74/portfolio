import React from "react";
import { Flex, Text } from "@once-ui-system/core";

const Desc = () => {
  return (
    <Flex fillWidth direction="column" padding="xl" gap="s">
      {/* The 'variant' prop automatically handles responsive scaling */}
      <Text variant="display-strong-l" as="h1" style={{ color: "black" }}>
        Video
      </Text>

      <Text
        as="p"
        onBackground="info-alpha-strong"
        style={{ fontSize: "20px", lineHeight: 1.8, marginTop: "25px" }}
      >
        <span className="font-extrabold">Why Alpacas Are Awesome</span> Aside
        from being impossibly soft, alpacas are celebrated for their gentle
        temperament and eco-friendly nature. Unlike goats or sheep that can
        overgraze or damage the soil with their hooves, alpacas have padded feet
        that are kind to the terrain and they nibble grass without pulling it up
        by the roots. They are also highly social creatures that thrive on
        community, making them the ultimate "team players" of the animal
        kingdom.
        <br />
        <span>{""}</span>
        <br />
        Alpacas are as fascinating as they are fluffy, possessing a unique set
        of traits that set them apart from other livestock. Beyond their famous
        "humming" communication, these creatures are incredibly efficient eaters
        thanks to their three stomach compartments and lack of upper front
        teeth, which they compensate for with a hard dental pad. Their fleece is
        a marvel of nature, coming in 22 natural colors and being completely
        hypoallergenic because it lacks the lanolin found in sheep's wool.
        Socially, they are remarkably disciplined, utilizing communal dung piles
        to keep their grazing areas clean and protecting their herd with
        high-pitched alarm calls that sound like a rhythmic bray.
      </Text>
    </Flex>
  );
};

export default Desc;
