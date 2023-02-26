import { Button, Divider, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useState } from "react";
import { listType } from "utils/helper";
import ConfirmDialog from "../ConfirmDialog";

function OrderAction({ order, setOrder }) {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openShip, setOpenShip] = useState(false);
  const confirmCancel = () => {
    setIsFormLoading(true);
    axios
      .post(`api/shop/order/${order._id}/cancel`, {}, { withCredentials: true })
      .then((res) => {
        setOpenCancel(false);
        setOrder(res.data.Order);
        showNotification({
          title: "Success!",
          message: "Order successfully cancelled.",
          color: "teal",
        });
        setIsFormLoading(false);
      })
      .catch((err) => {
        setOpenCancel(false);
        showNotification({
          title: "Error!",
          message:
            "There was an error processing your request. Please try again later",
          color: "red",
        });
      });
  };

  const confirmAccept = () => {
    setIsFormLoading(true);
    axios
      .post(`api/shop/order/${order._id}/accept`, {}, { withCredentials: true })
      .then((res) => {
        setOpenConfirm(false);
        setOrder(res.data.Order);
        showNotification({
          title: "Success!",
          message: "Order successfully confirmed.",
          color: "teal",
        });
        setIsFormLoading(false);
      })
      .catch((err) => {
        setOpenConfirm(false);
        showNotification({
          title: "Error!",
          message:
            "There was an error processing your request. Please try again later",
          color: "red",
        });
      });
  };

  const confirmShip = () => {
    axios
      .post(
        `api/shop/order/${order._id}/shipped`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setOpenShip(false);
        setOrder(res.data.Order);
        showNotification({
          title: "Success!",
          message: "Order successfully change status to shipped.",
          color: "teal",
        });
      })
      .catch((err) => {
        setOpenShip(false);
        showNotification({
          title: "Error!",
          message:
            "There was an error processing your request. Please try again later",
          color: "red",
        });
      });
  };
  return (
    <>
      <Divider />
      {order.isCancelled || order.isDelivered ? (
        <></>
      ) : (
        <Group spacing={0} position="right">
          <Button
            size="xs"
            px="xs"
            color="dark.4"
            variant="subtle"
            disabled={isFormLoading}
            onClick={() => {
              // idRef.current = v1._id;
              setOpenCancel(true);
            }}
          >
            Cancel
          </Button>
          <Button
            size="xs"
            px="xs"
            color="yellow.6"
            disabled={isFormLoading}
            onClick={() => {
              if (listType(order) === 2) {
                return setOpenConfirm(true);
              }
              if (listType(order) === 3) {
                return setOpenShip(true);
              }
              // setOpenConfirm(true);
            }}
          >
            {listType(order) === 2 && "Confirm Order"}
            {listType(order) === 3 && "Order Shipped"}
          </Button>
        </Group>
      )}
      <ConfirmDialog
        dialogType={1}
        open={openCancel}
        setOpen={setOpenCancel}
        confirmAction={confirmCancel}
        isFormLoading={isFormLoading}
      />
      <ConfirmDialog
        dialogType={2}
        open={openConfirm}
        setOpen={setOpenConfirm}
        confirmAction={confirmAccept}
        isFormLoading={isFormLoading}
      />
      <ConfirmDialog
        dialogType={3}
        open={openShip}
        setOpen={setOpenShip}
        confirmAction={confirmShip}
        isFormLoading={isFormLoading}
      />
    </>
  );
}

export default OrderAction;
