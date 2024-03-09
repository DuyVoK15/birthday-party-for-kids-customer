import React from "react";
import { Grid } from "@mui/material";
import VenueCard from "./VenueCard";

const VenueList = ({ venues }: { venues: any }) => {
  return (
    <Grid container spacing={2}>
      {venues.map((venue: any, index: number) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <VenueCard venue={venue} />
        </Grid>
      ))}
    </Grid>
  );
};

export default VenueList;
