import {
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  Text,
  UnstyledButton,
} from "@mantine/core";
import axios from "axios";
import ProductCard from "components/Product/ProductCard";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("api/shop/product", {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data.products);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box className="content">
      <Paper>
        <Box py="xl">
          <Group
            position="apart"
            sx={(theme) => ({
              marginBottom: "30px",
            })}
          >
            <Box>
              <Text weight={600} color="dark.4" mt="xs" size="lg">
                Shop Products
              </Text>
              <Text color="gray.5" size="sm">
                Manage your shop products
              </Text>
            </Box>
            <Button
              color="yellow.6"
              onClick={() => {
                navigate("/portal/product/add");
              }}
            >
              Add New Product
            </Button>
          </Group>

          <Box mt="xl">
            <Grid
              gutter={8}
              sx={(theme) => ({
                ".item .mantine-Paper-root": {
                  cursor: "pointer",
                  ".mantine-Avatar-root": {
                    width: "100%",
                    height: "160px",
                  },
                },
              })}
            >
              {products.map((v) => {
                return (
                  <Grid.Col span={3} className="item" key={v._id}>
                    <ProductCard
                      item={v}
                      showStocks={true}
                      href={`/portal/product/${v._id}`}
                    />
                  </Grid.Col>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Product;
