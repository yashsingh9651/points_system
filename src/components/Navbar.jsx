"use client";
import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logout } from "@/redux/slices/user";

export function StickyNavbar() {
  const pathname = usePathname();
  const isLogedIn = useSelector((state) => state.user.isLogedIn);
  const userData = useSelector((state) => state.user.userData);
  const [openNav, setOpenNav] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  //Handeling Logout
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      if (res.data.success) {
        dispatch(logout(false));
        router.push("/login");
        router.replace("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:scale-110 duration-100 xl:hidden"
      >
        <Link href="/profile">Profile</Link>
      </Typography>
      {userData?.isAdmin && (
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal hover:scale-110 duration-100 min-w-fit"
          >
            <Link href="/admin">Admin</Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal hover:scale-110 duration-100 min-w-fit"
          >
            <Link href="/admin/inventory">Inventory</Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal hover:scale-110 duration-100 min-w-fit"
          >
            <Link href="/admin/bills/new">new Bill</Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal hover:scale-110 duration-100 min-w-fit"
          >
            <Link href="/admin/bills">Bills</Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal hover:scale-110 duration-100 min-w-fit"
          >
            <Link href="/admin/restock">Restock Bills</Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal hover:scale-110 duration-100 min-w-fit"
          >
            <Link href="/admin/restock/new">New Restock</Link>
          </Typography>
          {/* <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal hover:scale-110 duration-100 min-w-fit"
          >
            <Link href="/admin/creditPoints">Credit Points</Link>
          </Typography> */}
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal hover:scale-110 duration-100 min-w-fit"
          >
            <Link href="/studio">Studio</Link>
          </Typography>
        </div>
      )}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal hover:scale-110 duration-100 xl:hidden"
      >
        <Link href="/transactions">Transactions</Link>
      </Typography>
    </ul>
  );
  return (
    <Navbar
      className={`${
        pathname.slice(0, 7) == "/studio" && "hidden"
      } fixed top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4`}
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link
          className="mr-4 cursor-pointer py-1.5 font-semibold text-lg lg:text-xl flex gap-2 items-center"
          href="/"
        >
          <Image
            width={200}
            height={200}
            className="w-6 lg:w-8 aspect-square object-cover"
            src="/logo_black.png"
            alt="logo"
          />
          <h1>Akanksha Enterprises</h1>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">{navList}</div>
          {!isLogedIn ? (
            <div className="flex items-center gap-x-1">
              <Link href="login">
                <Button
                  variant={`${pathname === "/login" ? "gradient" : "text"}`}
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Log In</span>
                </Button>
              </Link>
              <Link href="signup">
                <Button
                  variant={`${pathname === "/signup" ? "gradient" : "text"}`}
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Sign in</span>
                </Button>
              </Link>
            </div>
          ) : (
            <button
              onClick={() => handleLogout()}
              className="hidden lg:inline-block bg-blue-gray-900 text-white px-5 py-2 rounded-md hover:scale-105 focus:bg-blue-gray-800 active:bg-blue-gray-800 duration-200"
            >
              Log out
            </button>
          )}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        {!isLogedIn ? (
          <div className="flex items-center gap-x-1">
            <Link className="w-1/2" href="login">
              <Button
                variant={`${pathname === "/login" ? "gradient" : "text"}`}
                size="sm"
              >
                <span>Log In</span>
              </Button>
            </Link>
            <Link className="w-1/2" href="signup">
              <Button
                variant={`${pathname === "/signup" ? "gradient" : "text"}`}
                size="sm"
              >
                <span>Sign in</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-x-1">
            <Button onClick={() => handleLogout()} fullWidth>
              Log out
            </Button>
          </div>
        )}
      </Collapse>
    </Navbar>
  );
}
