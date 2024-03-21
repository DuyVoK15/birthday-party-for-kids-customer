"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getAllTheme,
  getAllThemeInVenue,
  getAllThemeInVenueByVenueId,
} from "@/lib/features/action/theme.action";
import React, { Fragment, useEffect } from "react";
import { Row, Spin, Typography } from "antd";
import { useBookingContext } from "@/context/BookingContext";
import ThemeCard from "./ThemeCard";

const { Title } = Typography;

export function ThemeList() {
  // ** Disptach API
  const dispatch = useAppDispatch();
  const themeInVenueList = useAppSelector(
    (state) => state.themeReducer.themeInVenueList,
  );
  const loading = useAppSelector((state) => state.themeReducer.loading);
  // ** Context API
  const { setBookingData, venue } = useBookingContext();

  const [itemSelected, setItemSelected] = React.useState<number | null>(null);
  const setItem = (themeInVenueId: number) => {
    setItemSelected(themeInVenueId);
    setBookingData((prev) => ({ ...prev, themeInVenueId }));
  };

  return (
    <Row gutter={[16, 16]}>
      <Spin
        spinning={loading}
        fullscreen
        tip="Đang chờ tải chủ đề của địa điểm này ..."
      />

      {themeInVenueList.map((theme: any, idx: number) => (
        <ThemeCard
          key={idx}
          themeInVenue={theme}
          itemSelected={itemSelected}
          setItem={setItem}
        />
      ))}
    </Row>
  );
}

export default ThemeList;
