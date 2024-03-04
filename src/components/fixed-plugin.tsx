"use client";
import Image from "next/image";
import { Button } from "@material-tailwind/react";

export function FixedPlugin() {
  return (
    <a href="https://www.material-tailwind.com" target="_blank">
      <Button
        placeholder=""
        color="white"
        size="sm"
        className="!fixed bottom-4 right-4 flex items-center gap-1 border border-blue-gray-50 pl-2"
      >
        <Image
          width={128}
          height={128}
          className="h-5 w-5"
          alt="Material Tailwind"
          src="https://www.material-tailwind.com/favicon.png"
        />{" "}
        Made With Material Tailwind
      </Button>
    </a>
  );
}
