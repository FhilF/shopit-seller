import { Box } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import List from "../../../components/OrderList";
import _ from "lodash";
import EmptyOrder from "components/Empty/EmptyOrder";

function ToReceive(props) {
  return (
    <Box mt="lg">
      <EmptyOrder />
    </Box>
  );
}

export default ToReceive;
