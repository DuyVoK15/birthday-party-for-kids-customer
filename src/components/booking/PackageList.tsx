"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { Row, Spin, Typography } from "antd";
import { BookingRequest, useBookingContext } from "@/context/BookingContext";
import PackageCard from "./PackageCard";
import { BookingDataDisplay } from "@/app/booking/page";
import { PackageInVenueDataResponse } from "@/dtos/response/package.response";

const { Title } = Typography;

export function PackageList({
  bookingData,
  setBookingData,
  bookingDataDisplay,
  setBookingDataDisplay,
}: {
  bookingData: BookingRequest | null;
  setBookingData: React.Dispatch<React.SetStateAction<BookingRequest | null>>;
  bookingDataDisplay: BookingDataDisplay | null;
  setBookingDataDisplay: React.Dispatch<
    React.SetStateAction<BookingDataDisplay | null>
  >;
}) {
  // ** Disptach API
  const dispatch = useAppDispatch();
  const packageInVenueList = useAppSelector(
    (state) => state.packageReducer.packageInVenueList,
  );
  const loading = useAppSelector((state) => state.packageReducer.loading);

  const setItem = (packageInVenue: PackageInVenueDataResponse) => {
    setBookingData((prev) => ({ ...prev, packageInVenueId: packageInVenue?.id }));
    setBookingDataDisplay((prev) => ({ ...prev, packageInVenue }));
  };

  return (
    <Row gutter={[16, 16]}>
      <Spin
        spinning={loading}
        fullscreen
        tip="Đang chờ tải gói dịch vụ của địa điểm này ..."
      />

      {packageInVenueList.map((pkg: any, idx: number) => (
        <PackageCard
          key={idx}
          pkg={pkg}
          bookingData={bookingData}
          setItem={setItem}
        />
      ))}
    </Row>
  );
}

export default PackageList;
