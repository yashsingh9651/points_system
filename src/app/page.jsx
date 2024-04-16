"use client";
import { setTest } from "@/redux/slices/testing";
import {useDispatch,useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.testing.test);
  return (
    <>
    <button className="bg-black text-white text-xl mt-40" onClick={()=>dispatch(setTest(true))} >Hello Testing</button>
    </>
  );
}
