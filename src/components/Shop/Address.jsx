import {
  Box,
  Button,
  Divider,
  Grid,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";

import regionJson from "lib/ph-addresses/short-region";
import provinceJson from "lib/ph-addresses/province";
import cityJson from "lib/ph-addresses/city";
import barangayJson from "lib/ph-addresses/barangay";
import { getAddressValue } from "lib/address";

function Address(props) {
  const { form, isSetup, isFormLoading, updateFieldsRef } = props;

  const localupdateRef = useRef(true);

  const updateRef =
    updateFieldsRef === undefined ? localupdateRef : updateFieldsRef;

  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  useEffect(() => {
    let regions = [];
    regionJson.forEach((val, i) => {
      regions.push({ value: val.id, label: val.name });
    });
    setRegions(regions);
  }, []);

  useEffect(() => {
    const fRegion = form.values.region;
    if (fRegion) {
      if (updateRef.current) {
        form.setFieldValue("province", "");
        form.setFieldValue("city", "");
        form.setFieldValue("barangay", "");
        setProvinces([]);
        setCities([]);
        setBarangays([]);
      }
      const regionInfo = regionJson.find((el) => el.id === fRegion);
      if (regionInfo) {
        const provinceInfo = provinceJson.filter((el) => {
          return regionInfo.provinces.find((element) => {
            return el.province_code === element;
          });
        });

        if (provinceInfo) {
          let filteredProvinces = [];
          provinceInfo.forEach((val, i) => {
            filteredProvinces.push({
              value: val.province_code,
              label: val.province_name,
            });
          });
          filteredProvinces.sort((a, b) => a.label.localeCompare(b.label));
          setProvinces(filteredProvinces);
        }
      }
    }
  }, [form.values.region]);

  useEffect(() => {
    const fProvince = form.values.province;
    if (fProvince) {
      if (updateRef.current) {
        form.setFieldValue("city", "");
        form.setFieldValue("barangay", "");
        setCities([]);
        setBarangays([]);
      }
      const cityInfo = cityJson.filter((el) => {
        return el.province_code === fProvince;
      });
      if (cityInfo) {
        let modifiedCity = [];
        cityInfo.forEach((val, i) => {
          modifiedCity.push({
            value: val.city_code,
            label: val.city_name,
          });
        });
        modifiedCity.sort((a, b) => a.label.localeCompare(b.label));
        setCities(modifiedCity);
      }
    }
  }, [form.values.province]);

  useEffect(() => {
    const fCity = form.values.city;
    if (fCity) {
      if (updateRef.current) {
        form.setFieldValue("barangay", "");
        setBarangays([]);
      }
      const barangayInfo = barangayJson.filter((el) => {
        return el.city_code === fCity;
      });
      if (barangayInfo) {
        let modifiedBarangays = [];
        barangayInfo.forEach((val, i) => {
          modifiedBarangays.push({
            value: val.brgy_code,
            label: val.brgy_name,
          });
        });
        modifiedBarangays.sort((a, b) => a.label.localeCompare(b.label));
        setBarangays(modifiedBarangays);
      }
    }
  }, [form.values.city]);

  useEffect(() => {
    // if (form.values.barangay) {
    //   barangays.forEach((v) => {
    //     if (v.value === form.values.barangay) {
    //       console.log(v.value);
    //     }
    //   });
    // }
  }, [form.values.barangay]);

  return (
    <Box className="container-form">
      <Box
        sx={(theme) => ({
          marginBottom: "30px",
          [theme.fn.largerThan("md")]: {
            marginLeft: isSetup && "40px",
          },
        })}
      >
        <Divider
          size="sm"
          sx={(theme) => ({
            width: "80px",
            // borderTopColor: `${theme.colors.yellow[6]} !important`,
          })}
        />
        <Text weight={600} color="dark.4" mt="xs">
          Address
        </Text>
        <Text color="gray.5" size="sm">
          Provide your exact address to let couriers pick up orders.
        </Text>
      </Box>
      <Grid gutter="lg" className="input-container">
        <Grid.Col span={12} sm={3} lg={4} className="item-a">
          <Text size="sm" weight={600} color="dark.4">
            Region<span style={{ color: "red" }}>*</span>
          </Text>
        </Grid.Col>
        <Grid.Col span={12} sm={9} lg={8} className="item-b">
          <Select
            placeholder="Select your region"
            withAsterisk
            data={regions}
            disabled={isFormLoading}
            {...form.getInputProps("region")}
            onChange={(v) => {
              form.setFieldValue("region", v);
              if (!updateRef.current) {
                updateRef.current = true;
              }
            }}
          />
        </Grid.Col>
        <Grid.Col span={12} sm={3} lg={4} className="item-a">
          <Text size="sm" weight={600} color="dark.4">
            Province<span style={{ color: "red" }}>*</span>
          </Text>
        </Grid.Col>
        <Grid.Col span={12} sm={9} lg={8} className="item-b">
          <Select
            placeholder="Select your Province"
            withAsterisk
            data={provinces}
            disabled={isFormLoading}
            // disabled={form.values.region.length !== 0 ? false : true}
            {...form.getInputProps("province")}
            onChange={(v) => {
              form.setFieldValue("province", v);
              if (!updateRef.current) {
                updateRef.current = true;
              }
            }}
          />
        </Grid.Col>
        <Grid.Col span={12} sm={3} lg={4} className="item-a">
          <Text size="sm" weight={600} color="dark.4">
            City<span style={{ color: "red" }}>*</span>
          </Text>
        </Grid.Col>
        <Grid.Col span={12} sm={9} lg={8} className="item-b">
          <Select
            placeholder="Select your City"
            withAsterisk
            data={cities}
            disabled={isFormLoading}
            {...form.getInputProps("city")}
            onChange={(v) => {
              form.setFieldValue("city", v);
              if (!updateRef.current) {
                updateRef.current = true;
              }
            }}
          />
        </Grid.Col>
        <Grid.Col span={12} sm={3} lg={4} className="item-a">
          <Text size="sm" weight={600} color="dark.4">
            Barangay<span style={{ color: "red" }}>*</span>
          </Text>
        </Grid.Col>
        <Grid.Col span={12} sm={9} lg={8} className="item-b">
          <Select
            placeholder="Select your Barangay"
            withAsterisk
            data={barangays}
            disabled={isFormLoading}
            {...form.getInputProps("barangay")}
            onChange={(v) => {
              form.setFieldValue("barangay", v);
              if (!updateRef.current) {
                updateRef.current = true;
              }
            }}
          />
        </Grid.Col>
        <Grid.Col span={12} sm={3} lg={4} className="item-a">
          <Text size="sm" weight={600} color="dark.4">
            Zip Code<span style={{ color: "red" }}>*</span>
          </Text>
        </Grid.Col>
        <Grid.Col span={12} sm={9} lg={8} className="item-b">
          <NumberInput
            placeholder="Zip Code"
            hideControls={true}
            disabled={isFormLoading}
            {...form.getInputProps("zipCode")}
          />
        </Grid.Col>
        <Grid.Col span={12} sm={3} lg={4} className="item-a">
          <Text size="sm" weight={600} color="dark.4">
            Address Line<span style={{ color: "red" }}>*</span>
          </Text>
        </Grid.Col>
        <Grid.Col span={12} sm={9} lg={8} className="item-b">
          <Textarea
            placeholder="House No., Street Name, Building Name, Unit No"
            autosize
            minRows={4}
            maxRows={5}
            disabled={isFormLoading}
            {...form.getInputProps("addressLine1")}
          />
        </Grid.Col>
      </Grid>
      {/* <Group position="right" py="xl">
        <UnstyledButton color="yellow.6" onClick={() => setIsAddress(false)}>
          <Text>Cancel</Text>
        </UnstyledButton>
        <Button color="yellow.6" type="submit">
          Save
        </Button>
      </Group> */}
    </Box>
  );
}

export default Address;
