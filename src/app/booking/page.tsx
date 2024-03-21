"use client";;
import * as React from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  DatePicker,
  DatePickerProps,
  Descriptions,
  DescriptionsProps,
  Divider,
  Flex,
  Form,
  Row,
  Space,
  Tooltip,
  Typography,
  message,
} from "antd";
import VenueList from "@/components/booking/VenueList";
import PackageList from "@/components/booking/PackageList";
import ThemeList from "@/components/booking/ThemeList";
import AuthGuard from "../AuthGuard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllVenueCheckSlotByDate } from "@/lib/features/action/venue.action";
import { useBookingContext } from "@/context/BookingContext";
import { EyeOutlined } from "@ant-design/icons";
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
  const loadingCreatePartyBooking = useAppSelector(
    (state) => state.partyBookingReducer.loading,
  );

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
          <Typography.Title className="mb-5">
            Các bước tạo bữa tiệc
          </Typography.Title>
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
                  <Button
                    loading={loadingCreatePartyBooking}
                    type="primary"
                    onClick={handleNext}
                  >
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
