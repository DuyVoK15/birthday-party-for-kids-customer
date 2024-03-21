import { VenueResponse } from "@/dtos/venue.dtos";
import { CardBody, CardHeader } from "@material-tailwind/react";
import { Button, Card, Image, Typography } from "antd";
import React from "react";

const VenueCard = ({ venue }: { venue: VenueResponse }) => {
  return (
    <Card className="package-card border">
        <Image
          width={'100%'}
          height={300}
          src={venue?.venueImgUrl || ""}
          alt={venue?.venueName}
          className="object-cover"
          style={{borderRadius: 16}}

        />
      <CardBody placeholder="">
        <div className="flex items-center gap-2">
          <Typography
            style={{ fontSize: 16 }}
            color="blue"
            className="font-medium text-gray-500 "
          >
            {venue?.venueName}
          </Typography>
        </div>
        <a
          href="#"
          className="text-gray-500 transition-colors hover:text-purple-600"
        >
          <Typography style={{ fontSize: 13 }} className="mb-2 normal-case">
            {"Địa chỉ: "+ venue?.location}
          </Typography>
        </a>
        <Typography className="mb-6 font-normal !text-gray-500">
          {"Sức chứa: " + venue?.capacity}
        </Typography>
        <Button>Chi tiết</Button>
      </CardBody>
    </Card>
  );
};

export default VenueCard;
