import React from "react";
import VenueCard from "./VenueCard";
import { Empty, Flex, Spin } from "antd";
import { VenueDataResponse } from "@/dtos/response/venue.response";
import { BookingRequest } from "@/context/BookingContext";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllThemeInVenueByVenueId } from "@/lib/features/action/theme.action";

const VenueList = ({
  venueList,
  bookingData,
  setBookingData,
  setVenue,
  bookingDataDisplay,
  setBookingDataDisplay,
}: {
  venueList: VenueDataResponse[] | [];
  bookingData: BookingRequest | null;
  setBookingData: React.Dispatch<React.SetStateAction<BookingRequest | null>>;
  setVenue: React.Dispatch<React.SetStateAction<VenueDataResponse | null>>;
  bookingDataDisplay: any | null;
  setBookingDataDisplay: React.Dispatch<
    React.SetStateAction<any | null>
  >;
}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.venueReducer.loading);

  const fetchAllThemeInVenue = async (id: number) => {
    await dispatch(getAllThemeInVenueByVenueId(id)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  const setItem = ({
    venue,
    slotInVenue,
  }: {
    venue: VenueDataResponse;
    slotInVenue: any;
  }) => {
    setVenue(venue);
    setBookingData((prev) => ({ ...prev, slotInVenueId: slotInVenue?.id }));
    setBookingDataDisplay((prev: any) => ({ ...prev, slotInVenue }));
  };

  return (
    <Flex className="container mx-auto" vertical>
      <Spin spinning={loading} />
      {venueList && venueList?.length > 0 ? (
        venueList?.map((venue: any, index: number) => (
          <VenueCard
            key={index}
            venue={venue}
            setItem={setItem}
            bookingData={bookingData}
          />
        ))
      ) : (
        <Empty description="Không có dữ liệu" />
      )}
    </Flex>
  );
};

export default VenueList;
