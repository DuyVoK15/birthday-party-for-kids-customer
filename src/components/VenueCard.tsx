// import "./VenueCard.css";
import { blue } from "@ant-design/colors";
import { Avatar, Card, Flex, Popover, Space, Tag, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { ClockCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { VenueDataResponse } from "@/dtos/response/venue.response";
import Link from "next/link";
const VenueCard = ({ venue }: { venue: VenueDataResponse }) => {
  const {
    venueName,
    venueImgUrl,
    active,
    id,
    venueDescription,
    account,
    city,
    district,
    street,
    ward,
  } = venue;

  return (
    <Link href={`/booking/${id}`}>
      <Card className="shadow-md" style={{ marginTop: 16 }}>
        <Meta
          avatar={<Avatar shape="square" size={256} src={venueImgUrl} />}
          title={
            <Typography.Title level={2} style={{ margin: 0 }}>
              {venueName}
            </Typography.Title>
          }
          description={
            <Space direction="vertical">
              {/* <div>Sức chứa: {capacity}</div> */}
              <div>Địa chỉ: {`${street}, ${ward}, ${district}, ${city}`}</div>
              <div style={{ width: 700 }}>
                <Popover
                  content={<div style={{ width: 900 }}>{venueDescription}</div>}
                >
                  <Flex style={{ width: "100%" }} gap={3}>
                    <PlusCircleOutlined style={{ color: blue[5] }} />
                    <span className="text-blue-500">Description</span>
                  </Flex>
                </Popover>
              </div>
            </Space>
          }
        />
      </Card>
    </Link>
  );
};

export default VenueCard;
