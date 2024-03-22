"use client";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Flex, Image, Space, Typography } from "antd";
import * as React from "react";

const Item = ({
  title,
  description,
}: {
  title: string;
  description: string | React.ReactNode;
}) => {
  return (
    <Flex gap={100}>
      <div className="flex-1 font-bold">{title}</div>
      <div className="flex-1 text-sm font-normal text-gray-700">
        {description}
      </div>
    </Flex>
  );
};
const ChildItem = ({
  title,
  description,
}: {
  title: string;
  description: string | React.ReactNode;
}) => {
  return (
    <Flex gap={100} justify="space-between">
      <div className="font-bold text-black">{title}</div>
      <div className="text-sm font-normal text-gray-700">{description}</div>
    </Flex>
  );
};
export default function BookingHistory() {
  return (
    <div className="container mx-auto mt-10">
      
    </div>
  );
}
