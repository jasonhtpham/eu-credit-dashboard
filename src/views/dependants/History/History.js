import { useState, useEffect, useCallback } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { API } from "helpers";
import { EnhancedTable, notify } from "components/index";
import { useIsMountedRef } from "../../../helpers/hooks/index";
import { Box, Container } from "@mui/material";

const ROWS_PER_PAGE = 25;
const IGNORE_KEYS = [
  "userId",
  "onMarket",
  "isBlocked",
  "activeTransaction",
  "pastTransaction",
  "__v",
  "createdAt",
  "status",
  "expiryDate",
];

export const History = () => {
  const [products, setProducts] = useState([]);
  const isMounted = useIsMountedRef();

  const getProducts = useCallback(async () => {
    try {
      const skip = 0;
      const limit = ROWS_PER_PAGE;

      const response = await API.getProducts(skip, limit);
      if (response.success) {
        let products = response.data.data;

        products.forEach((product) => {
          console.log(product);
          const formattedexpDate = format(
            new Date(product.expiryDate),
            "yyyy-MM-dd"
          );
          const formattedUpdateDate = formatDistanceToNow(
            new Date(product.updatedAt),
            { includeSeconds: true }
          );
          product.expiryDate = formattedexpDate;
          product.updatedAt = formattedUpdateDate;
          product.type = product.type.name;
        });

        if (isMounted) setProducts(products);
      } else {
        setProducts([]);
        notify("Failed to Fetch Users List");
      }
    } catch (err) {
      setProducts([]);
      notify("Failed to Fetch Users List");
    }
  }, [isMounted]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  let content = (
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: {
            xs: "100px",
            sm: window.screen.availHeight / 50,
          },
        }}
      >
        <EnhancedTable
          data={products}
          title="Transaction History"
          options={{
            ignoreKeys: IGNORE_KEYS,
            rowsPerPage: ROWS_PER_PAGE,
            actions: [
              {
                name: "",
                label: "Info",
                type: "button",
                function: () => {
                  if (isMounted) {
                    console.log("Transaction information should be shown here");
                  }
                },
              },
            ],
          }}
        />
      </Container>
    </Box>
  );
  return content;
};
