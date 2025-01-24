"use client";

import BackgroundPattern from "@/components/background-pattern";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return <BackgroundPattern>{children}</BackgroundPattern>;
};

export default AuthLayout;
