import React from 'react';
import { Grid } from '@mui/material';
import PackageCard from './PackageCard';

const PackageList = ({ packages }) => {
  return (
    <Grid container spacing={2}>
      {packages.map((packageInfo, index) => (
        <Grid item key={index} xs={12} md={6} lg={4}>
          <PackageCard packageInfo={packageInfo} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PackageList;
