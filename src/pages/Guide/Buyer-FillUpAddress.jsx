import { Accordion, Box, Group, Stack, Text } from "@mantine/core";
import React from "react";

function FillUpAddress() {
  return (
    <Accordion.Item value="fillUpAddress">
      <Accordion.Control>
        <Text weight={600} color="blueGray.6">
          Add Address
        </Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack spacing="xs">
          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 1:
            </Text>
            <Text size="sm" color="blueGray.5">
              Sign in to your account.
            </Text>
          </Box>

          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 2:
            </Text>
            <Group spacing={5}>
              <Text size="sm" color="blueGray.5">
                Open your profile menu and navigate to Account Settings.
                Then head to Account &gt; Addresses.
              </Text>
            </Group>
          </Box>

          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 3:
            </Text>
            <Text size="sm" color="blueGray.5">
              Click "Add" then fill up the form to add your address. (Note: You
              can use this to automatically fill up your Checkout form.)
            </Text>
          </Box>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default FillUpAddress;
