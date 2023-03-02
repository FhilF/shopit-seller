import { Accordion, Box, Group, Stack, Text } from "@mantine/core";
import { isProduction } from "config";
import React from "react";

function ApproveOrder() {
  return (
    <Accordion.Item value="approveOrder">
      <Accordion.Control>
        <Text weight={600} color="blueGray.6">
          Approve New Orders
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
                href={isProduction ? "https://seller.shopit-demo.com" : "localhost:3001"}
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
                Select "Pending" Tab. This tab will display all products that are
                still pending approval of the Shop Owner.
              </Text>
            </Group>
          </Box>

          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 5:
            </Text>
            <Group spacing={5}>
              <Text size="sm" color="blueGray.5">
                Find a product that needs approval, then press the Approve Button to
                confirm the order for the buyer.
              </Text>
            </Group>
          </Box>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default ApproveOrder;
