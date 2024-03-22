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
export default function BookingDetail() {
  return (
    <div className="container mx-auto mt-10">
      <div className="">
        <Flex justify="space-between" gap={30}>
          <div className="w-3/4">
            <Space direction="vertical" size={"large"}>
              <Typography.Title level={3}>
                Bữa tiệc của bạn đang chờ được Xác Nhận
              </Typography.Title>

              <Space direction="vertical" size={"middle"}>
                <Flex align="start" gap={10}>
                  <CalendarOutlined style={{ fontSize: 30 }} />
                  <Flex vertical gap={4}>
                    <div>Thời gian check-in</div>
                    <div className="font-bold">T2, 01 tháng 04, 2024</div>
                    <div className="text-sm font-thin text-gray-700">
                      vào lúc 17:00:00
                    </div>
                  </Flex>
                  {/* <Divider className="h-50 mx-0 my-2" type="vertical" /> */}
                  <Flex vertical gap={4}>
                    <div>Thời gian check-out</div>
                    <div className="font-bold">T2, 01 tháng 04, 2024</div>
                    <div className="text-sm font-thin text-gray-700">
                      vào lúc 19:00:00
                    </div>
                  </Flex>
                </Flex>

                <Flex align="start" gap={10}>
                  <EnvironmentOutlined style={{ fontSize: 30 }} />
                  <Flex vertical gap={4}>
                    <div className="font-bold">Địa chỉ</div>
                    <div className="text-sm font-thin text-gray-700">
                      Số 32. cách mạng tháng tám, quận 1, TP. HCM
                    </div>
                  </Flex>
                </Flex>
              </Space>

              <Typography.Title level={3}>
                Chi tiết của bữa tiệc
              </Typography.Title>
              <Space direction="vertical" size={"middle"}>
                <Flex align="center" justify="space-between" gap={20}>
                  <Space size={"large"}>
                    <Image
                      width={100}
                      height={100}
                      className="rounded-xl"
                      src={
                        "https://lh7-us.googleusercontent.com/RpJsZJpUE7GiSnl6q-zehT1zgdRPVzkYRkzBnfvhq3CRQQaLmZzuxDFq2uLRhlgXEOpQusxAbKRLNsOD5ygXGoO0y0hKGA5s3AKz89G957hGLv20SBiwcIgiAzSrCMXCepOlO6pMkokJkzVA1M212tA"
                      }
                    />
                    <Space direction="vertical">
                      <Typography.Title className="m-0 font-bold" level={4}>
                        LoveKids Palace Quận 1
                      </Typography.Title>
                      <div className="text-sm font-thin text-gray-700">
                        Số 32. cách mạng tháng tám, quận 1, TP. HCM
                      </div>
                    </Space>
                  </Space>

                  <Button type="link">Xem đường đi</Button>
                </Flex>
                <Item title="Tên khách hàng" description="Võ Thanh Duy" />
                <Item title="Sức chứa tối đa" description="50 người" />
                <Item
                  title="Chi tiết địa điểm"
                  description="	Bể sục, Phòng tắm riêng, Ban công, Sân hiên, Nhìn ra vườn, Nhìn ra thành phố, Đồ vệ sinh cá nhân miễn phí, Phòng xông hơi, Hướng nhìn sân trong, Điều hòa không khí, Bếp, Máy giặt, Nhà vệ sinh, Ghế sofa, Bồn tắm hoặc Vòi sen, Sàn lát gỗ, Khăn tắm, Ra trải giường, Sản phẩm lau rửa, Sàn lát gạch/đá cẩm thạch, Bàn làm việc, Khu vực tiếp khách, Hệ thống cách âm, TV, Dép, Tủ lạnh, Bàn ủi, Lò vi sóng, Hệ thống sưởi, TV màn hình phẳng, Máy sấy tóc, Đồ bếp, Bếp nhỏ, Quạt máy, Minibar, Khăn tắm/Bộ khăn trải giường (có thu phí), Sàn trải thảm, Ấm đun nước điện, Bàn ghế ngoài trời, Khu vực ăn uống ngoài trời, Sân trong, Truyền hình cáp, Hồ bơi riêng, Máy sấy quần áo, Tủ hoặc phòng để quần áo, Lò nướng, Bếp nấu, Tiện nghi BBQ, Khu vực phòng ăn, Bàn ăn, Các tầng trên đi lên bằng thang máy, Căn hộ riêng trong tòa nhà, Giá treo quần áo, Giường xếp, Giá phơi quần áo, Giấy vệ sinh, Giường sofa, Xe lăn có thể đi đến mọi nơi trong toàn bộ khuôn viên, Thiết bị báo carbon monoxide, Nước rửa tay, Máy điều hòa độc lập cho từng phòng"
                />
                <Item
                  title="Chi tiết chủ đề"
                  description={<Button type="link">Xem chi tiết</Button>}
                />
                <Item
                  title="Chi tiết gói dịch vụ"
                  description={<Button type="link">Xem chi tiết</Button>}
                />
                <Item
                  title="Chi tiết nâng cấp dịch vụ"
                  description={<Button type="link">Xem chi tiết</Button>}
                />
                <Item
                  title="Thông tin của bé"
                  description={
                    <Space
                      className="mb-5 w-full border"
                      direction="vertical"
                      size={"small"}
                    >
                      <ChildItem
                        title="Tên của bé:"
                        description="Võ Ngọc Nhi"
                      />
                      <ChildItem
                        title="Ngày sinh của bé:"
                        description="09-10-2017"
                      />
                    </Space>
                  }
                />
                <Item
                  title="Thông tin cá nhân"
                  description={
                    <Space
                      className="h-40 w-full border"
                      direction="vertical"
                      size={"small"}
                    >
                      <ChildItem
                        title="Tên của bạn:"
                        description="Võ Thanh Duy"
                      />
                      <ChildItem
                        title="Email của bạn:"
                        description="duybpz@gmail.com"
                      />
                      <ChildItem
                        title="Số điện thoại:"
                        description="0334416510"
                      />
                    </Space>
                  }
                />
              </Space>
            </Space>
          </div>
          <div className="w-1/3" style={{ borderWidth: 2 }}>
            <div className="h-50 rounded-lg p-6 shadow">
              <Typography.Title
                style={{ color: "rgb(41 182 246 / var(--tw-bg-opacity))" }}
                className="m-0"
                level={4}
              >
                Thông tin liên hệ
              </Typography.Title>
              <Space direction="vertical">
                <div className="text-gray-600">Hotline: 0909900009</div>
                <div className="text-gray-600">Fanpage: lovekids@123</div>
                <div className="text-gray-600">Email: lovekids@gmail.com</div>
              </Space>
            </div>
          </div>
        </Flex>
      </div>
    </div>
  );
}
