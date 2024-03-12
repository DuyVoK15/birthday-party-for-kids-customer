import React from "react";
import VenueCard from "./VenueCard";
import { Flex, Spin } from "antd";
import { VenueResponse } from "@/dtos/venue.dtos";

const VenueList = ({
  venues,
  loading,
}: {
  venues: VenueResponse[];
  loading: boolean;
}) => {
  return (
    <Flex className="container mx-auto" vertical>
      <Spin spinning={loading} />
      {venues.map((venue: any, index: number) => (
        <VenueCard key={index} venue={venue} />
      ))}
    </Flex>
  );
};

export default VenueList;
