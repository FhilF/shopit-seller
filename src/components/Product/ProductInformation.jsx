import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  List,
  Modal,
  NumberInput,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconChevronRight,
  IconPhotoCheck,
  IconPlus,
  IconUpload,
  IconX,
} from "@tabler/icons";
import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function ProductInformation(props) {
  const {
    productEdit,
    informationForm,
    isFormLoading,
    tempImgUrl,
    productRef,
    productImages,
    setProductImages,
  } = props;
  const [localTempImgUrl, setLocalTempImgUrl] = useState([]);
  const [opened, setOpened] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [productDepts, setProductDepts] = useState([]);

  const categoryRef = useRef([]);

  useEffect(() => {
    axios
      .get("api/department")
      .then((res) => {
        setDepartments(res.data.Departments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleMediaInputChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files.length === 0) {
      return null;
    }

    if (files.length + localTempImgUrl.length > 10) {
      showNotification({
        title: "Error uploading file!",
        message: "Product images can only have up to 10",
        color: "red",
      });
      return null;
    }

    if (
      Array.from(files).filter((v) => !v.type.match(imageMimeType)).length > 0
    )
      showNotification({
        title: "Error uploading file!",
        message: "The file isn't supported by our server",
        color: "red",
      });

    let filePreviews = [];

    if (localTempImgUrl.length === 0) {
      Array.from(files).forEach((file, i) =>
        informationForm.insertListItem("images", {
          file: file,
          isThumbnail: i === 0 ? true : false,
        })
      );
      filePreviews = Array.from(files).map((file, i) => ({
        id: Date.now() + Math.random(),
        file: URL.createObjectURL(file),
        isThumbnail: i === 0 ? true : false,
        fname: file.name,
      }));
    } else {
      Array.from(files).forEach((file, i) =>
        informationForm.insertListItem("images", {
          file: file,
          isThumbnail: false,
        })
      );
      filePreviews = Array.from(files).map((file, i) => ({
        id: Date.now() + Math.random(),
        file: URL.createObjectURL(file),
        isThumbnail: false,
        fname: file.name,
      }));
    }

    setLocalTempImgUrl((o) => [...o, ...filePreviews]);
  };

  const removeImage = (i) => {
    const arr = Array.from(localTempImgUrl);
    arr.splice(i, 1);
    informationForm.removeListItem("images", i);
    setLocalTempImgUrl(arr);
  };

  const updateThumbnail = (i, v) => {
    // if (productEdit?.images.length > i) {
    //   let formArr = informationForm.values.images;
    //   formArr[oldThumbnail].isThumbnail = false;
    //   formArr[i].isThumbnail = true;
    //   informationForm.setValues({ images: formArr });
    // }

    let arr = Array.from(localTempImgUrl);
    const oldThumbnail = arr.findIndex((obj) => obj.isThumbnail === true);
    arr[oldThumbnail].isThumbnail = false;
    arr[i].isThumbnail = true;

    let formArr = informationForm.values.images;
    formArr[oldThumbnail].isThumbnail = false;
    formArr[i].isThumbnail = true;
    informationForm.setValues({ images: formArr });

    setLocalTempImgUrl(arr);
  };

  useEffect(() => {
    if (productEdit && departments.length > 0) {
      let imgUrls = [];
      productEdit.images.forEach((v) => {
        imgUrls.push({
          id: Date.now() + Math.random(),
          isThumbnail: v.isThumbnail,
          fileUrl: v.fileUrl,
          _id: v._id,
        });
      });
      setLocalTempImgUrl(imgUrls);

      informationForm.setValues({ images: imgUrls });
      let productDepts = [];
      const dataDept = productEdit.Departments;
      const filteredDept = departments.filter((v) => v._id === dataDept[0]._id);
      if (filteredDept.length > 0) {
        productDepts.push({
          _id: filteredDept[0]._id,
          name: filteredDept[0].name,
          children: filteredDept[0].children,
        });
        const dept2 = filteredDept[0].children?.filter(
          (v) => v._id === dataDept[1]._id
        );
        if (dept2 && dept2.length > 0) {
          productDepts.push({
            _id: dept2[0]._id,
            name: dept2[0].name,
            children: dept2[0].children,
          });
          if (dept2[0].children && dept2[0].children.length > 0) {
            const dept3 = dept2[0].children?.filter(
              (v) => v._id === dataDept[2]?._id
            );
            if (dept3 && dept3.length > 0)
              productDepts.push({
                _id: dept3[0]._id,
                name: dept3[0].name,
              });
          }
        }
      }
      categoryRef.current = productDepts;
      setProductDepts(productDepts);

      informationForm.setValues({
        name: productEdit.name,
        description: productEdit.description,
        Departments: productDepts,
      });
    }
  }, [productEdit, departments]);


  return (
    <>
      <Stack>
        <Box className="container-form">
          <Box
            sx={(theme) => ({
              marginBottom: "30px",
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
              Product Information
            </Text>
            <Text color="gray.5" size="sm">
              Input product information to show to users
            </Text>
          </Box>
          <Grid gutter="lg" className="input-container">
            <Grid.Col span={12} sm={3} lg={4} className="item-a">
              <Text size="sm" weight={600} color="dark.4">
                Product Image
              </Text>
            </Grid.Col>
            <Grid.Col span={12} sm={9} lg={8} className="item-b">
              <Stack>
                <Group spacing={6}>
                  {Array.from(localTempImgUrl).map((v, i) => {
                    return (
                      <Image
                        key={v.id}
                        v={v}
                        i={i}
                        updateThumbnail={updateThumbnail}
                        isFormLoading={isFormLoading}
                        removeImage={removeImage}
                      />
                    );
                  })}

                  {localTempImgUrl.length < 10 && (
                    <Box
                      sx={(theme) => ({
                        // position: "relative",
                        label: {
                          cursor: isFormLoading ? "auto" : "pointer",
                        },
                        [theme.fn.smallerThan("sm")]: {
                          marginTop: "4px",
                        },
                      })}
                    >
                      <input
                        accept="image/png, image/jpeg"
                        style={{ display: "none" }}
                        id="raised-button-file"
                        type="file"
                        multiple
                        disabled={isFormLoading}
                        onChange={async (e) => {
                          await handleMediaInputChange(e);
                        }}
                        className="input-upload"
                        // disabled={formLoading}
                      />
                      <label htmlFor="raised-button-file" style={{}}>
                        <Avatar
                          size={80}
                          alt="upload-shop-logo"
                          sx={(theme) => ({
                            border: "1px dashed #c7c7c7",
                            ".mantine-Avatar-placeholder": {
                              backgroundColor: "rgb(248 249 250 / 0%);",
                              // backgroundColor: theme.colors.gray[3],
                            },
                            // borderRadius: "50%",
                          })}
                        >
                          <IconPlus />
                        </Avatar>
                      </label>
                    </Box>
                  )}

                  {localTempImgUrl.length === 0 && (
                    <Box>
                      <List size="xs">
                        <List.Item>
                          <Text color="gray.6">Up to 10 images</Text>
                        </List.Item>
                        <List.Item>
                          <Text color="gray.6">Maximum file size: 2.0MB</Text>
                        </List.Item>
                        <List.Item>
                          <Text color="gray.6">
                            Image format accepted: JPG,JPEG,PNG
                          </Text>
                        </List.Item>
                      </List>
                    </Box>
                  )}
                </Group>
                <TextInput
                  sx={{
                    ".mantine-Text-root": {
                      marginTop: "-4px",
                    },
                    ".mantine-Input-wrapper": {
                      display: "none",
                    },
                  }}
                  {...informationForm.getInputProps("images")}
                />
              </Stack>
            </Grid.Col>
            <Grid.Col span={12} sm={3} lg={4} className="item-a">
              <Text size="sm" weight={600} color="dark.4">
                Product Name<span style={{ color: "red" }}>*</span>
              </Text>
            </Grid.Col>
            <Grid.Col span={12} sm={9} lg={8} className="item-b">
              <TextInput
                placeholder="Product"
                disabled={isFormLoading}
                {...informationForm.getInputProps("name")}
              />
            </Grid.Col>

            <Grid.Col span={12} sm={3} lg={4} className="item-a">
              <Text size="sm" weight={600} color="dark.4">
                Product Department<span style={{ color: "red" }}>*</span>
              </Text>
            </Grid.Col>
            <Grid.Col span={12} sm={9} lg={8} className="item-b">
              <Stack>
                <Select
                  placeholder="Department"
                  data={[
                    informationForm.values.Departments.length > 0
                      ? `${informationForm.values.Departments.map((v) => {
                          return v.name;
                        }).join(" > ")}`
                      : "",
                  ]}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpened(true);
                  }}
                  disabled={isFormLoading}
                  {...informationForm.getInputProps("Departments")}
                  styles={{ item: { display: "none" } }}
                  value={
                    informationForm.values.Departments.length > 0
                      ? `${informationForm.values.Departments.map((v) => {
                          return v.name;
                        }).join(" > ")}`
                      : ""
                  }
                />
                {/* <TextInput {...informationForm.getInputProps("category")} /> */}
              </Stack>
            </Grid.Col>

            <Grid.Col span={12} sm={3} lg={4} className="item-a">
              <Text size="sm" weight={600} color="dark.4">
                Product Description
              </Text>
            </Grid.Col>
            <Grid.Col span={12} sm={9} lg={8} className="item-b">
              <Textarea
                placeholder="Description of your shop"
                autosize
                minRows={4}
                maxRows={5}
                disabled={isFormLoading}
                {...informationForm.getInputProps("description")}
                //   {...form.getInputProps("description")}
              />
            </Grid.Col>
          </Grid>
        </Box>
      </Stack>
      <CategoryModal
        departments={departments}
        informationForm={informationForm}
        opened={opened}
        setOpened={setOpened}
        productDepts={productDepts}
        setProductDepts={setProductDepts}
        categoryRef={categoryRef}
      />
    </>
  );
}

const Image = ({ v, i, updateThumbnail, isFormLoading, removeImage }) => {
  return (
    <Box key={v.file} sx={{ position: "relative" }}>
      <Box>
        <Avatar
          size={80}
          alt="upload-shop-logo"
          sx={(theme) => ({
            // borderRadius: "50%",
            ".mantine-Avatar-placeholder": {
              backgroundColor: theme.colors.gray[3],
            },
          })}
          src={v.fileUrl ? v.fileUrl : v.file}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        {v.isThumbnail ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignContent: "flex-end",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Box
              sx={(theme) => ({
                width: "100%",
                backgroundColor: theme.colors.yellow[6],
                display: "flex",
                justifyContent: "center",
                color: "white",
              })}
            >
              <Text size="xs" weight={600}>
                thumbnail
              </Text>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              ".button-container": {
                marginTop: "4px",
                display: "none",
                // display: "none",
                ".mantine-UnstyledButton-root": {
                  backgroundColor: "rgb(0 0 0 / 40%)",
                },
              },
              ":hover": {
                ".button-container": {
                  display: isFormLoading ? "none" : "flex",
                },
              },
            }}
          >
            <Stack spacing={4} className="button-container">
              <ActionIcon
                size="sm"
                color="red"
                variant="filled"
                onClick={() => removeImage(i)}
              >
                <IconX />
              </ActionIcon>
              <ActionIcon
                size="sm"
                color="yellow"
                variant="filled"
                onClick={() => updateThumbnail(i, v)}
              >
                <IconPhotoCheck />
              </ActionIcon>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const CategoryModal = (props) => {
  const {
    departments,
    productDepts,
    setProductDepts,
    informationForm,
    opened,
    setOpened,
    categoryRef,
  } = props;
  const handleClick = (dept, deptIndex) => {
    let oldData = [];
    for (let i = 0; i < deptIndex; i++) {
      oldData.push(productDepts[i]);
    }
    setProductDepts([
      ...oldData,
      { _id: dept._id, name: dept.name, children: dept.children },
    ]);
  };
  const handleClose = () => {
    setProductDepts([]);
    setOpened(false);
  };

  const handleConfirm = () => {
    if (
      productDepts.length < 1 ||
      (productDepts[0].children &&
        productDepts[0].children.length > 0 &&
        !productDepts[1]) ||
      (productDepts[1].children &&
        productDepts[1].children.length > 0 &&
        !productDepts[2])
    ) {
      showNotification({
        title: "Error confirming department!",
        message: "Please finished completing the form",
        color: "red",
      });
      return true;
    }
    categoryRef.current = productDepts;
    informationForm.setValues({ Departments: productDepts });
    setOpened(false);
  };

  useEffect(() => {
    if (opened) {
      if (categoryRef.current.length > 0) {
        if (categoryRef.current[0]) {
          setProductDepts(categoryRef.current);
        }
      }
    }
  }, [opened]);

  return (
    <Modal
      closeOnClickOutside={false}
      opened={opened}
      onClose={() => {
        handleClose();
      }}
      title={
        <Text weight={600} color="dark.3" size="xl">
          Edit Category
        </Text>
      }
      size="xl"
      centered={true}
      sx={(theme) => ({
        ".mantine-Modal-modal": {
          width: "100%",
          [theme.fn.largerThan("lg")]: {
            width: theme.breakpoints.lg - 160,
          },
        },
      })}
    >
      <Grid
        gutter="lg"
        mt="sm"
        sx={(theme) => ({
          height: "450px",
          ".grid": {
            ".department-container": {
              height: "100%",
              ".sa": {
                height: "420px",
              },
              ".cat-item": {
                "&.active": {
                  color: theme.colors.yellow[7],
                },
                cursor: "pointer",
                ".cat-item-text": {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
                ":hover": {
                  background: theme.colors.gray[1],
                },
              },
            },
          },
          ".grid-1": {},

          ".grid-2": {
            borderLeft: "1px solid #e9e9e9",
          },

          ".grid-3": {
            borderLeft: "1px solid #e9e9e9",
          },
        })}
      >
        <Grid.Col span={4} className="grid grid-1">
          <Box className="department-container">
            <ScrollArea className="sa">
              <Stack spacing={0}>
                {departments.map((el) => {
                  return (
                    <DepartmentItem
                      key={el.name}
                      department={el}
                      itemFunction={handleClick}
                      departmentIndex={0}
                      deptPicked={productDepts[0]}
                    />
                  );
                })}
              </Stack>
            </ScrollArea>
          </Box>
        </Grid.Col>
        <Grid.Col span={4} className="grid grid-2">
          <Box className="department-container">
            <ScrollArea className="sa">
              <Stack spacing={0}>
                {productDepts[0]?.children?.map((el) => {
                  return (
                    <DepartmentItem
                      key={el.name}
                      department={el}
                      itemFunction={handleClick}
                      departmentIndex={1}
                      deptPicked={productDepts[1]}
                    />
                  );
                })}
              </Stack>
            </ScrollArea>
          </Box>
        </Grid.Col>
        <Grid.Col span={4} className="grid grid-3">
          <Box className="department-container">
            <ScrollArea className="sa">
              <Stack spacing={0}>
                {productDepts[1]?.children?.map((el) => {
                  return (
                    <DepartmentItem
                      key={el.name}
                      department={el}
                      itemFunction={handleClick}
                      departmentIndex={2}
                      deptPicked={productDepts[2]}
                    />
                  );
                })}
              </Stack>
            </ScrollArea>
          </Box>
        </Grid.Col>
      </Grid>
      <Group position="right" spacing={0}>
        <Button variant="subtle" color="dark" onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button onClick={() => handleConfirm()}>Confirm</Button>
      </Group>
    </Modal>
  );
};

const DepartmentItem = ({
  department,
  itemFunction,
  departmentIndex,
  deptPicked,
}) => {
  return (
    <Grid
      px="lg"
      className={clsx(
        "cat-item",
        deptPicked?.name === department.name && "active"
      )}
      onClick={() => itemFunction(department, departmentIndex)}
      gutter={0}
    >
      <Grid.Col span={10} py={4}>
        <Text size="sm" className="cat-item-text">
          {department.name}
        </Text>
      </Grid.Col>
      <Grid.Col span={2} py={4}>
        {department.children && department.children.length > 0 && (
          <Group position="right">
            <IconChevronRight className="chevron" size={14} stroke={1.5} />
          </Group>
        )}
      </Grid.Col>
    </Grid>
  );
};

export default ProductInformation;
