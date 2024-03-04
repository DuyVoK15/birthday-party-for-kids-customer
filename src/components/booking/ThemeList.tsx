import React from 'react';
import { Grid } from '@mui/material';
import ThemeCard from './ThemeCard';

const ThemeList = ({ themes }) => {
  return (
    <Grid container spacing={2}>
      {themes.map((theme, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <ThemeCard theme={theme} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ThemeList;
