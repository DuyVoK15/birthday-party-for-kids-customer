"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DatePicker, DatePickerProps, Space } from "antd";
import VenueList from "@/components/booking/VenueList";
import PackageList from "@/components/booking/PackageList";
import ThemeList from "@/components/booking/ThemeList";
import dayjs from "dayjs";
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import AuthGuard from "../AuthGuard";

const data = [
  {
    VenueName: "Kid Palace Quận 1 TP.HCM",
    VenueImgUrl: "/image/kids-palace.jpeg",
    Location: "123 Đường ABC, Quận 1, TP.HCM",
    Capacity: 100,
    Status: "Trống lịch",
  },
  {
    VenueName: "Kid Palace Quận 2 TP.HCM",
    VenueImgUrl: "/image/kids-palace.jpeg",
    Location: "456 Đường XYZ, Quận 2, TP.HCM",
    Capacity: 50,
    Status: "Trống lịch",
  },
  {
    VenueName: "Kid Palace Quận 3 TP.HCM",
    VenueImgUrl: "/image/kids-palace.jpeg",
    Location: "789 Đường LMN, Quận 3, TP.HCM",
    Capacity: 20,
    Status: "Đã có người đặt",
  },
  {
    VenueName: "Kid Palace Quận 4 TP.HCM",
    VenueImgUrl: "/image/kids-palace.jpeg",
    Location: "321 Đường PQR, Quận 4, TP.HCM",
    Capacity: 30,
    Status: "Trống lịch",
  },
  {
    VenueName: "Kid Palace Quận 5 TP.HCM",
    VenueImgUrl: "/image/kids-palace.jpeg",
    Location: "654 Đường UVW, Quận 5, TP.HCM",
    Capacity: 80,
    Status: "Đã có người đặt",
  },
  {
    VenueName: "Kid Palace Quận 6 TP.HCM",
    VenueImgUrl: "/image/kids-palace.jpeg",
    Location: "654 Đường UVW, Quận 5, TP.HCM",
    Capacity: 80,
    Status: "Đã có người đặt",
  },
  {
    VenueName: "Kid Palace Quận 7 TP.HCM",
    VenueImgUrl: "/image/kids-palace.jpeg",
    Location: "654 Đường UVW, Quận 5, TP.HCM",
    Capacity: 80,
    Status: "Đã có người đặt",
  },
  {
    VenueName: "Kid Palace Quận 8 TP.HCM",
    VenueImgUrl: "/image/kids-palace.jpeg",
    Location: "654 Đường UVW, Quận 5, TP.HCM",
    Capacity: 80,
    Status: "Đã có người đặt",
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

const steps = [
  "Pick Date & Venue",
  "Select package",
  "Select theme",
  "Fill information",
  "Confirm & Payment",
];

export default function Booking() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
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

  const [isShowVenues, setIsShowVenues] = React.useState(false);
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setIsShowVenues(true);
  };

  return (
    <AuthGuard>
      <div className="container mx-auto mt-10">
        <Box sx={{ width: "100%" }}>
          <Typography className="mb-5" variant="h4">
            Các bước tạo bữa tiệc
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
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
                <Typography
                  variant="h4"
                  sx={{ mt: 2, mb: 1, textAlign: "center" }}
                >
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
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    Chọn một ngày
                  </Typography>
                  <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    // disabledDate={disabledDate}
                    // disabledTime={disabledDateTime}
                    showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                    onChange={onChange}
                  />
                  {isShowVenues && (
                    <>
                      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                        Chọn địa điểm
                      </Typography>
                      <div className="mt-0">
                        <VenueList venues={data} />
                      </div>
                    </>
                  )}
                </>
              ) : activeStep + 1 === 2 ? (
                <>
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    Chọn gói dịch vụ
                  </Typography>
                  <PackageList packages={packageData} />
                </>
              ) : activeStep + 1 === 3 ? (
                <>
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    Chọn chủ đề
                  </Typography>
                  <ThemeList themes={themeData} />
                </>
              ) : activeStep + 1 === 4 ? (
                <>
                  {/* <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Điền thông tin
                </Typography> */}
                  <Container maxWidth="sm">
                    <Paper className="mt-10 p-10">
                      <Typography variant="h5" gutterBottom>
                        Điền thông tin
                      </Typography>
                      <form>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <TextField label="Tên của bé" fullWidth required />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Tuổi của bé"
                              type="date"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              required
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Email"
                              type="email"
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Số điện thoại"
                              type="tel"
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="inherit"
                              fullWidth
                            >
                              Submit
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    </Paper>
                  </Container>
                </>
              ) : activeStep + 1 === 5 ? (
                <Container maxWidth="sm">
                  <Paper className="mt-10 p-10">
                    <Typography variant="h5" className="mb-5" gutterBottom>
                      Xác nhận và thanh toán
                    </Typography>
                    <form>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            Tên của bé: <strong>Nguyễn Thị Giáo Làng</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            Tuổi của bé: <strong>40 tuổi</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            Đặt ngày:{" "}
                            <strong>12-01-2024 vào lúc 18:00:00</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            Gói dịch vụ:{" "}
                            <strong>Gói tiệc sinh nhật BASIC 1</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            Chủ đề:{" "}
                            <strong>Chủ đề Công chúa ngủ trong rừng</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            Tổng số tiền: <strong>2.000.000 VNĐ</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                              Chọn phương thức thanh toán
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                            >
                              <FormControlLabel
                                value="Momo"
                                control={<Radio />}
                                label="Momo"
                              />
                              <FormControlLabel
                                value="Paypal"
                                control={<Radio />}
                                label="Paypal"
                              />
                              <FormControlLabel
                                value="Tiền mặt"
                                control={<Radio />}
                                label="Tiền mặt"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="inherit"
                            fullWidth
                          >
                            Thanh toán
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Paper>
                </Container>
              ) : (
                <>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Step {activeStep + 1}
                  </Typography>
                </>
              )}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </AuthGuard>
  );
}
