import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import Image from "next/image";
import "./package-card.css";
import { Button, Typography } from "antd";
interface CourseCardProps {
  img: string;
  tag: string;
  title: string;
  desc: string;
  label: string;
}

export function PackageCard({ img, tag, title, desc, label }: CourseCardProps) {
  return (
    <Card placeholder=""  className="package-card border">
      <CardHeader placeholder=""  className="h-64">
        <Image
          width={768}
          height={768}
          src={img}
          alt={title}
          className="h-full w-full scale-[1.1] object-cover"
        />
      </CardHeader>
      <CardBody placeholder="" >
        <div className="flex items-center gap-2">
          <Typography color="blue" className="font-normal text-gray-500">
            {tag}
          </Typography>
        </div>
        <a
          href="#"
          className="text-blue-gray-900 transition-colors hover:text-purple-600"
        >
          <Typography className="mb-2 normal-case">
            {title}
          </Typography>
        </a>
        <Typography className="mb-6 font-normal !text-gray-500">
          {desc}
        </Typography>
        <Button>{label}</Button>
      </CardBody>
    </Card>
  );
}

export default PackageCard;
