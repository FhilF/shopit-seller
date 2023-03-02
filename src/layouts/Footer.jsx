import {
  ActionIcon,
  Box,
  Divider,
  Flex,
  Grid,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconLink,
  IconWorld,
} from "@tabler/icons";
import { isProduction } from "config";
import React from "react";
import FooterLogoImage from "./FooterLogoImage";

function Footer() {
  return (
    <Stack spacing={0} mt={50}>
      <Flex
        justify="center"
        sx={(theme) => ({ minHeight: "180px", background: "#282a2e" })}
      >
        <Box className="responsive" py="lg">
          <Grid
            sx={(theme) => ({
              ".footer-top-item": {
                color: "#ffffff",
                ".contact-icon": {
                  color: theme.colors.yellow[8],
                },
                ".footer-link": {
                  color: theme.colors.yellow[8],
                  ":hover": {
                    textDecoration: "underline",
                  },
                },
              },
            })}
          >
            <Grid.Col className="footer-top-item" span={12} md={4}>
              <FooterLogoImage />
            </Grid.Col>
            <Grid.Col className="footer-top-item" span={12} md={4}>
              <Stack spacing="md">
                <Stack spacing={4}>
                  <Text size={15} weight={600}>
                    Shop It Links
                  </Text>
                  <UnstyledButton
                    className="footer-link"
                    color="yellow.7"
                    component="a"
                    href={isProduction ? "https://seller.shopit-demo.com" : "http://localhost:3000/"}
                  >
                    <Text size="sm">Shop It Main</Text>
                  </UnstyledButton>
                </Stack>
                <Stack spacing={4}>
                  <Text size={15} weight={600}>
                    Help
                  </Text>
                  <UnstyledButton
                    className="footer-link"
                    color="yellow.7"
                    component="a"
                    href="/guide"
                  >
                    <Text size="sm">Shop It Guide</Text>
                  </UnstyledButton>
                </Stack>
              </Stack>
            </Grid.Col>
            <Grid.Col className="footer-top-item" span={12} md={4}>
              <Stack spacing="md">
                <Stack spacing={4}>
                  <Text size={15} weight={600}>
                    Contact Me
                  </Text>
                  <Text size="sm" color="yellow.5">
                    fhilipfernandez@gmail.com
                  </Text>
                </Stack>
                <Stack spacing={4}>
                  <Text size={15} weight={600}>
                    Links
                  </Text>
                  <Group spacing="sm">
                    <UnstyledButton className="contact-icon">
                      <IconWorld />
                    </UnstyledButton>
                    <UnstyledButton className="contact-icon">
                      <IconBrandGithub />
                    </UnstyledButton>
                    <UnstyledButton className="contact-icon">
                      <IconBrandLinkedin />
                    </UnstyledButton>
                  </Group>
                </Stack>
              </Stack>
            </Grid.Col>
            {/* <Grid.Col className="footer-top-item" span={12} md={4}>
              aa
            </Grid.Col> */}
          </Grid>
        </Box>
      </Flex>
      <Group
        sx={(theme) => ({
          height: "60px",
          background: theme.colors.dark[6],
          color: "#ffffff",
        })}
        position="center"
        align="center"
        spacing={4}
      >
        <Text size="sm">Copyright ©2022 Project created By </Text>
        <UnstyledButton
          component="a"
          target="_blank"
          rel="noopener noreferrer"
          href="https://stackoverflow.com/"
          sx={(theme) => ({
            color: theme.colors.yellow[8],
            textDecoration: "underline",
          })}
        >
          <Text size="sm" weight={600}>
            Fhilip Fernandez
          </Text>
        </UnstyledButton>
      </Group>
    </Stack>
  );
}

export default Footer;
