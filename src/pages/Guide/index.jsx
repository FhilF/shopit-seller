import { Accordion, Box, Divider, Flex, Stack, Text } from "@mantine/core";
import React from "react";
import BuyerAccount from "./Account-Buyer";
import SellerAccount from "./Account-Seller";
import CancelOrder from "./Buyer-CancelOrder";
import FillUpAddress from "./Buyer-FillUpAddress";
import OrderProduct from "./Buyer-OrderProduct";
import ViewOrder from "./Buyer-ViewOrderDetails";
import AddProduct from "./Seller-AddProduct";
import ApproveOrder from "./Seller-ApproveOrder";
import MarkOrdersAsShipped from "./Seller-MarkOrdersAsShipped";
import SetupAccount from "./Seller-SetupAccount";
import TesterSequence from "./TesterSequence";

function Guide() {
  return (
    <Box
      sx={{
        a: {
          color: "#e8590c",
        },
      }}
    >
      <Flex
        justify="center"
        mt="xl"
        sx={(theme) => ({
          flexDirection: "column-reverse",
          ".sequence-content": {
            width: "100%",
            marginBottom: "30px",
            marginLeft: "0px",
          },
          ".guide-content": {
            width: "100%",
          },
          [theme.fn.largerThan("md")]: {
            flexDirection: "row",
            ".sequence-content": {
              marginLeft:"16px",
              marginBottom: "0px",
              flex: 1,
            },
            ".guide-content": {
              width: theme.breakpoints.sm,
            },
          },
        })}
      >
        <Box className="guide-content">
          <Stack spacing={0}>
            <Text size={40} color="blueGray.7">
              Tester Guide
            </Text>
            <Text size="sm" color="blueGray.4">
              This page contains the step-by-step procedure for using the Yeti
              E-Commerce Site.
            </Text>
          </Stack>

          <Stack mt="xl">
            <Text color="yellow.8" weight={600}>
              Tester Accounts
            </Text>
            <Accordion>
              <BuyerAccount />
              <SellerAccount />
            </Accordion>
          </Stack>

          <Stack mt="xl">
            <Text color="yellow.8" weight={600}>
              Buyer Guide
            </Text>
            <Accordion>
              <FillUpAddress />
              <OrderProduct />
              <ViewOrder />
              <CancelOrder />
            </Accordion>
          </Stack>

          <Stack mt={40}>
            <Text color="yellow.8" weight={600}>
              Seller Guide
            </Text>
            <Accordion>
              <SetupAccount />
              <AddProduct />
              <ApproveOrder />
              <MarkOrdersAsShipped />
            </Accordion>
          </Stack>
        </Box>
        <Box className="sequence-content">
          <TesterSequence />
        </Box>
      </Flex>
    </Box>
  );
}

export default Guide;
