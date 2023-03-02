import { Accordion, Box, Group, Stack, Text } from "@mantine/core";
import { isProduction } from "config";
import React from "react";

function MarkOrdersAsShipped() {
  return (
    <Accordion.Item value="markOrders">
      <Accordion.Control>
        <Text weight={600} color="blueGray.6">
          Mark Orders As Shipped
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
                Sign in to your account.
              </Text>
            </Group>
          </Box>

          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 3:
            </Text>
            <Group spacing={5}>
              <Text size="sm" color="blueGray.5">
                From the portal, navigate to Orders.
              </Text>
            </Group>
          </Box>

          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 4:
            </Text>
            <Group spacing={5}>
              <Text size="sm" color="blueGray.5">
                Select "To Ship" Tab. This tab will display all products that
                are still pending to be marked as shipped.
              </Text>
            </Group>
          </Box>

          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 5:
            </Text>
            <Group spacing={5}>
              <Text size="sm" color="blueGray.5">
                Find a product that needs to be marked as shipped, then press
                the Order Shipped Button to mark the order as shipped for the
                buyer. (Note: In this demo version, orders are automatically
                marked as Order Received by the buyer if it was marked as
                shipped by the seller.)
              </Text>
            </Group>
          </Box>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default MarkOrdersAsShipped;
