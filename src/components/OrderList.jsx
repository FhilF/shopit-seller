import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import CustomImage from "components/CustomImage";
import React from "react";
import { listType } from "utils/helper";

function ButtonFragment({ listType }) {
  switch (listType) {
    case 1:
      return "Order Cancelled";
    case 2:
      return "Confirm Order";
    case 3:
      return "Order Shipped";

    default:
      return "";
  }
}

function LabelFragment({ listType }) {
  switch (listType) {
    case 1:
      return (
        <Text size={12} color="blueGray.4">
          Order Cancelled
        </Text>
      );
    case 2:
      return (
        <Text size={12} color="blueGray.4">
          Pending Order
        </Text>
      );
    case 3:
      return (
        <Text size={12} color="blueGray.4">
          Order is being prepared
        </Text>
      );

    case 5:
      return (
        <Text size="sm" color="blueGray.6">
          Order received
        </Text>
      );

    default:
      return "";
  }
}

function OrderList(props) {
  const { list, setOpenCancel, setOpenConfirm, idRef, navigate } = props;

  return (
    <Stack spacing="xs">
      {list.map((v1) => {
        return (
          <Paper p="md" radius="xs" withBorder key={v1._id}>
            <Box>
              <Group position="apart">
                <Group spacing="xs">
                  <Text size="xs" color="blueGray.6" weight={600}>
                    {`Order #${v1._id}`}
                  </Text>
                  <UnstyledButton
                    component="a"
                    href={`/portal/order/${v1._id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/portal/order/${v1._id}`);
                    }}
                  >
                    <Text
                      size="xs"
                      color="blueGray.5"
                      sx={{ textDecoration: "underline" }}
                    >
                      View Order
                    </Text>
                  </UnstyledButton>
                </Group>
                <LabelFragment listType={listType(v1)} />
              </Group>
            </Box>
            <Divider mt="sm" />
            <Stack mt="sm" spacing={4}>
              {v1.Shop.Orders.map((v2) => {
                return (
                  <ShopItem
                    item={v2}
                    key={v2.variationId ? v2.variationId : v2._id}
                  />
                );
              })}
            </Stack>
            <Box>
              <Divider mt="lg" mb="sm" />
              <Group position="apart">
                <Group spacing={0}>
                  {v1.isCancelled || v1.isDelivered ? (
                    <></>
                  ) : (
                    <>
                      <Button
                        size="xs"
                        px="xs"
                        color="dark.4"
                        variant="subtle"
                        onClick={() => {
                          idRef.current = v1._id;
                          setOpenCancel(true);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="xs"
                        px="xs"
                        color="yellow.6"
                        onClick={() => {
                          idRef.current = v1._id;
                          setOpenConfirm(true);
                        }}
                      >
                        <ButtonFragment listType={listType(v1)} />
                      </Button>
                    </>
                  )}
                </Group>
                <Group spacing="xs">
                  <Text color="dark.4" weight={600}>
                    Total:
                  </Text>
                  <Group position="right" align="flex-start" w={100}>
                    <Text color="yellow.7" weight={600}>
                      {`₱${v1.Shop.Orders.reduce(
                        (a, b) => a + b.unitPrice * b.qty,
                        0
                      ).toLocaleString()}`}
                    </Text>
                  </Group>
                </Group>
              </Group>
            </Box>
          </Paper>
        );
      })}
    </Stack>
  );
}

const ShopItem = ({ item }) => {
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
};

export default OrderList;
