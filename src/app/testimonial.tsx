"use client";

import Image from "next/image";
import { Typography, Card, CardBody, Avatar } from "@material-tailwind/react";

function TESTIMONIAL() {
  return (
    <section className="px-8 py-40">
      <div className="container mx-auto">
        <Card placeholder="" color="transparent" shadow={false} className="">
          <CardBody
            placeholder=""
            className="col-span-full grid grid-cols-1 place-items-center gap-10 overflow-visible lg:grid-cols-4"
          >
            <div className="col-span-2 flex h-full w-full items-center justify-center overflow-hidden rounded-xl xl:w-[600px]">
              <Image
                width={768}
                height={768}
                src="/image/blogs/blog6.svg"
                alt="testimonial image"
                className="h-full w-full scale-110 object-cover"
              />
            </div>
            <div className="col-span-2 w-full">
              <Typography
                placeholder=""
                variant="h6"
                color="blue"
                className="mb-4"
              >
                ONLINE COURSE
              </Typography>
              <Typography
                placeholder=""
                variant="h3"
                color="blue-gray"
                className="mb-4 font-bold"
              >
                Full-Stack Web Development
              </Typography>
              <Typography
                placeholder=""
                className="mb-1 w-full font-normal !text-gray-500"
              >
                Become a versatile developer by combining frontend and backend
                skills. Build complete web applications from start to finish.
              </Typography>
              <div className="mb-4 grid">
                <div className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-gray-500" />
                  <Typography
                    placeholder=""
                    className="w-full font-normal !text-gray-500"
                  >
                    International course collection in 10 languages
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-gray-500" />
                  <Typography
                    placeholder=""
                    className="w-full font-normal !text-gray-500"
                  >
                    Certified include
                  </Typography>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <Avatar
                  placeholder=""
                  variant="circular"
                  src="/image/avatar3.jpg"
                  alt="spotify"
                  size="md"
                />
                <div>
                  <Typography
                    placeholder=""
                    variant="h6"
                    color="blue-gray"
                    className="mb-0.5"
                  >
                    Otto Gonzalez
                  </Typography>
                  <Typography
                    placeholder=""
                    variant="small"
                    className="font-normal !text-gray-500"
                  >
                    Senior Designer @company.com
                  </Typography>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default TESTIMONIAL;
