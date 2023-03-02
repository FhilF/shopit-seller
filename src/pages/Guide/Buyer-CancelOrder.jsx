import { Accordion, Box, Group, Stack, Text } from "@mantine/core";
import { isProduction } from "config";
import React from "react";

function CancelOrder() {
  return (
    <Accordion.Item value="cancelOrder">
      <Accordion.Control>
        <Text weight={600} color="blueGray.6">
          Cancel Order
        </Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack spacing="xs">
          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 1:
            </Text>
            <Group spacing={5}>
              <Text size="sm" color="blueGray.5">
                Sign in to your account.
              </Text>
            </Group>
          </Box>

          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 2:
            </Text>
            <Group spacing={5}>
              <Text size="sm" color="blueGray.5">
                Open your profile menu and navigate to Orders.
              </Text>
            </Group>
          </Box>

          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 3:
            </Text>
            <Group spacing={5}>
              <Text size="sm" color="blueGray.5">
                Select "Pending" Tab. This tab will display all products that
                are still pending approval of the Shop Owner. (Note: You can
                only cancel orders that are still on pending)
              </Text>
            </Group>
          </Box>

          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 4:
            </Text>
            <Group spacing={5}>
              <Text size="sm" color="blueGray.5">
                Find a product that needs to be cancelled, then press the Cancel
                Button to cancel the order.
              </Text>
            </Group>
          </Box>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default CancelOrder;
