"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { Fragment, useEffect } from "react";
import { Row, Spin, Typography } from "antd";
import { useBookingContext } from "@/context/BookingContext";
import PackageCard from "./PackageCard";

const { Title } = Typography;

export function PackageList() {
  // ** Disptach API
  const dispatch = useAppDispatch();
  const packageInVenueList = useAppSelector(
    (state) => state.packageReducer.packageInVenueList,
  );
  const loading = useAppSelector((state) => state.packageReducer.loading);
  // ** Context API
  const { setBookingData, venue } = useBookingContext();

  const [itemSelected, setItemSelected] = React.useState<number | null>(null);
  const setItem = (packageInVenueId: number) => {
    setItemSelected(packageInVenueId);
    setBookingData((prev) => ({ ...prev, packageInVenueId }));
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
          itemSelected={itemSelected}
          setItem={setItem}
        />
      ))}
    </Row>
  );
}

export default PackageList;
