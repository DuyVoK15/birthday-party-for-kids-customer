"use client";
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
import { BookingRequest, useBookingContext } from "@/context/BookingContext";
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
import { ServiceDataResponse } from "@/dtos/response/service.response";
import { VenueDataResponse } from "@/dtos/response/venue.response";
import dayjs from "dayjs";
import { ThemeInVenueDataResponse } from "@/dtos/response/theme.response";
import { PackageInVenueDataResponse } from "@/dtos/response/package.response";
import { SlotInVenueDataResponse } from "@/dtos/response/slot.response";

const { Title } = Typography;
const steps = [
  "Chọn ngày & địa điểm",
  "Lựa chọn chủ đề",
  "Lựa chọn gói dịch vụ",
  "Nâng cấp dịch vụ",
  "Điền thông tin",
  "Xác nhận & đặt chỗ",
];
export interface DataUpgradeDisplay {
  service: ServiceDataResponse;
  count: number;
}
export interface BookingDataDisplay {
  kidName?: string;
  kidDOB?: string;
  email?: string;
  phone?: string;
  themeInVenue?: ThemeInVenueDataResponse;
  packageInVenue?: PackageInVenueDataResponse;
  slotInVenue?: SlotInVenueDataResponse;
  dataUpgrade?: DataUpgradeDisplay[] | [];
  date?: string;
  totalPriceService?: number;
  totalPriceBooking?: number;
}
export default function Booking() {
  const [bookingData, setBookingData] = React.useState<BookingRequest | null>(
    null,
  );
  const [bookingDataDisplay, setBookingDataDisplay] =
    React.useState<BookingDataDisplay | null>(null);
  const [services, setServices] = React.useState<
    { service: ServiceDataResponse; count: number }[] | []
  >([]);
  const [dataUpgrade, setDataUpgrade] = React.useState<
    { serviceId: number; count: number }[] | []
  >([]);
  const [venue, setVenue] = React.useState<VenueDataResponse | null>(null);
  const [dateQuery, setDateQuery] = React.useState<string>("2024-03-23");
  const [venueList, setVenueList] = React.useState<VenueDataResponse[] | []>(
    [],
  );
  const [totalPriceSerivce, setTotalPriceService] = React.useState(0);
  const [totalPriceBooking, setTotalPriceBooking] = React.useState(0);

  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const loadingCreatePartyBooking = useAppSelector(
    (state) => state.partyBookingReducer.loading,
  );

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (date !== null) {
      const partDate = date.format("YYYY-MM-DD");
      setDateQuery(partDate);
      setBookingData((prev) => ({
        ...prev,
        date: partDate,
      }));
      setBookingDataDisplay((prev) => ({
        ...prev,
        date: partDate,
      }));
    }
  };

  // Dispatch API
  const dispatch = useAppDispatch();

  const fetchVenueCheckSlotByDate = async () => {
    await dispatch(getAllVenueCheckSlotByDate(dateQuery)).then((res: any) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setVenueList(res?.payload?.data);
      } else {
        setVenueList([]);
      }
    });
  };
  console.log("venueList", JSON.stringify(venueList, null, 2));
  const fetchAllService = async () => {
    await dispatch(getAllService());
  };

  // ** Hook
  React.useEffect(() => {
    fetchVenueCheckSlotByDate();
    setBookingData((prev) => ({
      ...prev,
      date: dateQuery,
    }));
    setBookingDataDisplay((prev) => ({
      ...prev,
      date: dateQuery,
    }));
  }, [dateQuery]);

  console.log(bookingData);

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
        fetchAllService();
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
  console.log(bookingDataDisplay);

  function scrollToTop() {
    window.scrollTo(0, 0);

    return null;
  }

  const [form] = Form.useForm();
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Địa điểm",
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
      label: "Chủ đề",
      children: (
        <ModalForm
          title="Chủ đề đã chọn"
          trigger={
            <Button type="primary">
              <EyeOutlined />
              Xem
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
      label: "Gói dịch vụ",
      children: (
        <ModalForm
          title="Gói dịch vụ đã chọn"
          trigger={
            <Button type="primary">
              <EyeOutlined />
              Xem
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
      key: "6",
      label: "Dịch vụ năng cấp",

      children: (
        <ModalForm
          title="Dịch vụ nâng cấp"
          trigger={
            <Button type="primary">
              <EyeOutlined />
              Xem
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
      label: "Thời gian check-in",
      children: bookingDataDisplay?.slotInVenue?.slot?.timeStart,
    },
    {
      key: "5",
      label: "Thời gian check-out",

      children: bookingDataDisplay?.slotInVenue?.slot?.timeEnd,
    },
    {
      key: "7",
      label: "Số tiền hiện tại",
      children: bookingDataDisplay?.totalPriceBooking?.toLocaleString(),
    },
    {
      key: "8",
      label: "Chiếu khấu",
      children: (0).toLocaleString(),
    },
    {
      key: "9",
      label: "Tổng cộng",
      children: bookingDataDisplay?.totalPriceBooking?.toLocaleString(),
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
                  <Title level={3}>Chọn một ngày</Title>
                  <DatePicker
                    format="YYYY-MM-DD"
                    // disabledDate={disabledDate}
                    // disabledTime={disabledDateTime}
                    // showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                    // defaultValue={dayjs(dateQuery)}
                    value={dayjs(dateQuery)}
                    onChange={onChange}
                  />

                  <div>
                    <Title level={3}>Lựa chọn địa điểm và khung giờ</Title>
                    <div className="mt-0">
                      <VenueList
                        venueList={venueList}
                        bookingData={bookingData}
                        setBookingData={setBookingData}
                        setVenue={setVenue}
                        bookingDataDisplay={bookingDataDisplay}
                        setBookingDataDisplay={setBookingDataDisplay}
                      />
                    </div>
                  </div>
                </>
              ) : activeStep + 1 === 2 ? (
                <React.Fragment>
                  <Title level={3}>Chọn chủ đề</Title>
                  <div className="mt-10">
                    <ThemeList
                      bookingData={bookingData}
                      setBookingData={setBookingData}
                      bookingDataDisplay={bookingDataDisplay}
                      setBookingDataDisplay={setBookingDataDisplay}
                    />
                  </div>
                </React.Fragment>
              ) : activeStep + 1 === 3 ? (
                <React.Fragment>
                  <Title level={3}>Chọn gói dịch vụ</Title>
                  <div className="mt-10">
                    <PackageList
                      bookingData={bookingData}
                      setBookingData={setBookingData}
                      bookingDataDisplay={bookingDataDisplay}
                      setBookingDataDisplay={setBookingDataDisplay}
                    />
                  </div>
                </React.Fragment>
              ) : activeStep + 1 === 4 ? (
                <div className="mt-10 w-full">
                  <Title level={3}>Nâng cấp dịch vụ</Title>
                  <Flex gap={10} justify="space-between">
                    <Row style={{ width: 280 * 3 + 50 }} gutter={[16, 16]}>
                      <ServiceCards
                        // bookingData={bookingData}
                        setBookingData={setBookingData}
                        services={services}
                        setServices={setServices}
                        dataUpgrade={dataUpgrade}
                        setDataUpgrade={setDataUpgrade}
                        bookingDataDisplay={bookingDataDisplay}
                        setBookingDataDisplay={setBookingDataDisplay}
                        totalPriceSerivce={totalPriceSerivce}
                        setTotalPriceService={setTotalPriceService}
                        totalPriceBooking={totalPriceBooking}
                        setTotalPriceBooking={setTotalPriceBooking}
                      />
                    </Row>
                    <Flex vertical gap={15}>
                      {services.map((item, index) => {
                        return (
                          <Card key={index}>
                            <Flex gap={20}>
                              <Avatar
                                style={{ width: 50, height: 50 }}
                                src={item?.service?.serviceImgUrl}
                              />
                              <div>
                                <div>
                                  Tên dịch vụ:{" "}
                                  <strong>{item?.service?.serviceName}</strong>
                                </div>
                                <div>
                                  Số lượng: <strong>{item?.count}</strong>
                                </div>
                                <div>
                                  Giá:{" "}
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
                      {totalPriceSerivce > 0 && (
                        <React.Fragment>
                          {" "}
                          <Divider />
                          <Flex justify="space-between">
                            <div>Tổng cộng:</div>
                            <div>
                              <strong>
                                {totalPriceSerivce.toLocaleString() + "VNĐ"}
                              </strong>
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
                      setBookingDataDisplay((prev) => ({
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
