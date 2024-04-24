"use client";
import React from "react";
import {
  Card,
  CardBody,
  Typography,
  CardFooter,
  Button
} from "@material-tailwind/react";
const ProfileSkeleton = () => {
  return (
    <Card className="mt-0 md:w-[400px] w-[300px] animate-pulse">
      <div className="w-16 mx-auto rounded-full aspect-square overflow-hidden bg-gray-500 text-center text-gray-100 object-cover text-6xl font-black"></div>
      <CardBody>
        <Typography
          as="div"
          variant="h1"
          className="mb-4 h-3 w-full rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-full rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-full rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          disabled
          tabIndex={-1}
          className="h-12 w-full bg-gray-300 shadow-none hover:shadow-none"
        >
          &nbsp;
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileSkeleton;
