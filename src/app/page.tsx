// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import OutImpressiveStats from "./out-impressive-stats";
import CoursesCategories from "./courses-categories";
import ExploreCourses, { PackageCards } from "./package-cards";
import Testimonial from "./testimonial";
import Events from "./events";
import StudentsFeedback from "./students-feedback";
import TrustedCompany from "./trusted-companies";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import "./globals.css";
import ThemeCards from "./theme-cards";
import { Divider } from "antd";
import VenueCards from "./venue-cards";
export default function RootApplication() {
  return (
    <div className="container mx-auto">
      <Hero />
      {/* <OutImpressiveStats /> */}
      {/* <CoursesCategories /> */}
      <div className="mt-56">
        <VenueCards />
        <Divider className="mt-10" />
        <PackageCards />
        <Divider className="mt-10" />
        <ThemeCards />
      </div>

      {/* <Testimonial />
      <Events />
      <StudentsFeedback />
      <TrustedCompany /> */}
    </div>
  );
}
