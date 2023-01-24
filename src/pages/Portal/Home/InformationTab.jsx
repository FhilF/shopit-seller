import { Box, Button, Group, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import Private from "components/Shop/Private";
import Profile from "components/Shop/Profile";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileEditSchema, privateEditSchema } from "utils/Schema/ShopSchema";
import _ from "lodash";

function InformationTab(props) {
  const { sessionedUserShop, setSessionedUserShop, sessionedUserShopRef } =
    props;

  const navigate = useNavigate();
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
        <ProfileComponent
          sessionedUserShop={sessionedUserShop}
          setSessionedUserShop={setSessionedUserShop}
          sessionedUserShopRef={sessionedUserShopRef}
          navigate={navigate}
        />
        <PrivateComponent
          sessionedUserShop={sessionedUserShop}
          setSessionedUserShop={setSessionedUserShop}
          sessionedUserShopRef={sessionedUserShopRef}
          navigate={navigate}
        />
        {/* <form onSubmit={personalForm.onSubmit((values) => console.log(values))}>
          <Stack>
            <Info form={personalForm} />
            <Group position="right">
              <Button color="yellow.6" type="submit">
                Save
              </Button>
            </Group>
          </Stack>
        </form> */}
      </Stack>
    </Box>
  );
}

const PrivateComponent = (props) => {
  const {
    sessionedUserShopRef,
    sessionedUserShop,
    setSessionedUserShop,
    navigate,
  } = props;

  const [isFormLoading, setIsFormLoading] = useState(false);
  const [reset, setReset] = useState(false);

  const form = useForm({
    initialValues: {
      phoneNumber: sessionedUserShop.phoneNumber,
      shopRepresentative: sessionedUserShop.shopRepresentative,
    },
    validate: zodResolver(privateEditSchema),
  });

  const cancel = () => {
    form.setValues({
      shopRepresentative: sessionedUserShopRef.current.shopRepresentative,
      phoneNumber: sessionedUserShop.phoneNumber,
    });
  };

  const save = () => {
    if (isFormLoading) return true;
    setIsFormLoading(true);
    const formValues = Object.assign({}, { ...form.values });
    let newFormValues = {
      shopRepresentative: formValues.shopRepresentative,
      phoneNumber: formValues.phoneNumber,
    };

    const diff = _.reduce(
      newFormValues,
      function (result, value, key) {
        return _.isEqual(value, sessionedUserShopRef.current[key])
          ? result
          : result.concat(key);
      },
      []
    );

    let payload = {};

    diff.forEach((v) => {
      payload[v] = newFormValues[v];
    });

    setIsFormLoading(false);

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
          shopRepresentative: shop.shopRepresentative,
          phoneNumber: shop.phoneNumber,
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
      form.values.shopRepresentative !==
        sessionedUserShopRef.current.shopRepresentative ||
      form.values.phoneNumber !== sessionedUserShopRef.current.phoneNumber
    ) {
      setReset(true);
    } else {
      setReset(false);
    }
  }, [form.values]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <Stack>
        <Private form={form} isFormLoading={isFormLoading} />
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
  );
};

const ProfileComponent = (props) => {
  const {
    sessionedUserShopRef,
    sessionedUserShop,
    setSessionedUserShop,
    navigate,
  } = props;

  const [isFormLoading, setIsFormLoading] = useState(false);
  const [tempImgUrl, setTempImgUrl] = useState(
    sessionedUserShop.imageUrl ? sessionedUserShop.imageUrl : null
  );
  const [reset, setReset] = useState(false);

  const form = useForm({
    initialValues: {
      name: sessionedUserShop.name,
      description: sessionedUserShop.description,
      image: [],
    },
    validate: zodResolver(profileEditSchema),
  });

  const cancel = () => {
    if (!reset) {
      return true;
    }
    form.setValues({
      name: sessionedUserShopRef.current.name,
      description: sessionedUserShopRef.current.description,
      image: [],
    });
    setTempImgUrl(
      sessionedUserShopRef.current.imageUrl
        ? sessionedUserShopRef.current.imageUrl
        : null
    );
  };

  const save = () => {
    if (isFormLoading) return true;
    setIsFormLoading(true);
    const formValues = Object.assign({}, { ...form.values });
    let newFormValues = {
      name: formValues.name,
      description: formValues.description,
    };

    const diff = _.reduce(
      newFormValues,
      function (result, value, key) {
        return _.isEqual(value, sessionedUserShopRef.current[key])
          ? result
          : result.concat(key);
      },
      []
    );

    let payload = {};

    diff.forEach((v) => {
      payload[v] = newFormValues[v];
    });

    const formData = new FormData();

    formData.append("payload", JSON.stringify(payload));
    if (formValues.image.length > 0)
      formData.append("shopImage", formValues.image[0].file);

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
          name: shop.name,
          description: shop.description,
          imageUrl: shop.imageUrl,
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
      form.values.name !== sessionedUserShopRef.current.name ||
      form.values.description !== sessionedUserShopRef.current.description ||
      form.values.image.length > 0
    ) {
      setReset(true);
    } else {
      setReset(false);
    }
  }, [form.values]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <Stack>
        <Profile
          form={form}
          pTempImgUrl={tempImgUrl}
          setPTempImgUrl={setTempImgUrl}
          isFormLoading={isFormLoading}
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
  );
};

export default InformationTab;
