import { ThemeDataResponse } from "@/dtos/response/theme.response";
import { ThemeInVenueDataResponse } from "@/dtos/response/theme.resposne";
import { VenueResponse } from "@/dtos/venue.dtos";
import { imageUrlIfUndefined } from "@/utils/images";
import { CardBody, CardHeader } from "@material-tailwind/react";
import { Button, Card, Col, Flex, Image, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

const ThemeCard = ({
  themeInVenue,
  itemSelected,
  setItem,
}: {
  themeInVenue: ThemeInVenueDataResponse;
  itemSelected: number | null;
  setItem: (id: number) => void;
}) => {
  const { id, active, theme } = themeInVenue;
  return (
    <Col span={6}>
      <Card
        hoverable
        style={{
          bottom: id === itemSelected ? 10 : 0,
          boxShadow:
            id === itemSelected
              ? "0 4px 8px rgba(153, 102, 255, 0.9)"
              : "unset",
        }}
        cover={
          <Image
            alt={theme?.themeName || "Chủ đề"}
            src={theme?.themeImgUrl || imageUrlIfUndefined}
            style={{
              width: "100%",
              height: 250,
              objectFit: "cover",
              // borderRadius: id === itemSelected ? 0 : 7,
            }}
          />
        }
      >
        <Meta
          title={theme?.themeName || "Chủ đề"}
          description={theme?.themeDescription || "Mô tar"}
        />
        <Flex gap={10}>
          <Button onClick={() => null} className="mt-3">
            Chi tiết
          </Button>
          <Button type="primary" onClick={() => setItem(id)} className="mt-3">
            {id === itemSelected ? "Đang chọn" : "Chọn"}
          </Button>
        </Flex>
      </Card>
    </Col>
  );
};

export default ThemeCard;
