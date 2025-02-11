import React from 'react';
import { Box, Typography } from '@mui/material';

function Logo() {
  return (
    <Typography 
      variant="h6" 
      component="div" 
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: '0px',
        fontWeight: 600
      }}
    >
      <Box component="span">C</Box>
      <Box 
        component="span" 
        sx={{ 
          color: '#00a4bd',
          position: 'relative',
          top: '1px',
          mx: '-2px'
        }}
      >
        v
      </Box>
      <Box component="span">RM</Box>
    </Typography>
  );
}

export default Logo;
