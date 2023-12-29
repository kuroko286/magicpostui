import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from 'src/components/logo';

// TODO: Change subtitle text

export const Layout = (props) => {
  const { children } = props;

  return (
    <Box
      component="main"
    >
     
        <Grid
          xs={12}
          lg={12}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
         
            {/* <Box
              component={NextLink}
              href="/"
              sx={{
                display: 'inline-flex',
                height: 100,
                width: 128
              }}
              
            >
              <Logo />
            
          </Box> */}
          {children}
        </Grid>
       
      
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node
};