import { Box, Button, Group, Paper, Stack, Tabs, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { cleanNotifications, showNotification } from "@mantine/notifications";
import axios from "axios";
import Address from "components/Shop/Address";
import Info from "components/Shop/Private";
import Profile from "components/Shop/Profile";
import { placeObj } from "lib";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "utils/authProvider";
import { z } from "zod";
import { useRef } from "react";
import { profileEditSchema } from "utils/Schema/ShopSchema";
import InformationTab from "./InformationTab";
import AddressTab from "./AddressTab";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function Home(props) {
  const { sessionedUserShop, setSessionedUserShop } = props;
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const sessionedUserShopRef = useRef(sessionedUserShop);

  const { updateSessionedUser } = useAuth();
  return (
    <Paper className="content">
      <Box py="xl">
        <Tabs
          defaultValue={
            searchParams.get("tab") ? searchParams.get("tab") : "information"
          }
        >
          <Tabs.List>
            <Tabs.Tab
              value="information"
              onClick={() => {
                setSearchParams({ tab: "information" });
              }}
            >
              <Text size="sm" weight={600}>
                Information
              </Text>
            </Tabs.Tab>
            <Tabs.Tab
              value="address"
              onClick={() => {
                setSearchParams({ tab: "address" });
              }}
            >
              <Text size="sm" weight={600}>
                Address
              </Text>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="information">
            <InformationTab
              sessionedUserShopRef={sessionedUserShopRef}
              setSessionedUserShop={setSessionedUserShop}
              sessionedUserShop={sessionedUserShop}
            />
          </Tabs.Panel>

          <Tabs.Panel value="address">
            <AddressTab
              sessionedUserShopRef={sessionedUserShopRef}
              setSessionedUserShop={setSessionedUserShop}
              sessionedUserShop={sessionedUserShop}
            />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Paper>
  );
}

export default Home;
