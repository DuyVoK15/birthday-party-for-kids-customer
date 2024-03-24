import { BookingRequest } from "@/context/BookingContext";
import { PackageInVenueDataResponse } from "@/dtos/response/package.response";
import { imageUrlIfUndefined } from "@/utils/images";
import { EyeOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { Button, Card, Col, Flex, Image } from "antd";
import Meta from "antd/es/card/Meta";
import PackageDetail from "./PackageDetail";

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
        <Flex gap={10} align="center" className="mt-3">
          <ModalForm
            title="Chi tiết"
            trigger={
              <Button type="default" size="middle">
                <EyeOutlined />
                Chi tiết
              </Button>
            }
            style={{ padding: 0 }}
            onFinish={async () => {
              return true;
            }}
          >
            <PackageDetail packageInVenue={apackage} />
          </ModalForm>
          <Button type="primary" onClick={() => setItem(pkg)}>
            {id === bookingData?.packageInVenueId ? "Đang chọn" : "Chọn"}
          </Button>
        </Flex>
      </Card>
    </Col>
  );
};

export default PackageCard;
