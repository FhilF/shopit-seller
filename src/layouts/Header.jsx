import {
  Accordion,
  ActionIcon,
  Avatar,
  Box,
  Burger,
  Button,
  Drawer,
  Group,
  Indicator,
  Menu,
  Paper,
  Text,
  Transition,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAddressBook,
  IconArrowLeft,
  IconChevronRight,
  IconDoorExit,
  IconPackage,
  IconShoppingCart,
  IconUser,
  IconUserCircle,
  IconX,
} from "@tabler/icons";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";

import useStyles from "styles/js/layouts/global/header";
function Index(props) {
  const navigate = useNavigate();
  const { sessionedUserData, signout } = props;
  const [open, setOpen] = useState(false);
  const { classes } = useStyles();

  return (
    <Box className={classes.header}>
      <Box className="child responsive">
        <Box sx={() => ({ width: "100%", height: "100%" })}>
          <Group position="apart" className="inner-nav" sx={() => ({})}>
            <Group>
              <Burger
                opened={open}
                onClick={() => setOpen((val) => !val)}
                className="burger"
                size="sm"
              />
              <UnstyledButton onClick={() => navigate("/")}>
                <Group spacing={4}>
                  <img
                    className="logo"
                    src={process.env.PUBLIC_URL + "/shop-it-logo.png"}
                    alt="shop-it-logo"
                  />
                  <Text color="gray.1">-</Text>
                  <Text weight={600} mt={5} color="yellow.7">
                    Seller Portal
                  </Text>
                </Group>
              </UnstyledButton>
            </Group>
            <Group spacing={4} className="menu">
              <Box
                // ml="xl"
                sx={() => ({
                  display: "flex",
                  height: "100%",
                })}
              >
                {sessionedUserData ? (
                  <ProfileHeader
                    sessionedUserData={sessionedUserData}
                    signout={signout}
                  />
                ) : (
                  <a
                    href=" #"
                    className="items"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/sign-in");
                    }}
                  >
                    <Text weight={600} size="sm">
                      Sign in
                    </Text>
                  </a>
                )}
              </Box>
              {/* <Box ml="xs" sx={() => ({ height: "100%" })}>
                <a href=" #" className="items">
                  <Indicator label={0} size={16} sx={() => ({ fontSize: 0 })}>
                    <IconShoppingCart />
                  </Indicator>
                </a>
              </Box> */}
            </Group>
          </Group>
        </Box>
      </Box>
    </Box>
  );
}

const ProfileHeader = ({ sessionedUserData, signout }) => {
  const [open, setOpen] = useState(false);
  return (
    <Menu
      width={260}
      position="bottom-end"
      transition="pop-top-right"
      opened={open}
      onChange={setOpen}
    >
      <Menu.Target>
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            paddingLeft: "8px",
            paddingRight: "8px",
            [theme.fn.smallerThan("sm")]: {
              paddingLeft: "0px",
              paddingRight: "0px",
              paddingBottom: "12px",
              paddingTop: "12px",
            },
            [theme.fn.largerThan("sm")]: {
              ":hover": {
                background: theme.colors.dark[7],
              },
            },
          })}
        >
          <Avatar
            color="yellow.9"
            radius="xl"
            size={32}
            src={sessionedUserData.avatar}
          >
            {sessionedUserData.username.charAt(0).toUpperCase()}
          </Avatar>
          <Text ml={6} size="sm" weight={700} color="gray.0">
            {sessionedUserData.username}
          </Text>
        </Box>
      </Menu.Target>
      <Menu.Dropdown>
        {/* <Menu.Item
          component={Link}
          to="/user/account/profile"
          icon={<IconUserCircle size={16} stroke={1.5} />}
        >
          <Text weight={500} size="sm" color="dark.4">
            My Account
          </Text>
        </Menu.Item>
        <Menu.Item
          component={Link}
          to="/orders"
          icon={<IconPackage size={16} stroke={1.5} />}
        >
          <Text weight={500} size="sm" color="dark.4">
            Orders
          </Text>
        </Menu.Item>
        <Menu.Item
          component={Link}
          to="/addresses"
          icon={<IconAddressBook size={16} stroke={1.5} />}
        >
          <Text weight={500} size="sm" color="dark.4">
            Addresses
          </Text>
        </Menu.Item>

        <Menu.Divider /> */}

        {/* <Menu.Label>Danger zone</Menu.Label> */}
        <Menu.Item
          icon={<IconDoorExit size={14} stroke={1.5} />}
          onClick={() => {
            signout();
          }}
        >
          <Text weight={500} size="sm" color="dark.4">
            Sign Out
          </Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Index;
