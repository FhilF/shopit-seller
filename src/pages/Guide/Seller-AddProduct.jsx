import { Accordion, Box, Group, Stack, Text } from "@mantine/core";
import { isProduction } from "config";
import React from "react";

function AddProduct() {
  return (
    <Accordion.Item value="addProduct">
      <Accordion.Control>
        <Text weight={600} color="blueGray.6">
          Add Product To List
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
                From the portal, navigate to Products &gt; Add New Product.
              </Text>
            </Group>
          </Box>

          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 4:
            </Text>
            <Group spacing={5}>
              <Text size="sm" color="blueGray.5">
                Fill Up the form to add a new product. (Note: You can Enable
                Multiple Variation to sell multiple variations of products. For
                Example: SSD Capacity: Option 1 - 1TB, Option 2 - 2TB)
              </Text>
            </Group>
          </Box>

          <Box>
            <Text size="sm" color="blueGray.5" weight={600}>
              Step 5:
            </Text>
            <Group spacing={5}>
              <Text size="sm" color="blueGray.5">
                Save the product by pressing Submit.
              </Text>
            </Group>
          </Box>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default AddProduct;
