import { Box } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import List from "../../../components/OrderList";
import _ from "lodash";
import EmptyOrder from "components/Empty/EmptyOrder";

function Cancelled(props) {
  const { cancelledList, setCancelledList, navigate } = props;
  const [openCancel, setOpenCancel] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const idRef = useRef();

  return (
    <>
      <Box mt="lg">
        {cancelledList.length > 0 ? (
          <List
            list={cancelledList}
            setOpenCancel={setOpenCancel}
            setOpenConfirm={setOpenConfirm}
            idRef={idRef}
            navigate={navigate}
          />
        ) : (
          <EmptyOrder />
        )}
      </Box>
    </>
  );
}

export default Cancelled;
