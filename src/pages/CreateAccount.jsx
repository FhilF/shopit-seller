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
  Grid,
  Stack,
  Image,
} from "@mantine/core";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { IconAlertCircle, IconAsterisk, IconUser, IconX } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import Image1 from "assets/images/create-account.png";
import axios from "axios";
import {
  showNotification,
  updateNotification,
  cleanNotifications,
} from "@mantine/notifications";

const schema = z
  .object({
    name: z.string().min(2, { message: "Enter your name" }),
    username: z.string().min(8, { message: "Enter a username" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(1, { message: "Enter a password" }),
    cpassword: z.string().min(1, { message: "Enter a password" }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ["cpassword"], // path of error
  });
function CreateAccount() {
  const navigate = useNavigate();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      cpassword: "",
    },
    validate: zodResolver(schema),
  });

  const register = async (formData) => {
    if (isFormLoading) {
      return true;
    }
    cleanNotifications();
    setIsFormLoading(true);
    const { cpassword: _, ...newInfo } = formData;
    newInfo.roles = ["user"];
    axios
      .post("auth/register", newInfo)
      .then((res) => {
        showNotification({
          id: "success-register",
          title: "Success!",
          message: "Your account has been registered",
          color: "teal",
          autoClose: false,
          disallowClose: true,
        });
        
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err)
        setIsFormLoading(false);
        if (err.response.status === 400 && err.response.data.duplicateKey) {
          showNotification({
            title: "Sorry we can't process your request!",
            message: "There is an error from your form.",
            color: "red",
          });
          form.setFieldError(
            err.response.data.duplicateKey,
            `This ${err.response.data.duplicateKey} has already been taken. Try another`
          );
          return true;
        }
        showNotification({
          title: "Error!",
          message: "Sorry we can't process your request!",
          color: "red",
        });
      });
  };
  return (
    <Box
      className="page-content"
      sx={(theme) => ({
        background: theme.colors.blue[0],
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
            width: "55%",
          },
        })}
      >
        <Box
          sx={(theme) => ({
            width: "100%",
            paddingTop: "32px",
            paddingBottom: "32px",
            display: "block",
          })}
        >
          <Card shadow="md" p={0} radius="lg" withBorder>
            <Grid m={0}>
              <Grid.Col span={6} px={40} pt={40} pb={60}>
                <Title order={1} mb={60}>
                  Create Account
                </Title>
                <Box
                  sx={(theme) => ({
                    width: "100%",
                    [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
                      width: "70%",
                    },
                    [`@media (min-width: ${theme.breakpoints.xl}px)`]: {
                      width: "80%",
                    },
                  })}
                >
                  <form onSubmit={form.onSubmit((values) => register(values))}>
                    <Stack spacing="xl">
                      <TextInput
                        label="Name"
                        placeholder="John Doe"
                        disabled={isFormLoading}
                        {...form.getInputProps("name")}
                      />
                      <TextInput
                        label="Email"
                        placeholder="johndoe@gmail.com"
                        disabled={isFormLoading}
                        {...form.getInputProps("email")}
                      />
                      <TextInput
                        label="Username"
                        placeholder="yourusername"
                        disabled={isFormLoading}
                        {...form.getInputProps("username")}
                      />
                      <PasswordInput
                        label="Password"
                        placeholder="Password"
                        disabled={isFormLoading}
                        {...form.getInputProps("password")}
                      />
                      <PasswordInput
                        label="Confirm Passowrd"
                        placeholder="Password"
                        disabled={isFormLoading}
                        {...form.getInputProps("cpassword")}
                      />
                    </Stack>

                    <Group position="right" mt={40}>
                      <Button disabled={isFormLoading} type="submit">
                        Submit
                      </Button>
                      {/* <Button
                        disabled={isFormLoading}
                        onClick={() => {
                          register();
                        }}
                      >
                        test
                      </Button> */}
                    </Group>
                  </form>
                </Box>
              </Grid.Col>
              <Grid.Col span={6} p={0}>
                <Box
                  sx={() => ({
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                    background: "#effbfd",
                  })}
                >
                  <Image src={Image1} />
                </Box>
                {/* <Box sx={() => ({ backgroundImage: `url(${Image1})` })}></Box> */}
              </Grid.Col>
            </Grid>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateAccount;
