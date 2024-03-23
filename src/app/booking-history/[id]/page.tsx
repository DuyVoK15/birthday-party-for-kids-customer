"use client";
import PackageInVenueDetail from "@/components/booking/PackageInVenueDetail";
import ThemeInVenueDetail from "@/components/booking/ThemeInVenueDetail";
import UpgradeServiceBookingDetail from "@/components/booking/UpgradeServiceBookingDetail";
import { getBookingById } from "@/lib/features/action/partyBooking.action";
import { createPaymentByBookingId } from "@/lib/features/action/payment.action";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { formatDateto } from "@/utils/format";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import {
  Avatar,
  Button,
  Divider,
  Empty,
  Flex,
  Image,
  Skeleton,
  Space,
  Typography,
  message,
} from "antd";
import { redirect, useRouter } from "next/navigation";
import * as React from "react";

export const Item = ({
  title,
  description,
  align,
}: {
  title: string;
  description: string | React.ReactNode;
  align?: any;
}) => {
  return (
    <Flex align={align} gap={100} justify="space-between">
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
export default function BookingDetail({ params }: { params: any }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.partyBookingReducer.loading);
  const booking = useAppSelector(
    (state) => state.partyBookingReducer.bookingById,
  );

  const fetchBookingById = async () => {
    await dispatch(getBookingById(params?.id)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  React.useEffect(() => {
    fetchBookingById();
  }, []);

  const createOnePayment = async () => {
    const res = await dispatch(createPaymentByBookingId(params?.id));
    if (res?.meta?.requestStatus === "fulfilled") {
      const url = res?.payload as string;
      window.open(url);
    } else {
      message.error("Lỗi khi thanh toán!");
    }
  };

  if (loading) {
    return (
      <React.Fragment>
        <Skeleton className="container mx-auto mt-10" active />
        <Skeleton className="container mx-auto" active />
        <Skeleton className="container mx-auto" active />
        <Skeleton className="container mx-auto" active />
        <Skeleton className="container mx-auto" active />
        <Skeleton className="container mx-auto" active />
      </React.Fragment>
    );
  }

  if (booking === null) {
    return (
      <React.Fragment>
        <Empty className="p-20" />
      </React.Fragment>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="">
        <Flex justify="space-between" gap={30}>
          <div className="w-3/4">
            <Space
              style={{ width: "100%" }}
              direction="vertical"
              size={"large"}
            >
              <Typography.Title
                style={{
                  color: booking?.status === "PENDING" ? "red" : "green",
                  margin: 0,
                }}
                level={5}
              >
                {booking?.status === "PENDING" ? "Chờ xác nhận" : "Đã xác nhận"}
              </Typography.Title>
              <Typography.Title style={{ margin: 0 }} level={3}>
                {booking?.status === "PENDING"
                  ? "Bữa tiệc của bạn đang chờ được Xác Nhận"
                  : "Bữa tiệc đã được xác nhận"}
              </Typography.Title>

              <Space direction="vertical" size={"middle"}>
                <Flex align="start" gap={20}>
                  <CalendarOutlined style={{ fontSize: 30 }} />
                  <Flex vertical gap={4}>
                    <div>Thời gian check-in</div>
                    <div className="font-bold">
                      {formatDateto(
                        booking?.slotInVenueObject?.partyDated?.date,
                      )}
                    </div>
                    <div className="text-sm font-thin text-gray-700">
                      {`vào lúc ${booking?.slotInVenueObject?.slot?.timeStart}`}
                    </div>
                  </Flex>
                  <Divider className="mx-0 mt-2 h-16" type="vertical" />
                  <Flex vertical gap={4}>
                    <div>Thời gian check-out</div>
                    <div className="font-bold">
                      {formatDateto(
                        booking?.slotInVenueObject?.partyDated?.date,
                      )}
                    </div>
                    <div className="text-sm font-thin text-gray-700">
                      {`vào lúc ${booking?.slotInVenueObject?.slot?.timeEnd}`}
                    </div>
                  </Flex>
                </Flex>

                <Flex align="start" gap={20}>
                  <EnvironmentOutlined style={{ fontSize: 30 }} />
                  <Flex vertical gap={4}>
                    <div className="font-bold">Địa chỉ</div>
                    <div className="text-sm font-thin text-gray-700">
                      {booking?.venue?.location}
                    </div>
                  </Flex>
                </Flex>
              </Space>

              <Typography.Title style={{ margin: 0 }} level={3}>
                Chi tiết của bữa tiệc
              </Typography.Title>
              <Space className="w-full" direction="vertical" size={"middle"}>
                <Flex align="center" justify="space-between" gap={20}>
                  <Space size={"large"}>
                    <Image
                      width={100}
                      height={100}
                      className="rounded-xl"
                      src={booking?.venue?.venueImgUrl}
                    />
                    <Space direction="vertical">
                      <Typography.Title className="m-0 font-bold" level={4}>
                        {booking?.venue?.venueName}
                      </Typography.Title>
                      <div className="text-sm font-thin text-gray-700">
                        {booking?.venue?.location}
                      </div>
                    </Space>
                  </Space>

                  <Button type="link">Xem đường đi</Button>
                </Flex>
                <Item
                  title="Tên khách hàng"
                  description={booking?.account?.fullName}
                />
                <Item
                  title="Sức chứa tối đa"
                  description={`${booking?.venue?.capacity} người`}
                />
                <Item
                  title="Chi tiết địa điểm"
                  description={booking?.venue?.venueDescription}
                />
                <Item
                  title="Chi tiết chủ đề"
                  description={
                    <ModalForm
                      title="Chủ đề đã chọn"
                      trigger={
                        <Button style={{ padding: 0 }} type="link">
                          <EyeOutlined />
                          Xem chi tiết
                        </Button>
                      }
                      style={{ padding: 0 }}
                    >
                      <ThemeInVenueDetail
                        themeInVenue={booking?.themeInVenue}
                      />
                    </ModalForm>
                  }
                  align={"center"}
                />
                <Item
                  title="Chi tiết gói dịch vụ"
                  description={
                    <ModalForm
                      title="Gói dịch vụ đã chọn"
                      trigger={
                        <Button style={{ padding: 0 }} type="link">
                          <EyeOutlined />
                          Xem chi tiết
                        </Button>
                      }
                      style={{ padding: 0 }}
                    >
                      <PackageInVenueDetail
                        packageInVenue={booking?.packageInVenue}
                      />
                    </ModalForm>
                  }
                  align={"center"}
                />
                <Item
                  title="Chi tiết nâng cấp dịch vụ"
                  description={
                    <ModalForm
                      title="Dịch vụ đã nâng cấp"
                      trigger={
                        <Button style={{ padding: 0 }} type="link">
                          <EyeOutlined />
                          Xem chi tiết
                        </Button>
                      }
                      style={{ padding: 0 }}
                    >
                      <UpgradeServiceBookingDetail
                        upgradeServices={booking?.upgradeServices}
                      />
                    </ModalForm>
                  }
                  align={"center"}
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
                        description={booking?.kidName}
                      />
                      <ChildItem
                        title="Ngày sinh của bé:"
                        description={booking?.kidDOB}
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
                        description={booking?.account?.fullName}
                      />
                      <ChildItem
                        title="Email của bạn:"
                        description={booking?.email}
                      />
                      <ChildItem
                        title="Số điện thoại:"
                        description={booking?.phone}
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
            <div className="h-50 mt-5 rounded-lg p-6 shadow">
              <Typography.Title
                style={{ color: "rgb(41 182 246 / var(--tw-bg-opacity))" }}
                className="m-0"
                level={4}
              >
                Xác nhận thanh toán
              </Typography.Title>
              <Space direction="vertical">
                {booking?.status === "CONFIRMED" ? (
                  <Typography.Title
                    style={{ color: "green" }}
                    className="m-0"
                    level={5}
                  >
                    Đã thanh toán
                  </Typography.Title>
                ) : (
                  <Button type="primary" onClick={createOnePayment}>
                    Thanh toán
                  </Button>
                )}
              </Space>
            </div>
          </div>
        </Flex>
      </div>
    </div>
  );
}
