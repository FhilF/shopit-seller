import {
  Accordion,
  ActionIcon,
  Avatar,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  Indicator,
  Menu,
  Paper,
  Stack,
  Text,
  Transition,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAddressBook,
  IconArrowLeft,
  IconBuildingStore,
  IconChevronRight,
  IconDoorEnter,
  IconDoorExit,
  IconHome,
  IconList,
  IconPackage,
  IconReceipt,
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
  const [openNav, setOpenNav] = useState(false);
  const { classes } = useStyles();

  return (
    <Box className={classes.header}>
      <Box className="child responsive">
        <Box sx={() => ({ width: "100%", height: "100%" })}>
          <Group position="apart" className="inner-nav" sx={() => ({})}>
            <Group>
              <Burger
                opened={openNav}
                onClick={() => setOpenNav((val) => !val)}
                className="burger"
                size="sm"
                color="white"
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
            </Group>
          </Group>
        </Box>
      </Box>
      <BurgerDrawer
        classes={classes}
        setOpenNav={setOpenNav}
        openNav={openNav}
        navigate={navigate}
        sessionedUserData={sessionedUserData}
        signout={signout}
      />
    </Box>
  );
}

const BurgerDrawer = (props) => {
  const { classes, openNav, setOpenNav, sessionedUserData, navigate, signout } =
    props;
  return (
    <Drawer
      lockScroll={true}
      className={classes.drawer}
      opened={openNav}
      onClose={() => setOpenNav((val) => !val)}
      title=""
      size="lg"
      withCloseButton={false}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: 0 }} pb={10} className="drawer-header">
          <Group pt={20} pb={30} position="apart">
            <UnstyledButton component="a" href="/">
              <img
                className="logo"
                src={process.env.PUBLIC_URL + "/shop-it-logo.png"}
                alt="shop-it-logo"
              />
            </UnstyledButton>

            <ActionIcon
              onClick={() => {
                setOpenNav(false);
              }}
            >
              <IconX />
            </ActionIcon>
          </Group>
        </Box>
        <Box sx={{ flex: 1 }} className="drawer-menu">
          <Stack spacing="lg">
            {sessionedUserData ? (
              <>
                <UnstyledButton
                  className="items"
                  component="a"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenNav(false);
                    navigate("/portal");
                  }}
                >
                  <Group spacing="sm">
                    <IconBuildingStore className="menu-item-icon" />
                    <Text weight={600} size={15} color="blueGray.8">
                      Shop
                    </Text>
                  </Group>
                </UnstyledButton>
                <UnstyledButton
                  className="items"
                  component="a"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenNav(false);
                    navigate("/portal/product");
                  }}
                >
                  <Group spacing="sm">
                    <IconReceipt className="menu-item-icon" />
                    <Text weight={600} size={15} color="blueGray.8">
                      Products
                    </Text>
                  </Group>
                </UnstyledButton>
                <UnstyledButton
                  className="items"
                  component="a"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenNav(false);
                    navigate("/portal/order");
                  }}
                >
                  <Group spacing="sm">
                    <IconPackage className="menu-item-icon" />
                    <Text weight={600} size={15} color="blueGray.8">
                      Orders
                    </Text>
                  </Group>
                </UnstyledButton>
              </>
            ) : (
              <UnstyledButton
                  className="items"
                  component="a"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenNav(false);
                    navigate("/portal/order");
                  }}
                >
                  <Group spacing="sm">
                    <IconPackage className="menu-item-icon" />
                    <Text weight={600} size={15} color="blueGray.8">
                      Orders
                    </Text>
                  </Group>
                </UnstyledButton>
            )}
          </Stack>
        </Box>
        <Box sx={{ flex: 0 }} pb="xl">
          <Divider mb="sm" />
          {sessionedUserData ? (
            <UnstyledButton
              sx={{
                width: "100%",
                paddingLeft: "16px",
                paddingRight: "16px",
                color: "#25262b",
                fontWeight: "600",
                WebkitTextDecoration: "none",
                textDecoration: "none",
                fontSize: "18px",
                height: "100%",
              }}
              onClick={() => {
                setOpenNav(false);
                signout();
                navigate("/");
              }}
            >
              <Group spacing="sm">
                <IconDoorExit size={18} className="menu-item-icon" />
                <Text weight={600} size={15} color="blueGray.8">
                  Sign Out
                </Text>
              </Group>
            </UnstyledButton>
          ) : (
            <UnstyledButton
              sx={{
                width: "100%",
                paddingLeft: "16px",
                paddingRight: "16px",
                color: "#25262b",
                fontWeight: "600",
                WebkitTextDecoration: "none",
                textDecoration: "none",
                fontSize: "18px",
                height: "100%",
              }}
              onClick={() => {
                setOpenNav(false);
                navigate("/sign-in");
              }}
            >
              <Group spacing="sm">
                <IconDoorEnter size={18} className="menu-item-icon" />
                <Text weight={600} size={15} color="blueGray.8">
                  Sign in
                </Text>
              </Group>
            </UnstyledButton>
          )}
        </Box>
      </Box>

      {/* Drawer content */}
    </Drawer>
  );
};

const ProfileHeader = ({ sessionedUserData, signout }) => {
  const [openNav, setOpenNav] = useState(false);
  return (
    <Menu
      width={260}
      position="bottom-end"
      transition="pop-top-right"
      opened={openNav}
      onChange={setOpenNav}
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
