"use client";

import CourseCard from "@/components/package-card/package-card";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllVenue } from "@/lib/features/action/venue.action";
import { useEffect } from "react";
import VenueCard from "@/components/venue-card";
import { Typography } from "antd";
const { Title } = Typography;
const COURSES = [
  {
    img: "/image/package-basic-1.png",
    tag: "Sức chứa: từ 1 - 30 người",
    title: "Gói tiệc sinh nhật BASIC 1",
    label: "2 triệu VNĐ",
    desc: "Gói BASIC bao gồm các dịch vụ trang trí, thức ăn, chươn trình ca nhạc,.....",
  },
  {
    img: "/image/package-basic-1.png",
    tag: "Sức chứa: từ 1 - 30 người",
    title: "Gói tiệc sinh nhật BASIC 2",
    label: "2 triệu VNĐ",
    desc: "Gói BASIC bao gồm các dịch vụ trang trí, thức ăn, chươn trình ca nhạc,.....",
  },
  {
    img: "/image/package-basic-1.png",
    tag: "Sức chứa: từ 1 - 30 người",
    title: "Gói tiệc sinh nhật BASIC 3",
    label: "2 triệu VNĐ",
    desc: "Gói BASIC bao gồm các dịch vụ trang trí, thức ăn, chươn trình ca nhạc,.....",
  },
  {
    img: "/image/package-basic-1.png",
    tag: "Sức chứa: từ 1 - 50 người",
    title: "Gói tiệc sinh nhật VIP 1",
    label: "5 triệu VNĐ",
    desc: "Gói VIP bao gồm các dịch vụ trang trí, thức ăn, chươn trình ca nhạc,.....",
  },
  {
    img: "/image/package-basic-1.png",
    tag: "Sức chứa: từ 1 - 50 người",
    title: "Gói tiệc sinh nhật VIP 2",
    label: "5 triệu VNĐ",
    desc: "Gói VIP bao gồm các dịch vụ trang trí, thức ăn, chươn trình ca nhạc,.....",
  },
  {
    img: "/image/package-basic-1.png",
    tag: "Sức chứa: từ 1 - 50 người",
    title: "Gói tiệc sinh nhật VIP 3",
    label: "5 triệu VNĐ",
    desc: "Gói VIP bao gồm các dịch vụ trang trí, thức ăn, chươn trình ca nhạc,.....",
  },
];

export function VenueCards() {
  // ** Disptach API
  const dispatch = useAppDispatch();
  const venueList = useAppSelector((state) => state.venueReducer.venueList);
  const fetchAllVenue = async () => {
    await dispatch(getAllVenue()).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  useEffect(() => {
    fetchAllVenue();
  }, []);

  return (
    <section className="px-8">
      <div className="text-center">
        <Title level={1} color="blue-gray">
          Các Địa Điểm Nổi Bật
        </Title>
        <Title
          level={5}
          className="mx-auto w-full px-4 !text-gray-500 lg:w-6/12 lg:px-8"
        >
          Các địa điểm tổ chức tiệc sinh nhật với LoveKids thật hoành tráng
        </Title>
      </div>
      <div className="container mt-10 mx-auto grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
        {venueList.map((venue, idx) => (
          <VenueCard key={idx} venue={venue} />
        ))}
      </div>
    </section>
  );
}

export default VenueCards;
