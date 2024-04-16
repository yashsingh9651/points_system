"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function StickyNavbar() {
  const [login, setLogin] = useState(false);
  const path = usePathname();
  const [openNav, setOpenNav] = React.useState(false);
  const [pathname, setPathname] = React.useState(false);
  // Fetching User Data
  const fetchUser = async () => {
    const res = await axios.get("/api/users/userData");
    if (res.data.success) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };
  useEffect(() => {
    fetchUser();
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    setPathname(window.location.pathname);
  }, []);
  useEffect(() => {
    fetchUser();
  }, [path]);
  //Handeling Logout
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout");
      const res = await response.json();
      if (res.success) {
        router.push("/login");
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
        className="p-1 font-normal"
      >
        <Link href="#" className="flex items-center">
          Profile
        </Link>
      </Typography>
    </ul>
  );
  return (
    <Navbar className="absolute top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          className="mr-4 cursor-pointer py-1.5 font-semibold text-xl"
        >
          Akanksha Enterprises
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          {!login ? (
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
            <Button
              onClick={() => handleLogout()}
              className="hidden lg:inline-block"
              fullWidth
            >
              Log out
            </Button>
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
        {!login ? (
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
