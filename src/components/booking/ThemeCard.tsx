import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./ThemeCard.css";
import "@/app/globals.css"
import Link from "next/link";
import { ThemeDataResponse } from "@/dtos/response/theme.response";
const ThemeCard = ({ theme }: { theme: ThemeDataResponse }) => {
  const { themeName, themeDescription, themeImgUrl } = theme;

  return (
      <Card className="package-card">
        <CardMedia
          component="img"
          height={300}
          width={'100%'}
          image={themeImgUrl}
          alt={themeName}
          style={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {themeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {themeDescription}
          </Typography>
        </CardContent>
      </Card>
  );
};

export default ThemeCard;
