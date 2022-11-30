import React, { useState } from "react";
import {
  Card,
  Box,
  Text,
  Badge,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Title,
} from "@mantine/core";

import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { IconAsterisk, IconUser } from "@tabler/icons";
import { useNavigate, redirect } from "react-router-dom";

import axios from "axios";
import {
  showNotification,
  updateNotification,
  cleanNotifications,
} from "@mantine/notifications";

import { userSessionStorageName } from "config";
import { useAuth } from "utils/authProvider";

const schema = z.object({
  username: z.string().min(1, { message: "Enter a username" }),
  password: z.string().min(1, { message: "Enter a password" }),
});
function SignIn(props) {
  const { setSessionedUser } = props;
  const navigate = useNavigate();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const { signIn, signout } = useAuth();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const signInAccount = async (formData) => {
    cleanNotifications();
    signIn(formData, form, showNotification);
    // signout()
  };

  return (
    <Box
      className="page-content"
      sx={(theme) => ({
        // background: theme.colors.blue[0],
        minHeight: "87vh",
        display: "flex",
        justifyContent: "center",
      })}
    >
      <Box
        sx={(theme) => ({
          width: "100%",
          display: "flex",
          [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
            width: "75%",
          },
        })}
      >
        <Box
          sx={(theme) => ({
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <Box sx={(theme) => ({ display: "block" })}>
            <Box sx={(theme) => ({ width: "350px" })}>
              <Card shadow="md" p="xl" radius="lg" withBorder>
                <Group position="center" mb={36}>
                  <Title order={3}>Sign in</Title>
                </Group>
                <form
                  onSubmit={form.onSubmit((values) => signInAccount(values))}
                >
                  <TextInput
                    // required
                    // label="Email"
                    placeholder="Username"
                    icon={<IconUser />}
                    {...form.getInputProps("username")}
                  />
                  <PasswordInput
                    // required
                    placeholder="Password"
                    icon={<IconAsterisk />}
                    mt="md"
                    {...form.getInputProps("password")}
                  />
                  <Group position="apart" mt={40}>
                    <Button
                      ml={-8}
                      variant="subtle"
                      radius="xs"
                      compact
                      onClick={() => navigate("/create-account")}
                    >
                      Create account
                    </Button>
                    <Button type="submit">Submit</Button>
                  </Group>
                </form>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SignIn;
