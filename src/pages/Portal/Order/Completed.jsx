import { Box } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import List from "../../../components/OrderList";
import _ from "lodash";
import EmptyOrder from "components/Empty/EmptyOrder";

function Completed(props) {
  const { completedList, setCompletedList, navigate} =
    props;
  const [openCancel, setOpenCancel] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const idRef = useRef();


  return (
    <>
      <Box mt="lg">
        {completedList.length > 0 ? (
          <List
            list={completedList}
            setOpenCancel={setOpenCancel}
            setOpenConfirm={setOpenConfirm}
            idRef={idRef}
            navigate={navigate}
          />
        ) : (
          <EmptyOrder />
        )}
      </Box>
      {/* <ConfirmDialog
        dialogType={1}
        open={openCancel}
        setOpen={setOpenCancel}
        confirmAction={confirmCancel}
      />
      <ConfirmDialog
        dialogType={2}
        open={openConfirm}
        setOpen={setOpenConfirm}
        confirmAction={confirmAccept}
      /> */}
    </>
  );
}

export default Completed;
