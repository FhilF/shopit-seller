import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Grid,
  Image,
  Paper,
  Stack,
  Divider,
  UnstyledButton,
} from "@mantine/core";

import { useForm, zodResolver } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import SignInImageLow from "assets/images/sign-in-image-low.png";
import axios from "axios";
import {
  showNotification,
  updateNotification,
  cleanNotifications,
} from "@mantine/notifications";
import { userSessionStorageName } from "config";
import { useAuth } from "utils/authProvider";
import { z } from "zod";
const schema = z.object({
  username: z.string().min(1, { message: "Enter a username" }),
  password: z.string().min(1, { message: "Enter a password" }),
});

function SignIn(props) {
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

  const signInAccount = async () => {
    cleanNotifications();
    signIn(form);
    // signout()
  };
  return (
    <Box>
      <Grid>
        <Grid.Col span={7}>
          <Box
            sx={(theme) => ({
              marginTop: "40px",
              display: "flex",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              ".mantine-Image-root": {
                width: "550px",
              },
            })}
          >
            {/* <Box h={500} w={500}> */}
            <Image src={SignInImageLow} />
            {/* </Box> */}
          </Box>
        </Grid.Col>
        <Grid.Col span={5}>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              marginTop: "30px",
              justifyContent: "flex-end",
            }}
          >
            <Paper shadow="lg" radius="xs" p="xl" sx={{ width: "400px" }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  signInAccount();
                }}
                autoComplete="off"
              >
                <Stack spacing={0}>
                  <Text color="dark.3" size={26} weight={600}>
                    Sign In
                  </Text>
                  <Text color="gray.6" size="sm">
                    Sign in to your account and stop shopping!
                  </Text>
                </Stack>
                <Stack
                  mt="xl"
                  spacing="xs"
                  sx={(theme) => ({
                    ".text-input": {
                      label: { color: theme.colors.dark[3] },
                    },
                  })}
                >
                  <TextInput
                    className="text-input"
                    label="Username"
                    withAsterisk
                    autoComplete="off"
                    disabled={isFormLoading}
                    {...form.getInputProps("username")}
                  />
                  <PasswordInput
                    className="text-input"
                    label="Password"
                    withAsterisk
                    autoComplete="new-password"
                    disabled={isFormLoading}
                    {...form.getInputProps("password")}
                  />
                </Stack>
                <Stack spacing="xl" mt={30}>
                  <Button type="submit" disabled={isFormLoading}>
                    Sign in
                  </Button>
                  <Divider sx={{ width: "80px", alignSelf: "center" }} />
                  <Group position="center" spacing={4}>
                    <Text color="gray.6" size="sm">
                      Dont have an account?
                    </Text>
                    <UnstyledButton component="a" href="/create-account">
                      <Text color="yellow.7" size="sm" weight={600}>
                        Register
                      </Text>
                    </UnstyledButton>
                  </Group>
                </Stack>
              </form>
            </Paper>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default SignIn;
