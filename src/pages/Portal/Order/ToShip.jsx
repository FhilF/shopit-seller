import { Box } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import List from "../../../components/OrderList";
import _ from "lodash";
import EmptyOrder from "components/Empty/EmptyOrder";

function ToShip(props) {
  const { toShipList, setToShipList, setCancelledList, setCompletedList, navigate } =
    props;
  const [openCancel, setOpenCancel] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const idRef = useRef();

  const confirmCancel = () => {
    axios
      .post(
        `api/shop/order/${idRef.current}/cancel`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setCancelledList((prevElem) => [...prevElem, res.data.Order]);
        setToShipList((v) =>
          _.reject(v, function (el) {
            return el._id === idRef.current;
          })
        );
        setOpenCancel(false);
        showNotification({
          title: "Success!",
          message: "Order successfully cancelled.",
          color: "teal",
        });
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
    axios
      .post(
        `api/shop/order/${idRef.current}/shipped`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setToShipList((v) =>
          _.reject(v, function (el) {
            return el._id === idRef.current;
          })
        );
        setCompletedList((v) => [...v, res.data.Order]);
        setOpenConfirm(false);
        showNotification({
          title: "Success!",
          message: "Order successfully cancelled.",
          color: "teal",
        });
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

  //   const openCancelDialog = (id) => {
  //     id.current = id;
  //     setOpenCancel(true);
  //   };

  return (
    <>
      <Box mt="lg">
        {toShipList.length > 0 ? (
          <List
            list={toShipList}
            setOpenCancel={setOpenCancel}
            setOpenConfirm={setOpenConfirm}
            idRef={idRef}
            navigate={navigate}
          />
        ) : (
          <EmptyOrder />
        )}
      </Box>
      <ConfirmDialog
        dialogType={1}
        open={openCancel}
        setOpen={setOpenCancel}
        confirmAction={confirmCancel}
      />
      <ConfirmDialog
        dialogType={3}
        open={openConfirm}
        setOpen={setOpenConfirm}
        confirmAction={confirmAccept}
      />
    </>
  );
}

export default ToShip;
