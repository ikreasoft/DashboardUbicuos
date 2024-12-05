"use client";

import React from "react";
import SessionData from "../SessionData";

const ShowDevicePage = () => {
  const sessionId = "1"; // 

  return (
    <div>
      <SessionData sessionId={sessionId} />
    </div>
  );
};

export default ShowDevicePage;
