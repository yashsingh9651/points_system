"use client";
import {  useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const page = () => {
  const userData = useSelector((state) => state.user.userData);
  return (
    <div className="flex justify-center items-center gap-24 h-screen">
      <Card className="w-10/12 md:w-1/2 lg:w-96">
        <div className="w-14 mx-auto rounded-full aspect-square overflow-hidden bg-gray-500 text-center text-gray-100 object-cover text-6xl font-black">{userData.username?.charAt(0)}</div>
        <CardBody>
          <div className="mb-2 flex flex-col md:flex-row items-start md:items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {userData.username}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              {userData.points}
            </Typography>
          </div>
          <Typography color="blue-gray" className="font-medium">
            {userData.email}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Redeem Points
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default page;
