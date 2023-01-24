import { Box, Button, Group, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addressEditSchema } from "utils/Schema/ShopSchema";
import _ from "lodash";
import Address from "components/Shop/Address";
import { getAddressValue } from "lib/address";

function AddressTab(props) {
  const { sessionedUserShop, setSessionedUserShop, sessionedUserShopRef } =
    props;

  const updateFieldsRef = useRef(false);

  const addressData = {
    region: getAddressValue(
      sessionedUserShopRef.current.address.region,
      "region",
      "label",
      "id"
    ),
    province: getAddressValue(
      sessionedUserShopRef.current.address.province,
      "province",
      "label",
      "id"
    ),
    city: getAddressValue(
      sessionedUserShopRef.current.address.city,
      "city",
      "label",
      "id"
    ),
    barangay: getAddressValue(
      sessionedUserShopRef.current.address.barangay,
      "barangay",
      "label",
      "id",
      sessionedUserShopRef.current.address.city
    ),
    zipCode: parseInt(sessionedUserShopRef.current.address.zipCode),
    addressLine1: sessionedUserShopRef.current.address.addressLine1,
  };

  const addressRef = useRef(addressData);

  const [isFormLoading, setIsFormLoading] = useState(false);
  const [reset, setReset] = useState(false);

  const cancel = () => {
    if (!reset) {
      return true;
    }
    updateFieldsRef.current = false;
    form.setValues({
      region: addressRef.current.region,
      province: addressRef.current.province,
      city: addressRef.current.city,
      barangay: addressRef.current.barangay,
      zipCode: addressRef.current.zipCode,
      addressLine1: addressRef.current.addressLine1,
    });
  };

  const form = useForm({
    initialValues: addressData,
    validate: zodResolver(addressEditSchema),
  });
  const save = () => {
    const address = { ...form.values, zipCode: form.values.zipCode.toString() };

    const payload = { address };
    const formData = new FormData();

    formData.append("payload", JSON.stringify(payload));

    axios
      .patch("api/shop", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const shop = res.data.Shop;
        setSessionedUserShop(shop);
        sessionedUserShopRef.current = {
          ...sessionedUserShopRef.current,
          address: {
            ...shop.address,
          },
        };

        addressRef.current = {
          region: getAddressValue(shop.address.region, "region", "label", "id"),
          province: getAddressValue(
            shop.address.province,
            "province",
            "label",
            "id"
          ),
          city: getAddressValue(shop.address.city, "city", "label", "id"),
          barangay: getAddressValue(
            shop.address.barangay,
            "barangay",
            "label",
            "id",
            shop.address.city
          ),
          zipCode: parseInt(shop.address.zipCode),
          addressLine1: shop.address.addressLine1,
        };
        setReset(false);

        showNotification({
          title: "Updated Shop Info!",
          message: "Yoou have successfully updated your Shop Info.",
          color: "teal",
        });

        setIsFormLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 400)
          showNotification({
            title: "Sorry we can't process your request!",
            message: "There is an error from your form.",
            color: "red",
          });

        setIsFormLoading(false);
      });
  };

  useEffect(() => {
    if (
      form.values.region !== addressRef.current.region ||
      form.values.province !== addressRef.current.province ||
      form.values.city !== addressRef.current.city ||
      form.values.barangay !== addressRef.current.barangay ||
      form.values.zipCode !== addressRef.current.zipCode ||
      form.values.addressLine1 !== addressRef.current.addressLine1
    ) {
      setReset(true);
    } else {
      setReset(false);
    }
  }, [form.values]);
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <Stack>
            <Address
              form={form}
              sessionedUserShopRef={sessionedUserShopRef}
              updateFieldsRef={updateFieldsRef}
            />
            <Group spacing={2} position="right">
              <Button
                variant="subtle"
                color="gray.7"
                disabled={!reset || isFormLoading}
                onClick={() => cancel()}
              >
                Cancel
              </Button>
              <Button
                color="yellow.6"
                type="submit"
                disabled={!reset || isFormLoading}
              >
                Save
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}

export default AddressTab;
