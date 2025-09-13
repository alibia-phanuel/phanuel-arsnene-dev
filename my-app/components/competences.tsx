import React from "react";
import JobExp from "./job-exp";
import Technologi from "./technologi";
export default function Competences() {
  return (
    <div className="text-white flex justify-center flex-col items-center">
      <div className="container bg-red-600">
        <JobExp />
        <Technologi />
      </div>
    </div>
  );
}
