import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./VenueCard.css";
import Link from "next/link";
const VenueCard = ({ venue }) => {
  const { VenueName, VenueImgUrl, Location, Capacity, Status } = venue;

  return (
    <Link href={"#"}>
      <Card className="venue-card">
        <CardMedia
          component="img"
          height="140"
          image={VenueImgUrl}
          alt={VenueName}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {VenueName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Capacity: {Capacity}
          </Typography>
          <Typography display={"flex"} variant="body1" color="text.secondary">
            Status: <Typography variant="body1" color={Status === 'Đã có người đặt' ? "error.main" : "success.main"}>{Status}</Typography>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VenueCard;
