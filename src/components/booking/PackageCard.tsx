import { BookingRequest } from "@/context/BookingContext";
import { PackageInVenueDataResponse } from "@/dtos/response/package.response";
import { imageUrlIfUndefined } from "@/utils/images";
import { Button, Card, Col, Flex, Image } from "antd";
import Meta from "antd/es/card/Meta";

const PackageCard = ({
  pkg,
  bookingData,
  setItem,
}: {
  pkg: PackageInVenueDataResponse;
  bookingData: BookingRequest | null;
  setItem: (id: PackageInVenueDataResponse) => void;
}) => {
  const { id, active, apackage } = pkg;

  return (
    <Col span={6}>
      <Card
        hoverable
        style={{
          bottom: id === bookingData?.packageInVenueId ? 10 : 0,
          boxShadow:
            id === bookingData?.packageInVenueId
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
          <Button type="primary" onClick={() => setItem(pkg)} className="mt-3">
            {id === bookingData?.packageInVenueId ? "Đang chọn" : "Chọn"}
          </Button>
        </Flex>
      </Card>
    </Col>
  );
};

export default PackageCard;
