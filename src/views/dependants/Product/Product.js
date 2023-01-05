import { useState, useEffect, useCallback } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { API } from 'helpers';
import { EnhancedTable, EnhancedModal, notify } from 'components/index';
import { useIsMountedRef } from '../../../helpers/hooks/index';
import { Box, Container, Typography } from '@mui/material';
import { KycModalContent } from './KycModalContent';

const ROWS_PER_PAGE = 25;
const IGNORE_KEYS = ['_id', 'userId',
  'sellerKyc', 'description',
  'onMarket', 'isBlocked', 'activeTransaction',
  'pastTransaction', '__v', 'createdAt',
];

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
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
          const formattedexpDate = format(new Date(product.expiryDate), 'yyyy-MM-dd');
          const formattedUpdateDate = formatDistanceToNow(new Date(product.updatedAt), { includeSeconds: true });
          product.expiryDate = formattedexpDate;
          product.updatedAt = formattedUpdateDate;
          product.type = product.type.name;
        });

        if (isMounted) setProducts(products);
      }
      else {
        setProducts([]);
        notify('Failed to Fetch Products List');
      }
    } catch (err) {
      setProducts([]);
      notify('Failed to Fetch Products List');
    }

  }, [isMounted]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const approveProduct = async (productId) => {
    try {
      const response = await API.approveProduct(productId);
      if (response.success) {
        await getProducts();
        setModalOpen(false);
      }
      else {
        notify('Failed to approve');
      }
    } catch (err) {
      notify('Error occured');
    }
  };

  let content = (
    <Box sx={{
      backgroundColor: 'background.default',
      display: 'flex', flexDirection: 'column',
      minHeight: '100vh'
    }} >
      <Container maxWidth="lg" sx={{
        py: {
          xs: '100px',
          sm: window.screen.availHeight / 50
        }
      }}>

        <EnhancedModal
          dialogTitle={<Typography variant="h3" gutterBottom>
            Verify {selectedProduct?.status === 'PENDING' ? "Seller" : "Buyer"} KYC
          </Typography>}
          isOpen={modalOpen}
          dialogContent={<KycModalContent
            name={selectedProduct?.name}
            id={selectedProduct?._id}
            kyc={
              selectedProduct?.status === 'PENDING'
                ? selectedProduct?.sellerKyc
                : selectedProduct?.activeTransaction?.buyerKyc
            }
          />}
          submitButtonName={'Approve'}
          cancelButtonName={'Reject'}
          options={{
            onClose: () => {
              setModalOpen(false);
            },
            onSubmit: async () => {
              await approveProduct(selectedProduct._id);
            }
          }}
        />

        <EnhancedTable
          data={products}
          title="Products Manager"
          options={{
            ignoreKeys: IGNORE_KEYS,
            rowsPerPage: ROWS_PER_PAGE,
            actions: [
              {
                name: '',
                label: 'Verify',
                type: 'button',
                function: (e, product) => {
                  if (isMounted) {
                    setSelectedProduct(product);
                    setModalOpen(true);
                  }

                }
              }
            ]
          }}

        />
      </Container>
    </Box>
  );
  return content;
};
