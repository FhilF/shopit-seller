import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  UnstyledButton,
} from "@mantine/core";
import axios from "axios";
import CustomImage from "components/CustomImage";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useContentMessage } from "utils/contentMessageProvider";
import Cancelled from "./Cancelled";
import Completed from "./Completed";
import ConfirmDialog from "./ConfirmDialog";
import Pending from "./Pending";
import ToShip from "./ToShip";

function fetchData(URL) {
  return axios
    .get(URL, {
      withCredentials: true,
    })
    .then(function (response) {
      return {
        success: true,
        data: response.data,
      };
    })
    .catch(function (error) {
      return { success: false };
    });
}

let URLs = [
  "/api/shop/order?order_type=1",
  "/api/shop/order?order_type=2",
  "/api/shop/order?order_type=3",
  "/api/shop/order?order_type=4",
  "/api/shop/order?order_type=5",
];

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setErrorType } = useContentMessage();
  const [search, setSearch] = useSearchParams();
  const [pendingList, setPendingList] = useState([]);
  const [toShipList, setToShipList] = useState([]);
  const [toReceivedList, setToReceivedList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [cancelledList, setCancelledList] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(true);
    Promise.all(URLs.map(fetchData))
      .then((res) => {
        const falseRes = res.filter((v) => !v.success);
        if (falseRes.length > 0) {
          setErrorType("Err500");
          return true;
        }
        console.log(res[3]);
        setCancelledList(res[0].data.Orders);
        setPendingList(res[1].data.Orders);
        setToShipList(res[2].data.Orders);
        setToReceivedList(res[3].data.Orders);
        setCompletedList(res[4].data.Orders);
        setIsPageLoading(false);
      })
      .catch((err) => {
        setIsPageLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <>
      <Box className="content" py="xl">
        <Tabs
          radius="xs"
          defaultValue={search.get("type") ? search.get("type") : "pending"}
        >
          <Tabs.List>
            <Tabs.Tab
              value="pending"
              icon={null}
              onClick={() => {
                setSearch({ type: "pending" });
              }}
            >
              <Text weight={600} size="sm" color="blueGray.6">
                Pending
              </Text>
            </Tabs.Tab>
            <Tabs.Tab
              value="ship"
              icon={null}
              onClick={() => {
                setSearch({ type: "ship" });
              }}
            >
              <Text weight={600} size="sm" color="blueGray.6">
                To Ship
              </Text>
            </Tabs.Tab>
            <Tabs.Tab
              value="receive"
              icon={null}
              onClick={() => {
                setSearch({ type: "receive" });
              }}
            >
              <Text weight={600} size="sm" color="blueGray.6">
                To Receive
              </Text>
            </Tabs.Tab>
            <Tabs.Tab
              value="completed"
              icon={null}
              onClick={() => {
                setSearch({ type: "completed" });
              }}
            >
              <Text weight={600} size="sm" color="blueGray.6">
                Completed
              </Text>
            </Tabs.Tab>
            <Tabs.Tab
              value="cancelled"
              icon={null}
              onClick={() => {
                setSearch({ type: "cancelled" });
              }}
            >
              <Text weight={600} size="sm" color="blueGray.6">
                Cancelled
              </Text>
            </Tabs.Tab>
          </Tabs.List>

          {!isPageLoading && (
            <>
              <Tabs.Panel value="pending" pt="xs">
                <Pending
                  pendingList={pendingList}
                  setPendingList={setPendingList}
                  setToShipList={setToShipList}
                  setCancelledList={setCancelledList}
                  navigate={navigate}
                />
              </Tabs.Panel>

              <Tabs.Panel value="ship" pt="xs">
                <ToShip
                  toShipList={toShipList}
                  setToShipList={setToShipList}
                  setCancelledList={setCancelledList}
                  setCompletedList={setCompletedList}
                  navigate={navigate}
                />
              </Tabs.Panel>

              <Tabs.Panel value="receive" pt="xs">
                Settings tab content
              </Tabs.Panel>

              <Tabs.Panel value="completed" pt="xs">
                <Completed
                  completedList={completedList}
                  setCompletedList={setCompletedList}
                  navigate={navigate}
                />
              </Tabs.Panel>

              <Tabs.Panel value="cancelled" pt="xs">
                <Cancelled
                  cancelledList={cancelledList}
                  setCancelledList={setCancelledList}
                  navigate={navigate}
                />
              </Tabs.Panel>
            </>
          )}
        </Tabs>
      </Box>
    </>
  );
}

export default Order;
