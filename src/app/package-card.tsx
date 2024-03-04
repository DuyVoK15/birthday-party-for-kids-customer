"use client";

import { Typography } from "@material-tailwind/react";
import CourseCard from "@/components/package-card/package-card";

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

export function PackageCard() {
  return (
    <section className="px-8 pt-60">
      <div className="container mx-auto mb-24 text-center">
        <Typography variant="h3" color="blue-gray">
          Các Gói Dịch Vụ
        </Typography>
        <Typography
          variant="h6"
          className="mx-auto mt-2 w-full px-4 !text-gray-500 lg:w-6/12 lg:px-8"
        >
          Các gói dịch vụ dưới đây áp dụng toàn bộ cho các chi nhánh trên toàn
          quốc
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
        {COURSES.map((props, idx) => (
          <CourseCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

export default PackageCard;
