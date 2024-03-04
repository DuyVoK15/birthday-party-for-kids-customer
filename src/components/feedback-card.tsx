import React from "react";

import {
  Typography,
  Card,
  CardBody,
  Avatar,
  Rating,
} from "@material-tailwind/react";

interface FeedbackCardProps {
  img: string;
  feedback: string;
  client: string;
  title: string;
}

export function FeedbackCard({
  img,
  feedback,
  client,
  title,
}: FeedbackCardProps) {
  return (
    <Card placeholder="" shadow={false} className="items-start text-left">
      <CardBody placeholder="">
        <Avatar
          placeholder=""
          src={img}
          className="mb-2"
          alt={client}
          size="xl"
        />
        <Typography placeholder="" variant="h6" color="blue-gray">
          {client}
        </Typography>
        <Typography
          placeholder=""
          variant="small"
          color="blue-gray"
          className="mb-5 mt-1 block font-normal"
        >
          {title}
        </Typography>
        <Typography
          placeholder=""
          variant="paragraph"
          className="mb-6 font-normal text-gray-500"
        >
          &quot;{feedback}&quot;
        </Typography>
        <Rating placeholder="" value={5} readonly />
      </CardBody>
    </Card>
  );
}
export default FeedbackCard;
