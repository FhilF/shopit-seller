import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  List,
  NumberInput,
  Paper,
  Select,
  Stack,
  Stepper,
  Text,
  Textarea,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { cleanNotifications, showNotification } from "@mantine/notifications";
import { IconUpload } from "@tabler/icons";
import { ReactComponent as UploadUserImageIcon } from "assets/svg/Avatar.svg";
import axios from "axios";
import Information from "components/shop/Profile";
import { placeObj } from "lib";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "utils/authProvider";
import { z } from "zod";
import Address from "../../components/shop/Address";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const schema = z.object({
  name: z.string().min(2, { message: "Enter your Shop Name" }),
  description: z.string().optional(),
  phoneNumber: z
    .number({
      required_error: "Enter your phone number",
      invalid_type_error: "Enter your phone number",
    })
    .refine((data) => data.toString().length > 1, {
      message: "Enter your phone number",
    }),
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

function SetupShop() {
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

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      phoneNumber: null,
      region: "",
      province: "",
      city: "",
      barangay: "",
      zipCode: null,
      addressLine: "",
    },
    validate: zodResolver(schema),
  });

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
    <Box className="container">
      <Paper shadow="xs" p="xl">
        <Box>
          <Text weight={600} size={22} color="dark.4">
            Shop Information
          </Text>
          <Text size="sm" color="gray.6">
            Add your shop profile to display to users
          </Text>
        </Box>
        <Box mt="xl">
          <Box
            sx={(theme) => ({
              width: "100%",
              ".container-form .item-a": {
                alignSelf: "center",
              },
              [theme.fn.smallerThan("sm")]: {
                ".container-form .item-a": {
                  marginBottom: "-16px",
                },
              },
              [theme.fn.largerThan("md")]: {
                ".container-form .item-a": {
                  textAlign: "right",
                },
              },

              [theme.fn.largerThan("lg")]: {
                width: theme.breakpoints.sm,
              },
            })}
          >
            <form onSubmit={form.onSubmit((values) => save(values))}>
              <Information
                isAddress={isAddress}
                setIsAddress={setIsAddress}
                form={form}
                tempImgUrls={tempImgUrls}
                handleMediaInputChange={handleMediaInputChange}
              />
              <Address
                isAddress={isAddress}
                setIsAddress={setIsAddress}
                form={form}
              />
            </form>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default SetupShop;
