import React from "react";
import "./VenueCard.css";
import Link from "next/link";
import { blue } from "@ant-design/colors";
import {
  Avatar,
  Card,
  Divider,
  Flex,
  Popover,
  Space,
  Tag,
  Typography,
} from "antd";
import Meta from "antd/es/card/Meta";
import { ClockCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { VenueResponse } from "@/dtos/venue.dtos";
const VenueCard = ({ venue }: { venue: VenueResponse }) => {
  const {
    venueName,
    venueImgUrl,
    location,
    active,
    capacity,
    id,
    slotInVenueList,
    venueDescription,
  } = venue;

  return (
    <Card className="shadow-md" style={{ marginTop: 16 }}>
      <Meta
        avatar={<Avatar shape="square" size={256} src={venueImgUrl} />}
        title={venueName}
        description={
          <Space direction="vertical">
            <div>Capacity: {capacity}</div>
            <div>Location: {location}</div>
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

            <Flex vertical gap={5}>
              <Typography.Title level={5}>Time Slots:</Typography.Title>
              <Space direction="horizontal">
                {slotInVenueList.map((slot, index: number) =>
                  slot?.status === true ? (
                    <Tag
                      key={index}
                      icon={<ClockCircleOutlined />}
                      color="red"
                    >
                      In Use
                    </Tag>
                  ) : (
                    <Tag
                      key={index}
                      icon={<ClockCircleOutlined />}
                      color="blue"
                    >
                      {slot?.slotObject?.timeStart} -{" "}
                      {slot?.slotObject?.timeEnd}
                    </Tag>
                  ),
                )}
              </Space>
            </Flex>
          </Space>
        }
      />
    </Card>
  );
};

export default VenueCard;
