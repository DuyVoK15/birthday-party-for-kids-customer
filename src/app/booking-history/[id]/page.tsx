"use client";
import { ChildItem, Item } from "@/components/booking/Item";
import PackageDetail from "@/components/booking/PackageDetail";
import PackageInVenueDetail from "@/components/booking/PackageInVenueDetail";
import ThemeInVenueDetail from "@/components/booking/ThemeInVenueDetail";
import UpgradeServiceBookingDetail from "@/components/booking/UpgradeServiceBookingDetail";
import {
  createInquiryForChangePackageInVenue,
  createInquiryForChangeThemeInVenue,
} from "@/lib/features/action/inquiry.action";
import {
  cancelBooking,
  getBookingById,
} from "@/lib/features/action/partyBooking.action";
import { createPaymentByBookingId } from "@/lib/features/action/payment.action";
import { createReview } from "@/lib/features/action/review.action";
import { getAllThemeInVenueNotChoose } from "@/lib/features/action/theme.action";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { formatDateto } from "@/utils/format";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import {
  ModalForm,
  ProFormCheckbox,
  ProFormRadio,
} from "@ant-design/pro-components";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Empty,
  Flex,
  Form,
  Image,
  Input,
  Popconfirm,
  Rate,
  Skeleton,
  Space,
  Typography,
  message,
} from "antd";
import { redirect, useRouter } from "next/navigation";
import * as React from "react";

export default function BookingDetail({ params }: { params: any }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.partyBookingReducer.loading);
  const booking = useAppSelector(
    (state) => state.partyBookingReducer.bookingById,
  );
  const themeInVenueNotChooseList = useAppSelector(
    (state) => state.themeReducer.themeInVenueNotChooseList,
  );

  const fetchBookingById = async () => {
    await dispatch(getBookingById(params?.id)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };



  const fetchInQueue = async () => {
    await fetchBookingById();
  };

  React.useEffect(() => {
    fetchInQueue();
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

  const createOneInquiryForChangeThemeInVenue = async (id: number) => {
    if (typeof booking?.id !== "undefined") {
      const res = await dispatch(
        createInquiryForChangeThemeInVenue({
          bookingId: booking?.id,
          themeInVenueId: id,
        }),
      );
      if (res?.meta?.requestStatus === "fulfilled") {
        message.success("Gửi yêu cầu thay đổi chủ đề thành công!");
        return true;
      } else {
        message.error("Lỗi khi gửi yêu cầu!");
        return false;
      }
    }
  };

  const createOneInquiryForChangePackageInVenue = async (id: number) => {
    if (typeof booking?.id !== "undefined") {
      const res = await dispatch(
        createInquiryForChangePackageInVenue({
          bookingId: booking?.id,
          packageInVenueId: id,
        }),
      );
      if (res?.meta?.requestStatus === "fulfilled") {
        message.success("Gửi yêu cầu thay đổi gói dịch vụ thành công!");
        return true;
      } else {
        message.error("Lỗi khi gửi yêu cầu!");
        return false;
      }
    }
  };

  const createOneReview = async (request: {
    id: number;
    payload: {
      reviewMessage: string;
      rating: number;
    };
  }) => {
    if (typeof booking?.id !== "undefined") {
      const res = await dispatch(createReview(request));
      if (res?.meta?.requestStatus === "fulfilled") {
        message.success("Gửi đánh giá đi thành công!");
        await fetchBookingById();
        return true;
      } else {
        message.error("Lỗi khi gửi yêu cầu!");
        return false;
      }
    }
  };

  const cancelOneBooking = async (id: number) => {
    const res = await dispatch(cancelBooking(id));
    if (res?.meta?.requestStatus === "fulfilled") {
      await fetchBookingById();
      message.success("Cancel booking success!");
      return true;
    } else {
      message.error(res?.payload?.message);
      return false;
    }
  };

  if (loading || booking === null) {
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

  // if (booking === null) {
  //   return (
  //     <React.Fragment>
  //       <Empty className="p-20" />
  //     </React.Fragment>
  //   );
  // }

  return booking !== null ? (
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
                  color:
                    booking?.status === "PENDING"
                      ? "blue"
                      : booking?.status === "CANCELLED"
                        ? "red"
                        : booking?.status === "COMPLETED"
                          ? "green"
                          : "orange",
                  margin: 0,
                }}
                level={5}
              >
                {booking?.status === "PENDING"
                  ? "Đang chờ xác nhận"
                  : booking?.status === "CANCELLED"
                    ? "Đã huỷ"
                    : booking?.status === "COMPLETED"
                      ? "Đã hoàn thành"
                      : "Đã được xác nhận"}
              </Typography.Title>

              <Typography.Title style={{ margin: 0 }} level={3}>
                {booking?.status === "PENDING"
                  ? "Bữa tệc của bạn đang chờ xác nhận"
                  : booking?.status === "CANCELLED"
                    ? "Bữa tiệc của bạn đã bị huỷ"
                    : booking?.status === "COMPLETED"
                      ? "Bữa tiệc của bạn đã hoàn thành"
                      : "Bữa tiệc của bạn đã được xác nhận"}
              </Typography.Title>

              <Space direction="vertical" size={"middle"}>
                <Flex align="start" gap={20}>
                  <CalendarOutlined style={{ fontSize: 30 }} />
                  <Flex vertical gap={4}>
                    <div>Thời gian check-in</div>
                    <div className="font-bold">
                      {formatDateto(
                        booking?.date
                      )}
                    </div>
                    <div className="text-sm font-thin text-gray-700">
                      {`vào lúc ${booking?.slotInRoom?.slot?.timeStart}`}
                    </div>
                  </Flex>
                  <Divider className="mx-0 mt-2 h-16" type="vertical" />
                  <Flex vertical gap={4}>
                    <div>Thời gian check-out</div>
                    <div className="font-bold">
                      {formatDateto(
                        booking?.date
                      )}
                    </div>
                    <div className="text-sm font-thin text-gray-700">
                      {`vào lúc ${booking?.slotInRoom?.slot?.timeEnd}`}
                    </div>
                  </Flex>
                </Flex>

                <Flex align="start" gap={20}>
                  <EnvironmentOutlined style={{ fontSize: 30 }} />
                  <Flex vertical gap={4}>
                    <div className="font-bold">Địa chỉ</div>
                    <div className="text-sm font-thin text-gray-700">
                      {booking?.venueObject?.district}
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
                      src={booking?.venueObject?.venueImgUrl ?? ""}
                    />
                    <Space direction="vertical">
                      <Typography.Title className="m-0 font-bold" level={4}>
                        {booking?.venueObject?.venueName}
                      </Typography.Title>
                      <div className="text-sm font-thin text-gray-700">
                        {booking?.venueObject?.district}
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
                  description={`${booking?.participantAmount} người`}
                />
                <Item
                  title="Chi tiết địa điểm"
                  description={booking?.venueObject?.venueDescription}
                />
                <Item
                  title="Chi tiết gói dịch vụ"
                  description={
                    <Flex gap={5}>
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
                        <PackageDetail
                          packageInVenue={booking?.packageInBookings?.[0]?.apackage}
                        />
                      </ModalForm>
                      {booking?.status === "CONFIRMED" ||
                        (booking?.status === "PENDING" && (
                          <ModalForm
                            title="Các gói dịch vụ khác"
                            trigger={
                              <Button type="link">
                                <SwapOutlined />
                                Gửi yêu cầu thay đổi
                              </Button>
                            }
                            // form={form}
                            autoFocusFirstInput
                            modalProps={{
                              destroyOnClose: true,
                              onCancel: () => console.log("run"),
                            }}
                            onFinish={async (values) => {
                              let result: boolean | undefined = false;
                              result =
                                await createOneInquiryForChangePackageInVenue(
                                  values?.id,
                                );

                              return result;
                            }}
                          >
                            {/* {packageInVenueNotChooseList?.length > 0 ? (
                              <ProFormRadio.Group
                                name="id"
                                layout="horizontal"
                                style={{ marginBottom: 10 }}
                                options={packageInVenueNotChooseList?.map(
                                  (item, index) => ({
                                    label: (
                                      <Card
                                        key={index}
                                        hoverable
                                        style={{ width: 200, marginBottom: 10 }}
                                        cover={
                                          <Image
                                            style={{
                                              width: "100%",
                                              height: 100,
                                              objectFit: "cover",
                                            }}
                                            alt="example"
                                            src={item?.apackage?.packageImgUrl}
                                          />
                                        }
                                      >
                                        <Space direction="vertical">
                                          <Card.Meta
                                            title={item?.apackage?.packageName}
                                          />
                                          <ModalForm
                                            title="Chi tiết gói dịch vụ"
                                            trigger={
                                              <Button
                                                style={{ padding: 0 }}
                                                type="link"
                                              >
                                                <EyeOutlined />
                                                Chi tiết gói dịch vụ
                                              </Button>
                                            }
                                            style={{ padding: 0 }}
                                          >
                                            <PackageInVenueDetail
                                              packageInVenue={item}
                                            />
                                          </ModalForm>
                                        </Space>
                                      </Card>
                                    ),
                                    value: item?.id,
                                  }),
                                )}
                              />
                            ) : (
                              <Empty style={{ margin: "auto" }} />
                            )} */}
                          </ModalForm>
                        ))}
                    </Flex>
                  }
                  align={"center"}
                />
                <Item
                  title="Chi tiết gói dịch vụ"
                  description={
                    <Flex gap={5}>
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
                        <PackageDetail
                          packageInVenue={booking?.packageInBookings?.[1]?.apackage}
                        />
                      </ModalForm>
                      {booking?.status === "CONFIRMED" ||
                        (booking?.status === "PENDING" && (
                          <ModalForm
                            title="Các gói dịch vụ khác"
                            trigger={
                              <Button type="link">
                                <SwapOutlined />
                                Gửi yêu cầu thay đổi
                              </Button>
                            }
                            // form={form}
                            autoFocusFirstInput
                            modalProps={{
                              destroyOnClose: true,
                              onCancel: () => console.log("run"),
                            }}
                            onFinish={async (values) => {
                              let result: boolean | undefined = false;
                              result =
                                await createOneInquiryForChangePackageInVenue(
                                  values?.id,
                                );

                              return result;
                            }}
                          >
                            {/* {packageInVenueNotChooseList?.length > 0 ? (
                              <ProFormRadio.Group
                                name="id"
                                layout="horizontal"
                                style={{ marginBottom: 10 }}
                                options={packageInVenueNotChooseList?.map(
                                  (item, index) => ({
                                    label: (
                                      <Card
                                        key={index}
                                        hoverable
                                        style={{ width: 200, marginBottom: 10 }}
                                        cover={
                                          <Image
                                            style={{
                                              width: "100%",
                                              height: 100,
                                              objectFit: "cover",
                                            }}
                                            alt="example"
                                            src={item?.apackage?.packageImgUrl}
                                          />
                                        }
                                      >
                                        <Space direction="vertical">
                                          <Card.Meta
                                            title={item?.apackage?.packageName}
                                          />
                                          <ModalForm
                                            title="Chi tiết gói dịch vụ"
                                            trigger={
                                              <Button
                                                style={{ padding: 0 }}
                                                type="link"
                                              >
                                                <EyeOutlined />
                                                Chi tiết gói dịch vụ
                                              </Button>
                                            }
                                            style={{ padding: 0 }}
                                          >
                                            <PackageInVenueDetail
                                              packageInVenue={item}
                                            />
                                          </ModalForm>
                                        </Space>
                                      </Card>
                                    ),
                                    value: item?.id,
                                  }),
                                )}
                              />
                            ) : (
                              <Empty style={{ margin: "auto" }} />
                            )} */}
                          </ModalForm>
                        ))}
                    </Flex>
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
            {booking?.status !== "CANCELLED" && (
              <Flex justify="space-between">
                <div></div>
                <Popconfirm
                  title="Action"
                  description="Are you sure to cancel this booking?"
                  onConfirm={() => cancelOneBooking(booking?.id)}
                  onCancel={() => null}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Cancel</Button>
                </Popconfirm>
              </Flex>
            )}
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

              <Flex className="my-5" justify="space-between">
                <Typography style={{ fontSize: 19 }}>Tổng số tiền:</Typography>
                <Typography style={{ fontSize: 19 }} className="font-medium">
                  {(100000000).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Typography>
              </Flex>

              {booking?.status === "PENDING" ? (
                <Space direction="vertical">
                  {booking?.isPayment ? (
                    <Typography.Title
                      style={{ color: "green" }}
                      className="m-0"
                      level={5}
                    >
                      Đã thanh toán
                    </Typography.Title>
                  ) : (
                    <Popconfirm
                      title="Xác nhận thanh toán"
                      description="Bạn có chắc chắn muốn thanh toán?"
                      onConfirm={createOnePayment}
                      onCancel={() => null}
                      okText="Đồng ý"
                      cancelText="Huỷ"
                    >
                      <Button type="primary">Thanh toán</Button>
                    </Popconfirm>
                  )}
                </Space>
              ) : (
                <Typography.Title
                  style={{ color: "red" }}
                  className="m-0"
                  level={5}
                >
                  Đã huỷ
                </Typography.Title>
              )}
            </div>

            {!booking?.review && booking?.status === "COMPLETED" && (
              <div className="h-50 mt-5 rounded-lg p-6 shadow">
                <Typography.Title
                  style={{ color: "rgb(41 182 246 / var(--tw-bg-opacity))" }}
                  className="m-0"
                  level={4}
                >
                  Viết đánh giá
                </Typography.Title>
                <Form
                  onFinish={async (values) => {
                    let result: undefined | boolean = false;
                    if (typeof booking?.id !== "undefined") {
                      result = await createOneReview({
                        id: booking?.id,
                        payload: {
                          reviewMessage: values?.reviewMessage,
                          rating: values?.rating,
                        },
                      });
                    }
                    return result;
                  }}
                >
                  <Form.Item name={"reviewMessage"}>
                    <Input.TextArea placeholder="Viết đánh giá ..." />
                  </Form.Item>
                  <Form.Item name={"rating"}>
                    <Rate />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" type="primary">
                      Gửi đánh giá
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
          </div>
        </Flex>
      </div>
    </div>
  ) : (
    <Empty className="pt-10" />
  );
}
