import {
  ActionIcon,
  Box,
  Divider,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Timeline,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconCheck,
  IconDownload,
  IconGitBranch,
  IconHandGrab,
  IconList,
  IconTruckDelivery,
  IconX,
} from "@tabler/icons";
import axios from "axios";
import OrderList from "components/OrderList";
import ShopOrderItem from "components/ShopOrderItem";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContentMessage } from "utils/contentMessageProvider";
import { listType } from "utils/helper";
import OrderAction from "./OrderAction";

function LabelFragment({ listType }) {
  switch (listType) {
    case 1:
      return (
        <Text size="sm" color="blueGray.6">
          Order Cancelled
        </Text>
      );
    case 2:
      return (
        <Text size="sm" color="blueGray.6">
          Pending Order
        </Text>
      );
    case 3:
      return (
        <Text size="sm" color="blueGray.6">
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

function View() {
  const { id } = useParams();
  const { setErrorType } = useContentMessage();
  const [order, setOrder] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/api/shop/order/${id}`, { withCredentials: true })
      .then((res) => {
        setOrder(res.data.Order);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setErrorType("Item404");
          return true;
        }
      });
  }, []);

  return (
    <Paper className="content">
      <Box mb="xl" pt="xl" pb={40}>
        <Group position="apart">
        <Group>
            <ActionIcon
              onClick={() => {
                navigate(-1);
              }}
            >
              <IconArrowLeft />
            </ActionIcon>
            <Group spacing={4}>
              <Text weight={600} size="xl" color="dark.3">
                Order #
              </Text>
              <Text weight={400} size="sm" color="blueGray.4">
                {order && order._id}
              </Text>
            </Group>
          </Group>
          <Group>{order && <LabelFragment listType={listType(order)} />}</Group>
        </Group>
        <Stack mt="xl">
          <Box>
            <Box mb="xl">
              <Text weight={600} color="blueGray.6">
                Order List
              </Text>
              <Divider
                size="sm"
                sx={(theme) => ({
                  width: "100px",
                  marginTop: "16px",
                })}
              />
            </Box>
            <Stack>
              {order && (
                <Stack mt="lg" spacing={4}>
                  {order.Shop.Orders.map((v) => {
                    return (
                      <ShopOrderItem
                        item={v}
                        key={v.variationId ? v.variationId : v._id}
                      />
                    );
                  })}
                </Stack>
              )}
              <Divider />
              <Group position="right">
                <Group spacing="xs">
                  <Text color="dark.4" weight={600}>
                    Total:
                  </Text>
                  <Group position="right" align="flex-start" w={100}>
                    <Text color="yellow.7" weight={600}>
                      {order &&
                        `₱${order.Shop.Orders.reduce(
                          (a, b) => a + b.unitPrice * b.qty,
                          0
                        ).toLocaleString()}`}
                    </Text>
                  </Group>
                </Group>
              </Group>
            </Stack>
          </Box>
          <Box>
            <Box mb="xl">
              <Text weight={600} color="blueGray.6">
                Order Status
              </Text>
              <Divider
                size="sm"
                sx={(theme) => ({
                  width: "100px",
                  marginTop: "16px",
                })}
              />
            </Box>
            <Box>
              <Grid>
                <Grid.Col span={12} md={4}>
                  {order && <OrderTimeline order={order} />}
                </Grid.Col>
                <Grid.Col span={12} md={8}>
                  <Stack
                    sx={(theme) => ({
                      paddingLeft: "0px",
                      marginTop: "16px",
                      [theme.fn.largerThan("md")]: {
                        borderLeft: "1px solid #ebebeb",
                        paddingLeft: "16px",
                        marginTop: 0,
                      },
                    })}
                  >
                    <Text weight={600} color="blueGray.6">
                      Delivery Address
                    </Text>
                    {order && (
                      <Stack spacing={2}>
                        <Text size="sm" weight={600} color="blueGray.5">
                          {order.User.Addresses.shipTo.name}
                        </Text>
                        <Text
                          size="sm"
                          color="blueGray.4"
                        >{`(${order.User.Addresses.shipTo.phoneNumber.countryCode}) ${order.User.Addresses.shipTo.phoneNumber.number}`}</Text>

                        <Text size="sm" color="blueGray.4">
                          {`${order.User.Addresses.shipTo.addressLine1}, ${order.User.Addresses.shipTo.barangay}, ${order.User.Addresses.shipTo.city}, ${order.User.Addresses.shipTo.province}`}
                        </Text>
                        <Text size="sm" color="blueGray.4">
                          {`${order.User.Addresses.shipTo.region}, ${order.User.Addresses.shipTo.zipCode}, ${order.User.Addresses.shipTo.country}`}
                        </Text>
                      </Stack>
                    )}
                  </Stack>
                </Grid.Col>
              </Grid>
            </Box>
          </Box>

          {order && <OrderAction order={order} setOrder={setOrder} />}
        </Stack>
      </Box>
    </Paper>
  );
}

const DateTime = ({ time }) => {
  return (
    <>
      {time && (
        <Text size="xs" mt={4} color="blueGray.5">
          {moment(time).format("MM/DD/YYYY, hh:mm")}
        </Text>
      )}
    </>
  );
};

const OrderTimeline = ({ order }) => {
  const statusLog = order.statusLog;
  return (
    <>
      {order.isCancelled ? (
        order.statusLog.length === 2 ? (
          <Timeline
            active={statusLog.length - 1}
            bulletSize={30}
            lineWidth={2}
            color="red.6"
          >
            <Timeline.Item
              bullet={<IconList size={18} />}
              title={
                <Text weight={600} color="blueGray.6">
                  Order Placed
                </Text>
              }
            >
              <DateTime time={statusLog.find((v) => v.code === 1)?.timestamp} />
            </Timeline.Item>
            <Timeline.Item
              bullet={<IconX size={18} />}
              title={
                <Text weight={600} color="blueGray.6">
                  {
                    statusLog.find((v) => v.code === 21 || v.code === 22)
                      ?.status
                  }
                </Text>
              }
            >
              <DateTime
                time={
                  statusLog.find((v) => v.code === 21 || v.code === 22)
                    ?.timestamp
                }
              />
            </Timeline.Item>
          </Timeline>
        ) : (
          <Timeline
            active={statusLog.length - 1}
            bulletSize={30}
            lineWidth={2}
            color="red.6"
          >
            <Timeline.Item
              bullet={<IconList size={18} />}
              title={
                <Text weight={600} color="blueGray.6">
                  Order Placed
                </Text>
              }
            >
              <DateTime time={statusLog.find((v) => v.code === 1)?.timestamp} />
            </Timeline.Item>
            <Timeline.Item
              bullet={<IconHandGrab size={18} />}
              title={
                <Text weight={600} color="blueGray.6">
                  Order is being prepared
                </Text>
              }
            >
              <DateTime time={statusLog.find((v) => v.code === 2)?.timestamp} />
            </Timeline.Item>
            <Timeline.Item
              bullet={<IconX size={18} />}
              title={
                <Text weight={600} color="blueGray.6">
                  {
                    statusLog.find((v) => v.code === 21 || v.code === 22)
                      ?.status
                  }
                </Text>
              }
            >
              <DateTime
                time={
                  statusLog.find((v) => v.code === 21 || v.code === 22)
                    ?.timestamp
                }
              />
            </Timeline.Item>
          </Timeline>
        )
      ) : (
        <>
          <Timeline
            active={statusLog.length - 1}
            bulletSize={30}
            lineWidth={2}
            color="green.6"
          >
            <Timeline.Item
              bullet={<IconList size={18} />}
              title={
                <Text weight={600} color="blueGray.6">
                  Order Placed
                </Text>
              }
            >
              <DateTime time={statusLog.find((v) => v.code === 1)?.timestamp} />
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconHandGrab size={18} />}
              title={
                <Text weight={600} color="blueGray.6">
                  Order is being prepared
                </Text>
              }
            >
              <DateTime time={statusLog.find((v) => v.code === 2)?.timestamp} />
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconTruckDelivery size={18} />}
              title={
                <Text weight={600} color="blueGray.6">
                  Order is shipped
                </Text>
              }
            >
              <DateTime time={statusLog.find((v) => v.code === 3)?.timestamp} />
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconDownload size={18} />}
              title={
                <Text weight={600} color="blueGray.6">
                  Order received
                </Text>
              }
            >
              <DateTime time={statusLog.find((v) => v.code === 4)?.timestamp} />
            </Timeline.Item>
          </Timeline>
        </>
      )}
    </>
  );
};

export default View;
