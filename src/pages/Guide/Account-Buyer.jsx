import { Accordion, Box, Group, Stack, Text } from "@mantine/core";
import { isProduction } from "config";
import React from "react";

function BuyerAccount() {
  return (
    <Accordion.Item value="buyerAccount">
      <Accordion.Control>
        <Text weight={600} color="blueGray.6">
          Buyer Testing Account
        </Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack spacing="xs">
          <Box>
            <Group>
              <Text size="sm" color="blueGray.5" weight={600}>
                Username:
              </Text>
              <Text size="sm" color="blueGray.5">
              jmrdc34
              </Text>
            </Group>

            <Group>
              <Text size="sm" color="blueGray.5" weight={600}>
                Password:
              </Text>
              <Text size="sm" color="blueGray.5">
                tester123
              </Text>
            </Group>
            
          </Box>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default BuyerAccount;
