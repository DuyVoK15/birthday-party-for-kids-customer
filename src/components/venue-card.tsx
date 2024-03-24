import { VenueDataResponse } from "@/dtos/response/venue.response";
import { CardBody } from "@material-tailwind/react";
import { Button, Card, Carousel, Image, Typography } from "antd";

const VenueCard = ({ venue }: { venue: VenueDataResponse }) => {
  return (
    <div>
      <img
        src={venue?.venueImgUrl}
        alt={venue?.venueName}
        style={{
          width: "100%",
          height: 450,
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div style={{position: 'absolute', fontSize: 30, top: 10, marginLeft: 15}}>{venue?.venueName}</div>
    </div>
  );
};

export default VenueCard;
