import { Box, Flex, Group, Stack, Text } from "@mantine/core";
import React from "react";
import CustomImage from "./CustomImage";

function ShopOrderItem({ item }) {
  return (
    <Box>
      <Box sx={{ flex: 1 }}>
        <Flex>
          <Flex
            pb={6}
            sx={(theme) => ({
              width: "85%",
              [theme.fn.largerThan("md")]: {
                width: "85%",
              },
            })}
          >
            <Box w={60}>
              <CustomImage height={60} width={60} src={item.thumbnail} />
            </Box>
            <Stack spacing={1} ml="md">
              <Text
                size={15}
                color="dark.3"
                weight={600}
                sx={{
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  overflow: "hidden",
                  display: "-webkit-box",
                  textOverflow: "ellipsis",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "1",
                }}
              >
                {item.name}
              </Text>
              {item.variationName && (
                <Group spacing={0}>
                  <Text size={13} color="dark.3" weight={700}>
                    {`${item.variationName}:`}
                  </Text>
                  <Text ml={4} size={13} color="dark.3" weight={400}>
                    {`${item.variation}`}
                  </Text>
                </Group>
              )}
              <Text color="blueGray.5" size="sm">{`x${item.qty}`}</Text>
            </Stack>
          </Flex>
          <Group sx={{ flex: 1 }} position="right" align="flex-start">
            <Text size="sm" color="dark.4" weight={600}>{`₱${(
              item.unitPrice * item.qty
            ).toLocaleString()}`}</Text>
          </Group>
        </Flex>
      </Box>
    </Box>
  );
}

export default ShopOrderItem;
