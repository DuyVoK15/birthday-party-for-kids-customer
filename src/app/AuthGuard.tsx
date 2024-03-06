"use client";
import { APP_CONSTANTS } from "@/enums/app";
import { setPathName } from "@/lib/features/app.slice";
import { useAppDispatch } from "@/lib/hooks";
import { redirect, usePathname } from "next/navigation";
import React, { FC, ReactNode, useEffect } from "react";

interface AuthGuardProps {
  children: ReactNode;
}
const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const isAuthenticated = Boolean(
    localStorage.getItem(APP_CONSTANTS.ACCESS_TOKEN),
  );
  useEffect(() => {
    const fetchPathName = async () => {
      await dispatch(setPathName(pathName));
    };
    fetchPathName();
    if (!isAuthenticated) {
      redirect("/authen");
    }
  }, [isAuthenticated]);
  return <>{children}</>;
};

export default AuthGuard;
