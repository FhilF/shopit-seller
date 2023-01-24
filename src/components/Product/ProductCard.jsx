import {
  Avatar,
  Box,
  Flex,
  Grid,
  Group,
  Paper,
  Rating,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomImage from "components/CustomImage";

function ProductCard(props) {
  const { item, showStocks, href } = props;
  const navigate = useNavigate();
  return (
    <UnstyledButton
      style={{ textDecoration: "none" }}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
      component="a"
      href={href}
    >
      <Paper p={0} shadow={0} withBorder pb={10}>
        <Stack spacing="xs">
          {/* <Avatar src={image[0].fileUrl} radius={0}></Avatar> */}
          <CustomImage src={item.thumbnail} />
          <Stack spacing={2} px="xs">
            <Box
              sx={{
                minHeight: "40px",
                wordWrap: "break-word",
                whiteSpace: "normal",
                overflow: "hidden",
                display: "-webkit-box",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "2",
              }}
            >
              <Text size={13} weight={600} color="dark.4">{item.name}</Text>
            </Box>
            <Text size="sm" color="yellow.7">
              {item.isMultipleVariation ? (
                <>
                  &#8369;{item.variations[0].price} - &#8369;
                  {item.variations[item.variations.length - 1].price}
                </>
              ) : (
                <>&#8369;{item.price}</>
              )}
            </Text>
            {showStocks && (
              <Group spacing={4}>
                <Text size="sm" color="dark.3" weight={600}>
                  Stocks:
                </Text>
                <Text size="sm" color="gray.5" weight={600}>
                  {item.isMultipleVariation
                    ? item.variations.reduce((a, b) => a + b.stock, 0)
                    : item.stock}
                </Text>
              </Group>
            )}
            <Group spacing={4}>
              <Text size="xs" color="gray.6">(0)</Text>
              <Rating
                readOnly
                fractions={1}
                sx={{
                  cursor: "pointer",
                  ".mantine-Rating-label": {
                    cursor: "pointer !important",
                    svg: { width: "14px", height: "14px" },
                  },
                }}
              />
            </Group>
          </Stack>
        </Stack>
      </Paper>
    </UnstyledButton>
  );
}

export default ProductCard;
