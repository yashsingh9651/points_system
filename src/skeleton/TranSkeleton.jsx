"use client";
import { Typography } from "@material-tailwind/react";

const TranSkeleton = () => {
  const divArray = Array(6).fill(null);
  return (
    <div className="animate-pulse">
      {divArray.map((_, index) => (
        <div className="my-5 mx-auto md:w-2/3 xl:w-full" key={index}>
          <Typography
            as="div"
            variant="paragraph"
            className="mb-2 h-2 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
          <Typography
            as="div"
            variant="paragraph"
            className="mb-2 h-2 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default TranSkeleton;
