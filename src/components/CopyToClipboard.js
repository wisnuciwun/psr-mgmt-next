"use client";
import React from "react";

const CopyToClipboard = ({ text = "", onCopy = () => {}, children }) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        onCopy();
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  return <div onClick={handleCopy}>{children}</div>;
};

export default CopyToClipboard;
