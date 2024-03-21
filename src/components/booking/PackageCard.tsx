import {
  PackageDataResponse,
  PackageInVenueDataResponse,
} from "@/dtos/response/package.response";
import { VenueResponse } from "@/dtos/response/venue.response";
import { imageUrlIfUndefined } from "@/utils/images";
import { CardBody, CardHeader } from "@material-tailwind/react";
import { Button, Card, Col, Flex, Image, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

const PackageCard = ({
  pkg,
  itemSelected,
  setItem,
}: {
  pkg: PackageInVenueDataResponse;
  itemSelected: number | null;
  setItem: (id: number) => void;
}) => {
  const { id, active, apackage } = pkg;
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
            alt={apackage?.packageName || "Chủ đề"}
            src={apackage?.packageImgUrl || imageUrlIfUndefined}
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
          title={apackage?.packageName || "Chủ đề"}
          description={`Giá: ${apackage?.pricing} ` || "Giá"}
        />
        <Flex gap={10}>
          <Button onClick={() => null} className="mt-3">
            Chi tiết
          </Button>
          <Button type="primary" onClick={() => setItem(id)} className="mt-3">
            Chọn
          </Button>
        </Flex>
      </Card>
    </Col>
  );
};

export default PackageCard;
