import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.dark[6],
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "56px",
    ".child": {
      width: "100%",
      display: "flex",
      alignItems: "center",

      ".inner-nav": {
        width: "100%",
        height: "100%",
        // paddingTop: "8px",
        // paddingBottom: "8px",
        ".logo": {
          height: "40px",
        },
        ".burger": {
          [theme.fn.largerThan("md")]: {
            display: "none",
          },
        },
        ".menu-m": {
          height: "100%",
          [theme.fn.largerThan("md")]: {
            display: "none",
          },
          ".items": {
            color: theme.colors.gray[0],
            fontWeight: 500,
            textDecoration: "none",
            fontSize: "14px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            paddingLeft: "8px",
            paddingRight: "8px",
            ":hover": {
              background: theme.colors.dark[7],
            },
            // letterSpacing: ".5px",
          },
        },
        ".menu": {
          height: "100%",
          [theme.fn.smallerThan("md")]: {
            display: "none",
          },
          ".items": {
            color: theme.colors.gray[0],
            fontWeight: 500,
            textDecoration: "none",
            fontSize: "14px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            paddingLeft: "8px",
            paddingRight: "8px",
            ":hover": {
              background: theme.colors.dark[7],
            },
            // letterSpacing: ".5px",
          },
          ".user": {
            fontWeight: 500,
          },
        },
      },

      ".menu-dropdown": {
        position: "absolute",
        top: 60,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: "hidden",

        [theme.fn.largerThan("sm")]: {
          display: "none",
        },

        ".inner-dropdown": {
          display: "flex",
          flexDirection: "column",
          paddingBottom: "12px",

          ".items": {
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: "12px",
            paddingBottom: "12px",
          },
        },
      },
    },
  },
  drawer: {
    ".mantine-Drawer-drawer": {
      backgroundColor: theme.colors.gray[0],
      ".drawer-header": {
        backgroundColor: theme.colors.dark[6],
        paddingLeft: "16px",
        paddingRight: "16px",
        ".logo": {
          height: "40px",
          // [theme.fn.largerThan("sm")]: {
          //   height: "55px",
          // },
        },
      },
      ".sub-drawer-header": {
        backgroundColor: theme.colors.dark[6],
        paddingLeft: "16px",
        paddingRight: "16px",
      },
      ".drawer-menu": {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginTop: "16px",

        ".items": {
          paddingLeft: "16px",
          paddingRight: "16px",
          color: theme.colors.dark[6],
          fontWeight: 600,
          textDecoration: "none",
          fontSize: theme.fontSizes.lg,
          height: "100%",
          ".menu-item-icon": {
            color: theme.colors.blueGray[6],
          },
        },

        ".accordion-drawer": {
          ".mantine-Accordion-item": {
            borderBottom: 0,
          },
        },
      },
    },
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
  secondaryDrawer: {
    [theme.fn.largerThan("md")]: {
      display: "block",
    },
  },

  search: { marginLeft: "60px", width: "60%" },

  navButton: {
    padding: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    color: "white",
    "&:hover": {
      // backgroundColor: theme.colors.cyan[2],
      color: theme.colors.cyan[4],
    },
  },
  cartHeader: {
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
    cursor: "pointer",
    "&:hover": {
      svg: {
        stroke: theme.colors.cyan[4],
      },
    },
  },
}));

export default useStyles;
