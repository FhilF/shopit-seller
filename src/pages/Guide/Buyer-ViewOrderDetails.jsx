import { Accordion, Box, Group, Stack, Text } from "@mantine/core";
import { isProduction } from "config";
import React from "react";

function ViewOrder() {
  return (
    <Accordion.Item value="viewOrder">
      <Accordion.Control>
        <Text weight={600} color="blueGray.6">
          View Order
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
                Choose a tab: Pending, To Ship, To Receive, or Completed to view
                your list of orders. Choose one and click View Order, which will
                display your order details and status.
              </Text>
            </Group>
          </Box>

        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default ViewOrder;
