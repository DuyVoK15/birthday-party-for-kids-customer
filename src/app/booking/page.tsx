"use client";
import * as React from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  DatePickerProps,
  Descriptions,
  DescriptionsProps,
  Divider,
  Flex,
  Form,
  Modal,
  Row,
  Space,
  Spin,
  Steps,
  Tooltip,
  Typography,
  message,
  theme,
} from "antd";
import VenueList from "@/components/booking/VenueList";
import PackageList from "@/components/booking/PackageList";
import ThemeList from "@/components/booking/ThemeList";
import AuthGuard from "../AuthGuard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllVenueCheckSlotByDate } from "@/lib/features/action/venue.action";
import { useBookingContext } from "@/context/BookingContext";
import Meta from "antd/es/card/Meta";
import { PlusOneOutlined } from "@mui/icons-material";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { getAllService } from "@/lib/features/action/service.action";
import ServiceCards from "../service-cards";
import { Box, Container, Step, StepLabel, Stepper } from "@mui/material";
import { getAllThemeInVenueByVenueId } from "@/lib/features/action/theme.action";
import { getAllPackageInVenueByVenueId } from "@/lib/features/action/package.action";
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormText,
} from "@ant-design/pro-components";
import { createPartyBooking } from "@/lib/features/action/partyBooking.action";

const { Title } = Typography;
const steps = [
  "Pick Date & Venue",
  "Select theme",
  "Select package",
  "Upgrage service",
  "Fill information",
  "Confirm & Payment",
];

const data = [
  {
    venueName: "Kid Palace Quận 1 TP.HCM",
    venueImgUrl: "/image/kids-palace.jpeg",
    location: "123 Đường ABC, Quận 1, TP.HCM",
    capacity: 100,
    status: "Trống lịch",
    description:
      "Kid Palace Quận 1 TP.HCM là một trung tâm giáo dục và giải trí cho trẻ em. Với không gian rộng rãi và đầy màu sắc, đây là nơi lý tưởng cho các buổi tiệc và sự kiện dành cho trẻ em. Cơ sở này có sức chứa lên đến 100 người và hiện đang có lịch trống.",
  },
  {
    venueName: "Kid Palace Quận 2 TP.HCM",
    venueImgUrl: "/image/kids-palace.jpeg",
    location: "456 Đường XYZ, Quận 2, TP.HCM",
    capacity: 50,
    status: "Trống lịch",
    description:
      "Kid Palace Quận 2 TP.HCM là một điểm đến thú vị cho trẻ em ở khu vực. Với không gian nhỏ hơn so với cơ sở ở Quận 1 nhưng vẫn rất thú vị. Hiện tại, cơ sở này có sức chứa 50 người và có lịch trống cho các sự kiện.",
  },
  {
    venueName: "Kid Palace Quận 3 TP.HCM",
    venueImgUrl: "/image/kids-palace.jpeg",
    location: "789 Đường LMN, Quận 3, TP.HCM",
    capacity: 20,
    status: "Đã có người đặt",
    description:
      "Kid Palace Quận 3 TP.HCM là một điểm đến phổ biến cho các buổi tiệc và sinh nhật cho trẻ em. Hiện cơ sở này đã có người đặt và không còn lịch trống cho đến thời điểm hiện tại.",
  },
  {
    venueName: "Kid Palace Quận 4 TP.HCM",
    venueImgUrl: "/image/kids-palace.jpeg",
    location: "321 Đường PQR, Quận 4, TP.HCM",
    capacity: 30,
    status: "Trống lịch",
    description:
      "Kid Palace Quận 4 TP.HCM là một điểm đến tuyệt vời cho các hoạt động giáo dục và giải trí cho trẻ em. Cơ sở này có sức chứa 30 người và hiện đang có lịch trống.",
  },
  {
    venueName: "Kid Palace Quận 5 TP.HCM",
    venueImgUrl: "/image/kids-palace.jpeg",
    location: "654 Đường UVW, Quận 5, TP.HCM",
    capacity: 80,
    status: "Đã có người đặt",
    description:
      "Kid Palace Quận 5 TP.HCM là một trung tâm giáo dục và giải trí cho trẻ em nổi tiếng ở khu vực. Cơ sở này có sức chứa 80 người và hiện đã có người đặt sử dụng cho một sự kiện.",
  },
  {
    venueName: "Kid Palace Quận 6 TP.HCM",
    venueImgUrl: "/image/kids-palace.jpeg",
    location: "654 Đường UVW, Quận 5, TP.HCM",
    capacity: 80,
    status: "Đã có người đặt",
    description:
      "Kid Palace Quận 6 TP.HCM là một điểm đến phổ biến cho các buổi tiệc và sinh nhật cho trẻ em. Cơ sở này có sức chứa 80 người và hiện đã có người đặt sử dụng cho một sự kiện.",
  },
  {
    venueName: "Kid Palace Quận 7 TP.HCM",
    venueImgUrl: "/image/kids-palace.jpeg",
    location: "654 Đường UVW, Quận 5, TP.HCM",
    capacity: 80,
    status: "Đã có người đặt",
    description:
      "Kid Palace Quận 7 TP.HCM là một điểm đến thú vị cho trẻ em ở khu vực. Cơ sở này có sức chứa 80 người và hiện đã có người đặt sử dụng cho một sự kiện.",
  },
  {
    venueName: "Kid Palace Quận 8 TP.HCM",
    venueImgUrl: "/image/kids-palace.jpeg",
    location: "654 Đường UVW, Quận 5, TP.HCM",
    capacity: 80,
    status: "Đã có người đặt",
    description:
      "Kid Palace Quận 8 TP.HCM là một điểm đến thú vị cho trẻ em và gia đình. Cơ sở này có sức chứa 80 người và hiện đã có người đặt sử dụng cho một sự kiện.",
  },
];

const packageData = [
  {
    PackageImgUrl: "/image/package-basic-1.png",
    Capacity: "Sức chứa: từ 1 - 30 người",
    PackageName: "Gói tiệc sinh nhật BASIC 1",
    Price: "2 triệu VNĐ",
    PackageDescription:
      "Gói BASIC bao gồm các dịch vụ trang trí, thức ăn, chương trình ca nhạc,.....",
  },
  {
    PackageImgUrl: "/image/package-basic-1.png",
    Capacity: "Sức chứa: từ 1 - 30 người",
    PackageName: "Gói tiệc sinh nhật BASIC 2",
    Price: "2 triệu VNĐ",
    PackageDescription:
      "Gói BASIC bao gồm các dịch vụ trang trí, thức ăn, chương trình ca nhạc,.....",
  },
  {
    PackageImgUrl: "/image/package-basic-1.png",
    Capacity: "Sức chứa: từ 1 - 30 người",
    PackageName: "Gói tiệc sinh nhật BASIC 3",
    Price: "2 triệu VNĐ",
    PackageDescription:
      "Gói BASIC bao gồm các dịch vụ trang trí, thức ăn, chương trình ca nhạc,.....",
  },
  {
    PackageImgUrl: "/image/package-basic-1.png",
    Capacity: "Sức chứa: từ 1 - 50 người",
    PackageName: "Gói tiệc sinh nhật VIP 1",
    Price: "5 triệu VNĐ",
    PackageDescription:
      "Gói VIP bao gồm các dịch vụ trang trí, thức ăn, chương trình ca nhạc,.....",
  },
  {
    PackageImgUrl: "/image/package-basic-1.png",
    Capacity: "Sức chứa: từ 1 - 50 người",
    PackageName: "Gói tiệc sinh nhật VIP 2",
    Price: "5 triệu VNĐ",
    PackageDescription:
      "Gói VIP bao gồm các dịch vụ trang trí, thức ăn, chương trình ca nhạc,.....",
  },
  {
    PackageImgUrl: "/image/package-basic-1.png",
    Capacity: "Sức chứa: từ 1 - 50 người",
    PackageName: "Gói tiệc sinh nhật VIP 3",
    Price: "5 triệu VNĐ",
    PackageDescription:
      "Gói VIP bao gồm các dịch vụ trang trí, thức ăn, chương trình ca nhạc,.....",
  },
];

const themeData = [
  {
    ThemeName: "Chủ đề Công Chúa Hitler",
    ThemeDescription:
      "Bữa tiệc với đề tài Hoàng Tử và Công Chúa, trang trí theo phong cách cổ điển và đầy mơ mộng.",
    ThemeImgUrl:
      "https://file.hstatic.net/1000246347/file/8_party_favors_cake_booths_010d4db7c3864dfab89e3deefa649180_1024x1024.jpg",
  },
  {
    ThemeName: "Chủ đề Spiderman",
    ThemeDescription:
      "Bữa tiệc sôi động với đề tài Siêu Nhân, trang trí theo phong cách hiện đại và đầy năng động.",
    ThemeImgUrl:
      "https://sinhnhatbaby.vn/files/media/202211/55759981_2638231459526292_5824199296618070016_o.jpg",
  },
  {
    ThemeName: "Chủ đề Marvel Tổng Hợp",
    ThemeDescription:
      "Bữa tiệc trong không gian hành tinh xanh, trang trí với đủ các yếu tố thiên nhiên và sinh động.",
    ThemeImgUrl:
      "https://cocoparty.vn/wp-content/uploads/2021/03/trang-tri-tiec-sinh-nhat-chu-de-marval-be-chris-dominic-1-1-1024x640.jpg",
  },
  {
    ThemeName: "Chủ đề Anh Hùng DC",
    ThemeDescription:
      "Bữa tiệc phiêu lưu với đề tài Hải Tặc, trang trí theo phong cách vùng biển rộng lớn.",
    ThemeImgUrl:
      "https://decorbirthday.com/wp-content/uploads/2023/03/Trang-tri-sinh-nhat-chu-de-sieu-anh-hung.jpg",
  },
  {
    ThemeName: "Chủ đề Các Chú Khủng Long",
    ThemeDescription:
      "Bữa tiệc lấp lánh với đèn đóm vàng, trang trí theo phong cách ngôi sao sáng.",
    ThemeImgUrl:
      "https://www.partydesign.vn/wp-content/uploads/2019/02/trang-tri-sinh-nhat-khung-long-dino.jpg",
  },
];

export default function Booking() {
  const { bookingData, setBookingData, services, setServices, venue } =
    useBookingContext();

  const [dateQuery, setDateQuery] = React.useState<string>("");
  let total = 0;
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    const partDate = date?.format("YYYY-MM-DD");
    setDateQuery(partDate || "");
    setBookingData((prev) => ({
      ...prev,
      date: partDate,
    }));
  };

  // Dispatch API
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const venueCheckSlotByDateList = useAppSelector(
    (state) => state.venueReducer.venueCheckSlotByDateList,
  );
  const serviceList = useAppSelector(
    (state) => state.serviceReducer.serviceList,
  );
  const loading = useAppSelector((state) => state.venueReducer.loading);

  const fetchVenueCheckSlotByDate = async () => {
    await dispatch(getAllVenueCheckSlotByDate(dateQuery));
  };

  const fetchAllService = async () => {
    await dispatch(getAllService());
  };
  React.useEffect(() => {
    fetchAllService();
  }, []);

  console.log(serviceList);
  // ** Hook

  React.useEffect(() => {
    fetchVenueCheckSlotByDate();
  }, [dateQuery]);
  console.log(bookingData);

  // Components

  const fetchAllThemeInVenue = async () => {
    if (venue?.id !== undefined) {
      await dispatch(getAllThemeInVenueByVenueId(venue?.id)).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    }
  };
  const fetchAllPackageInVenue = async () => {
    if (venue?.id !== undefined) {
      await dispatch(getAllPackageInVenueByVenueId(venue?.id)).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    }
  };

  const createOnePartyBooking = async () => {
    try {
      if (bookingData !== null) {
        const res = await dispatch(createPartyBooking(bookingData));
        if (res?.meta?.requestStatus === "fulfilled") {
          return true;
        }
        return false;
      }
    } catch (error: any) {
      message.error(error);
    }
  };

  // Steps component
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return null;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep + 1 === 6) {
      const result = await createOnePartyBooking();
      if (result) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
      scrollToTop();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }

    switch (activeStep + 1) {
      case 1:
        fetchAllThemeInVenue();
        scrollToTop();
        break;
      case 2:
        fetchAllPackageInVenue();
        scrollToTop();
        break;
      case 3:
        scrollToTop();
        break;
      case 4:
        scrollToTop();
        break;
      case 5:
        scrollToTop();
        break;

      default:
        break;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  console.log(bookingData);

  function scrollToTop() {
    window.scrollTo(0, 0);

    return null;
  }

  const [form] = Form.useForm();
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Venue",
      children: (
        <Space>
          <Typography>{venue?.venueName || "venue name"}</Typography>
          <Tooltip>
            <a>{venue?.location || "location"}</a>
          </Tooltip>
        </Space>
      ),
    },
    {
      key: "2",
      label: "Theme",
      children: (
        <ModalForm
          title="Theme"
          trigger={
            <Button type="primary">
              <EyeOutlined />
              View theme
            </Button>
          }
          form={form}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log("run"),
          }}
          submitTimeout={2000}
          onFinish={async (values) => {
            return true;
          }}
        ></ModalForm>
      ),
    },
    {
      key: "3",
      label: "Package",
      children: (
        <ModalForm
          title="Package"
          trigger={
            <Button type="primary">
              <EyeOutlined />
              View package
            </Button>
          }
          form={form}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log("run"),
          }}
          submitTimeout={2000}
          onFinish={async (values) => {
            return true;
          }}
        ></ModalForm>
      ),
    },
    {
      key: "4",
      label: "Order time",
      children: "07:00:00",
    },
    {
      key: "5",
      label: "Usage Time",
      span: 2,
      children: "07:00:00",
    },
    {
      key: "6",
      label: "Status",
      span: 3,
      children: <Badge status={"success"} text={"Ai biết"} />,
    },
    {
      key: "7",
      label: "Negotiated Amount",
      children: (80000000).toLocaleString(),
    },
    {
      key: "8",
      label: "Discount",
      children: (0).toLocaleString(),
    },
    {
      key: "9",
      label: "Official Receipts",
      children: (80000000).toLocaleString(),
    },
    {
      key: "10",
      label: "Booking Info",
      children: (
        <>
          `Tên người đặt: ${userInfo?.data?.fullName}`
          <br />
          `Email: ${bookingData?.email}`
          <br />
          `Số điện thoại: ${bookingData?.email}`
          <br />
          `Tên của bé: ${bookingData?.phone}`
          <br />
          `Ngày sinh nhật của bé: ${bookingData?.kidDOB}`
        </>
      ),
    },
  ];

  return (
    <AuthGuard>
      <div className="container mx-auto mt-10">
        <Box sx={{ width: "100%" }}>
          <Typography.Title className="mb-5">Các bước tạo bữa tiệc</Typography.Title>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = <Typography>Optional</Typography>;
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Container maxWidth="sm">
                <Typography>
                  Đặt bữa tiệc thành công! Hãy kiểm tra thông tin đặt tiệc của
                  bạn ở mục Booking!
                </Typography>
              </Container>

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>OK</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep + 1 === 1 ? (
                <>
                  <Title level={3}>Pick a date</Title>
                  <DatePicker
                    format="YYYY-MM-DD"
                    // disabledDate={disabledDate}
                    // disabledTime={disabledDateTime}
                    // showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                    onChange={onChange}
                  />

                  <div>
                    <Title level={3}>Choose venue & slot</Title>
                    <div className="mt-0">
                      <VenueList
                        loading={loading}
                        venues={venueCheckSlotByDateList}
                      />
                    </div>
                  </div>
                </>
              ) : activeStep + 1 === 2 ? (
                <React.Fragment>
                  <Title level={3}>Chọn chủ đề</Title>
                  <div className="mt-10">
                    <ThemeList />
                  </div>
                </React.Fragment>
              ) : activeStep + 1 === 3 ? (
                <React.Fragment>
                  <Title level={3}>Chọn gói dịch vụ</Title>
                  <div className="mt-10">
                    <PackageList />
                  </div>
                </React.Fragment>
              ) : activeStep + 1 === 4 ? (
                <div className="mt-10 w-full">
                  <Title level={3}>Upgrade services</Title>
                  <Flex gap={10} justify="space-between">
                    <Row style={{ width: 280 * 3 + 50 }} gutter={[16, 16]}>
                      <ServiceCards serviceList={serviceList} />
                    </Row>
                    <Flex vertical gap={15}>
                      {services.map((item, index) => {
                        total += item?.service?.pricing * item?.count;
                        return (
                          <Card key={index}>
                            <Flex gap={20}>
                              <Avatar
                                style={{ width: 50, height: 50 }}
                                src={item?.service?.serviceImgUrl}
                              />
                              <div>
                                <div>
                                  Name:{" "}
                                  <strong>{item?.service?.serviceName}</strong>
                                </div>
                                <div>
                                  Amout: <strong>{item?.count}</strong>
                                </div>
                                <div>
                                  Price:{" "}
                                  <strong>
                                    {(
                                      item?.service?.pricing * item?.count
                                    ).toLocaleString() + " VNĐ"}
                                  </strong>
                                </div>
                              </div>
                            </Flex>
                          </Card>
                        );
                      })}
                      {total > 0 && (
                        <React.Fragment>
                          {" "}
                          <Divider />
                          <Flex justify="space-between">
                            <div>Total:</div>
                            <div>
                              <strong>{total.toLocaleString() + "VNĐ"}</strong>
                            </div>
                          </Flex>
                        </React.Fragment>
                      )}
                    </Flex>
                  </Flex>
                </div>
              ) : activeStep + 1 === 5 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // height: "100vh",
                  }}
                >
                  <ProForm
                    style={{
                      width: "auto",
                      margin: "auto",
                      padding: 40,
                    }}
                    onFinish={async ({
                      kidName,
                      kidDOB,
                      email,
                      phone,
                    }: {
                      kidName: string;
                      kidDOB: string;
                      email: string;
                      phone: string;
                    }) => {
                      console.log(kidName, kidDOB, email, phone);
                      setBookingData((prev) => ({
                        ...prev,
                        kidName,
                        kidDOB,
                        email,
                        phone,
                      }));
                      handleNext();
                    }}

                    // submitter={{submitButtonProps:{style: {alignSelf: 'center'}}, resetButtonProps: {style: {}}}}
                  >
                    <ProForm.Group>
                      <ProFormText
                        name={"kidName"}
                        label={"Tên của bé"}
                        width={"sm"}
                        placeholder={"Điền tên của bé"}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập trường này",
                          },
                        ]}
                      />
                      <ProFormDatePicker
                        name={"kidDOB"}
                        label={"Ngày sinh nhật của bé"}
                        width={"sm"}
                        placeholder={"Điền sinh nhật của bé"}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập trường này",
                          },
                        ]}
                      />
                    </ProForm.Group>
                    <ProForm.Group>
                      <ProFormText
                        name={"email"}
                        label={"Email của bạn"}
                        width={"sm"}
                        placeholder={"Email của bạn"}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập trường này",
                          },
                        ]}
                      />
                      <ProFormText
                        name={"phone"}
                        label={"Số điện thoại của bạn"}
                        width={"sm"}
                        placeholder={"Số điện thoại của bạn"}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập trường này",
                          },
                        ]}
                      />
                    </ProForm.Group>
                  </ProForm>
                </div>
              ) : (
                <Descriptions
                  className="m-5 mt-10"
                  items={items}
                  layout="vertical"
                  bordered
                />
              )}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip}>
                    Skip
                  </Button>
                )}
                {activeStep + 1 !== 5 && (
                  <Button type="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </AuthGuard>
  );
}
