import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./PackageCard.css";
import Link from "next/link";

const PackageCard = ({ packageInfo }: { packageInfo: any }) => {
  const { PackageName, PackageImgUrl, PackageDescription, Price } = packageInfo;

  return (
    <Link href={"#"}>
      <Card className="package-card">
        <CardMedia
          component="img"
          height="140"
          image={PackageImgUrl}
          alt={PackageName}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {PackageName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {PackageDescription}
          </Typography>
          <Typography variant="h6" color="success.main">
            Price: {Price} VND
          </Typography>
        </CardContent>
      </Card>{" "}
    </Link>
  );
};

export default PackageCard;
