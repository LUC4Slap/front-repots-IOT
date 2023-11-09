import React from "react";
import "./style.css";
import { BiCurrentLocation } from "react-icons/bi";

export default function FindReportButton({ findReport }) {
  return (
    <div onClick={() => findReport()} className="btn">
      <BiCurrentLocation size={30} color="#fff" />
    </div>
  );
}
