import { Box, Button, Group, Stack, Tabs, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { cleanNotifications, showNotification } from "@mantine/notifications";
import axios from "axios";
import Address from "components/shop/Address";
import Info from "components/shop/Info";
import Profile from "components/shop/Profile";
import { placeObj } from "lib";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "utils/authProvider";
import { z } from "zod";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const addressSchema = z.object({
  region: z.string().min(1, { message: "Enter your region" }),
  province: z.string().min(1, { message: "Enter your province" }),
  city: z.string().min(1, { message: "Enter your city" }),
  barangay: z.string().min(1, { message: "Enter your barangay" }),
  zipCode: z
    .number({
      required_error: "Enter your postal code",
      invalid_type_error: "Enter your postal code",
    })
    .refine((val) => val.toString().length > 1, {
      message: "Invalid postal code",
    }),
  addressLine: z.string().min(1, { message: "Enter your address" }),
});

const personalSchema = z.object({
  phoneNumber: z
    .number({
      required_error: "Enter your phone number",
      invalid_type_error: "Enter your phone number",
    })
    .refine((data) => data.toString().length > 1, {
      message: "Enter your phone number",
    }),
});

const profileSchema = z.object({
  name: z.string().min(2, { message: "Enter your Shop Name" }),
  description: z.string().optional(),
});

function Home() {
  const [tempImgUrls, setTempImgUrls] = useState();
  const [file, setFile] = useState();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const navigate = useNavigate();

  const { updateSessionedUser } = useAuth();
  const handleMediaInputChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      return null;
    }

    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  useEffect(() => {
    let fileReader;
    let isCancel = false;

    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setTempImgUrls(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  // useEffect(() => {
  //   console.log(tempImgUrls);
  // }, [tempImgUrls]);

  const getDataValue = (data, type) => {
    console.log();
    if (!data) return "";
    const filtered = placeObj[type].json.filter(
      (v) => v[placeObj[type][!isNaN(data) ? "id" : "label"]] === data
    );
    if (filtered.length === 0) return "";
    return filtered[0][placeObj[type][isNaN(data) ? "id" : "label"]];
    // return filtered[0].value;
  };

  const save = (formData) => {
    if (isFormLoading) {
      return true;
    }
    cleanNotifications();
    const data = {
      name: formData.name,
      description: formData.description,
      phoneNumber: formData.phoneNumber.toString(),
      address: {
        country: "Philippines",
        region: getDataValue(formData.region, "region", true),
        state: getDataValue(formData.province, "province", true),
        city: getDataValue(formData.city, "city", true),
        zipCode: formData.zipCode.toString(),
        addressLine1: `${formData.addressLine}, ${getDataValue(
          formData.barangay,
          "barangay",
          true
        )}`,
      },
    };
    axios
      .post("api/shop", data, {
        withCredentials: true,
      })
      .then((res) => {
        updateSessionedUser({ shop: res.data.Shop._id });
        showNotification({
          title: "Updated Shop Info!",
          message: "Yoou have successfully updated your Shop Info.",
          color: "teal",
        });
        navigate("/portal");
      })
      .catch((err) => {
        if (err.response?.status === 400)
          showNotification({
            title: "Sorry we can't process your request!",
            message: "There is an error from your form.",
            color: "red",
          });
        console.log(err);
      });
    // console.log(formData);
  };
  return (
    <Box py="xl">
      <Tabs defaultValue="information">
        <Tabs.List>
          <Tabs.Tab value="information">
            <Text size="sm" weight={600}>
              Information
            </Text>
          </Tabs.Tab>
          <Tabs.Tab value="address">
            <Text size="sm" weight={600}>
              Address
            </Text>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="information">
          <InformationTab
            tempImgUrls={tempImgUrls}
            handleMediaInputChange={handleMediaInputChange}
          />
        </Tabs.Panel>

        <Tabs.Panel value="address">
          <AddressTab />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}

const InformationTab = (props) => {
  const { tempImgUrls, handleMediaInputChange } = props;
  const profileForm = useForm({
    initialValues: {
      name: "",
      description: "",
    },
    validate: zodResolver(profileSchema),
  });
  const personalForm = useForm({
    initialValues: {
      phoneNumber: null,
    },
    validate: zodResolver(personalSchema),
  });
  return (
    <Box
      mt="xl"
      sx={(theme) => ({
        width: "100%",
        ".input-container": {
          ".item-a": {
            alignSelf: "center",
          },
          [theme.fn.smallerThan("sm")]: {
            ".item-a": {
              marginBottom: "-16px",
            },
          },
          [theme.fn.largerThan("lg")]: {
            ".item-a": {
              textAlign: "right",
            },
            // width: theme.breakpoints.sm,
          },
          [theme.fn.largerThan("xl")]: {},
        },
      })}
    >
      <Stack spacing={40}>
        <form onSubmit={profileForm.onSubmit((values) => console.log(values))}>
          <Stack>
            <Profile
              form={profileForm}
              tempImgUrls={tempImgUrls}
              handleMediaInputChange={handleMediaInputChange}
            />
            <Group position="right">
              <Button color="yellow.6" type="submit">
                Save
              </Button>
            </Group>
          </Stack>
        </form>

        <form onSubmit={personalForm.onSubmit((values) => console.log(values))}>
          <Stack>
            <Info form={personalForm} />
            <Group position="right">
              <Button color="yellow.6" type="submit">
                Save
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

const AddressTab = () => {
  const addressForm = useForm({
    initialValues: {
      phoneNumber: null,
      region: "",
      province: "",
      city: "",
      barangay: "",
      zipCode: null,
      addressLine: "",
    },
    validate: zodResolver(addressSchema),
  });
  return (
    <Box
      mt="xl"
      sx={(theme) => ({
        width: "100%",
        ".input-container": {
          ".item-a": {
            alignSelf: "center",
          },
          [theme.fn.smallerThan("sm")]: {
            ".item-a": {
              marginBottom: "-16px",
            },
          },
          [theme.fn.largerThan("lg")]: {
            ".item-a": {
              textAlign: "right",
            },
            // width: theme.breakpoints.sm,
          },
          [theme.fn.largerThan("xl")]: {},
        },
      })}
    >
      <Stack spacing={40}>
        <form onSubmit={addressForm.onSubmit((values) => console.log(values))}>
          <Stack>
            <Address form={addressForm} />
            <Group position="right">
              <Button color="yellow.6" type="submit">
                Save
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default Home;
