import { Box, Group, Text, UnstyledButton } from "@mantine/core";
import React from "react";

function FooterLogoImage() {
  return (
    <UnstyledButton component="a" href="/">
      <Group spacing={4}>
        <img
        style={{ width: "120px" }}
        className="logo"
          src={process.env.PUBLIC_URL + "/shop-it-logo.png"}
          alt="shop-it-logo"
        />
        <Text color="gray.1">-</Text>
        <Text weight={600} mt={5} color="yellow.7">
          Seller Portal
        </Text>
      </Group>
    </UnstyledButton>
  );
}

export default FooterLogoImage;
