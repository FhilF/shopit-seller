import { Box, Button, Divider, Group, Modal, Stack, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { useState } from "react";

function Fragment({ dialogType }) {
  switch (dialogType) {
    case 1:
      return "Are you sure you want to cancel the order?";
    case 2:
      return "Are you sure you want to accept the order?";
    case 3:
      return "Are you sure you want change the order status to shipped?";

    default:
      return "";
  }
}

function ConfirmDialog(props) {
  const { open, setOpen, dialogType, confirmAction, isFormLoading } = props;

  const close = () => {
    setOpen(false);
  };

  return (
    <Modal
      opened={open}
      centered
      onClose={() => close()}
      title={
        <Text weight={600} color="blueGray.6">
          Confirm Action
        </Text>
      }
    >
      <Stack>
        <Box pb="xl">
          <Text color="dark.4">
            <Fragment dialogType={dialogType} />
          </Text>
        </Box>
        <Divider />
        <Group spacing={0} position="right">
          <Button
            size="xs"
            px="xs"
            color="dark.4"
            variant="subtle"
            disabled={isFormLoading}
            onClick={() => {
              close();
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
              confirmAction();
            }}
          >
            Confirm
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export default ConfirmDialog;
