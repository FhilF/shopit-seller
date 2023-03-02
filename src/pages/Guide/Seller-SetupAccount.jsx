import { Accordion, Box, Group, Stack, Text } from "@mantine/core";
import { isProduction } from "config";
import React from "react";

function SetupAccount() {
  return (
    <Accordion.Item value="setupAccount">
      <Accordion.Control>
        <Text weight={600} color="blueGray.6">
          Setup Shop Account
        </Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack spacing="xs">
          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 1:
            </Text>
            <Text size="sm" color="blueGray.5">
              Navigate to{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={isProduction ? "seller.shopit.com" : "localhost:3001"}
              >
                Shop It Seller Portal
              </a>
            </Text>
          </Box>

          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 2:
            </Text>
            <Group spacing={5}>
              <Text size="sm" color="blueGray.5">
                Sign in to your account then the page will direct you to set up
                your Shop Account if you haven't set it up.
              </Text>
            </Group>
          </Box>

          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 3:
            </Text>
            <Text size="sm" color="blueGray.5">
              Finish the form then save.
            </Text>
          </Box>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default SetupAccount;
