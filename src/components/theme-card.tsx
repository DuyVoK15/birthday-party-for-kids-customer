import { ThemeDataResponse } from "@/dtos/response/theme.response";
import { VenueResponse } from "@/dtos/response/venue.response";
import { CardBody, CardHeader } from "@material-tailwind/react";
import { Button, Card, Image, Typography } from "antd";
import React from "react";

const ThemeCard = ({
  theme,
}: {
  theme: any;
}) => {
  return (
    <Card className="package-card border">
      <Image
        width={"100%"}
        height={300}
        src={theme?.themeImgUrl || ""}
        alt={theme?.themeName}
        className="object-cover"
        style={{ borderRadius: 16 }}
      />
      <CardBody placeholder="" className="p-0">
        <div className="flex items-center">
          <Typography.Title
            level={4}
            color="blue"
            className="mt-2 text-center font-medium text-gray-500"
          >
            {theme?.themeName}
          </Typography.Title>
        </div>
        <Button className="mt-2">Chi tiết</Button>
      </CardBody>
    </Card>
  );
};

export default ThemeCard;
