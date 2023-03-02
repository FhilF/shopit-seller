import { Group, Stack, Text } from "@mantine/core";
import React from "react";

function TesterSequence() {
  return (
    <Stack>
      <Text weight={600} size="lg" color="blueGray.6">
        Tester Sequence
      </Text>
      <Text size="sm" color="blueGray.4">
        (Note: Test accounts are provided for faster testing)
      </Text>
      <Group spacing={6}>
        <Text size="sm" color="blueGray.6">
          Step 1:
        </Text>
        <Text size="sm" color="blueGray.6" weight={600}>
          Add Address
        </Text>
        <Text size="sm" color="blueGray.4">
          (Buyer)
        </Text>
      </Group>
      <Group spacing={6}>
        <Text size="sm" color="blueGray.6">
          Step 2:
        </Text>
        <Text size="sm" color="blueGray.6" weight={600}>
          Order Product
        </Text>
        <Text size="sm" color="blueGray.4">
          (Buyer)
        </Text>
      </Group>
      <Group spacing={6}>
        <Text size="sm" color="blueGray.6">
          Step 3:
        </Text>
        <Text size="sm" color="blueGray.6" weight={600}>
          Approve New Orders
        </Text>
        <Text size="sm" color="blueGray.4">
          (Seller)
        </Text>
      </Group>

      <Group spacing={6}>
        <Text size="sm" color="blueGray.6">
          Step 4:
        </Text>
        <Text size="sm" color="blueGray.6" weight={600}>
          Mark Orders As Shipped
        </Text>
        <Text size="sm" color="blueGray.4">
          (Seller)
        </Text>
      </Group>
      <Group spacing={6}>
        <Text size="sm" color="blueGray.6">
          Step 5:
        </Text>
        <Text size="sm" color="blueGray.6" weight={600}>
          View Order
        </Text>
        <Text size="sm" color="blueGray.4">
          (Buyer)
        </Text>
      </Group>
    </Stack>
  );
}

export default TesterSequence;
