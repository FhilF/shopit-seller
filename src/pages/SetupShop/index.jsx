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
import { placeObj } from "lib";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "utils/authProvider";
import { z } from "zod";
import Address from "components/Shop/Address";
import Profile from "components/Shop/Profile";
import Private from "components/Shop/Private";
import { setUpSchema } from "utils/Schema/ShopSchema";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function SetupShop(props) {
  const { setSessionedUserShop } = props;
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

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      phoneNumber: { number: null, countryCode: 63 },
      shopRepresentative: "",
      image: [],
      region: "",
      province: "",
      city: "",
      barangay: "",
      zipCode: null,
      addressLine1: "",
    },
    validate: zodResolver(setUpSchema),
  });

  const save = () => {
    if (isFormLoading) {
      return true;
    }
    cleanNotifications();
    setIsFormLoading(true);
    if (form.validate().hasErrors) {
      showNotification({
        title: "Error submitting form",
        message: "Please finish the required inputs before submitting",
        color: "red",
      });
      setIsFormLoading(false);
      return true;
    }
    const formValues = Object.assign({}, { ...form.values });
    // data.address.country = "Philippines";

    const payload = {
      name: formValues.name,
      description: formValues.description,
      shopRepresentative: formValues.shopRepresentative,
      phoneNumber: formValues.phoneNumber,
      address: {
        region: formValues.region,
        province: formValues.province,
        city: formValues.city,
        barangay: formValues.barangay,
        zipCode: formValues.zipCode.toString(),
        addressLine1: formValues.addressLine1,
      },
    };

    setIsFormLoading(false);

    const formData = new FormData();

    formData.append("payload", JSON.stringify(payload));
    if (formValues.image.length > 0)
      formData.append("shopImage", formValues.image[0].file);

    axios
      .post("api/shop", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        updateSessionedUser({ shop: res.data.Shop._id });
        setSessionedUserShop(res.data.Shop);
        showNotification({
          title: "Updated Shop Info!",
          message: "Yoou have successfully updated your Shop Info.",
          color: "teal",
        });

        setIsFormLoading(false);
        navigate("/portal");
      })
      .catch((err) => {
        if (err.response?.status === 400)
          showNotification({
            title: "Sorry we can't process your request!",
            message: "There is an error from your form.",
            color: "red",
          });

        setIsFormLoading(false);
      });
    // console.log(formData);
  };

  return (
    <Box>
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                save();
              }}
            >
              <Stack spacing="xl">
                <Profile
                  form={form}
                  tempImgUrls={tempImgUrls}
                  handleMediaInputChange={handleMediaInputChange}
                  isFormLoading={isFormLoading}
                />
                <Private form={form} isFormLoading={isFormLoading} />
                <Address form={form} isFormLoading={isFormLoading} />
              </Stack>
              <Group mt="xl" position="right">
                <Button color="yellow.6" type="submit" disabled={isFormLoading}>
                  Save
                </Button>
              </Group>
            </form>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default SetupShop;
