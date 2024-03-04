import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./ThemeCard.css";
import Link from "next/link";
const ThemeCard = ({ theme } : {theme: any}) => {
  const { ThemeName, ThemeImgUrl, ThemeDescription } = theme;

  return (
    <Link href={"#"}>
      <Card className="theme-card">
        <CardMedia
          component="img"
          height="140px"
          image={ThemeImgUrl}
          alt={ThemeName}
          style={{objectFit: 'cover'}}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {ThemeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ThemeDescription}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ThemeCard;
