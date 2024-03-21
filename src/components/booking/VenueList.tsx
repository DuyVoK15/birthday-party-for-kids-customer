import React, { useState } from "react";
import VenueCard from "./VenueCard";
import { Flex, Spin } from "antd";
import { VenueResponse } from "@/dtos/venue.dtos";
import { useBookingContext } from "@/context/BookingContext";
import { useAppDispatch } from "@/lib/hooks";
import { getAllThemeInVenueByVenueId } from "@/lib/features/action/theme.action";

const VenueList = ({
  venues,
  loading,
}: {
  venues: VenueResponse[];
  loading: boolean;
}) => {
  const dispatch = useAppDispatch();
  const fetchAllThemeInVenue = async (id: number) => {
    await dispatch(getAllThemeInVenueByVenueId(id)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  const { setBookingData, setVenue } = useBookingContext();
  const [itemtSelected, setItemSelected] = React.useState<{
    venue?: VenueResponse;
    slotInVenueId?: number;
  } | null>(null);

  const setItem = async ({
    venue,
    slotInVenueId,
  }: {
    venue: VenueResponse;
    slotInVenueId: number;
  }) => {
    setItemSelected({ venue, slotInVenueId });
    setBookingData((prev) => ({ ...prev, slotInVenueId }));
    setVenue(venue);
  };
  
  return (
    <Flex className="container mx-auto" vertical>
      <Spin spinning={loading} />
      {venues.map((venue: any, index: number) => (
        <VenueCard
          key={index}
          venue={venue}
          setItem={setItem}
          itemtSelected={itemtSelected}
        />
      ))}
    </Flex>
  );
};

export default VenueList;
