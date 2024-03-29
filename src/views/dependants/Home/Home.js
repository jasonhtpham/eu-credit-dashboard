
import { Box, Container, Typography } from '@mui/material';
import { LayoutConfig } from 'constants/index';


export const Home = () => {
  return (<Box sx={LayoutConfig.defaultContainerSX}>
    <Container
      style={{
        margin: 'auto auto'
      }}
      maxWidth="md"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        px: {
          md: '130px !important'
        }
      }}
    >
      <Typography
        color="primary"
        variant="overline"
      >
        Welcome to
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="h3"
      >
        WeCredits
      </Typography>
      <Typography
        align="center"
        color="textSecondary"
        variant="body1"
        sx={{ py: 3 }}
      >
        {"To manage products and transactions please go to 'Products' in the menu on the left."}
      </Typography>
    </Container>
  </Box>);
};
