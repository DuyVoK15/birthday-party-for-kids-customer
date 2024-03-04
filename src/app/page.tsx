// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import OutImpressiveStats from "./out-impressive-stats";
import CoursesCategories from "./courses-categories";
import ExploreCourses from "./package-card";
import Testimonial from "./testimonial";
import Events from "./events";
import StudentsFeedback from "./students-feedback";
import TrustedCompany from "./trusted-companies";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

export default function RootApplication() {
  return (
    <>

      <Hero />
      {/* <OutImpressiveStats /> */}
      {/* <CoursesCategories /> */}
      <ExploreCourses />
      {/* <Testimonial />
      <Events />
      <StudentsFeedback />
      <TrustedCompany /> */}

    </>
  );
}
