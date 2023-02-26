import { Box, Flex, Stack, Text } from "@mantine/core";
import { IconClipboard, IconClipboardList } from "@tabler/icons";
import React from "react";

function EmptyOrder() {
  return (
    <Flex align="center" sx={{ flexDirection: "column" }}>
      <IconClipboardList size="200" color="#CBD5E1" style={{ strokeWidth: .3 }} />
      <Text color="blueGray.3" size="lg" weight={600}>
        No orders available
      </Text>
    </Flex>
  );
}

export default EmptyOrder;
