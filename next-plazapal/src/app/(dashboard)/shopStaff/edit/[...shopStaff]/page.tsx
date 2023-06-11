"use client";

import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/Button";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChangeEvent } from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { useTheme } from "next-themes";
import LargeHeading from "@/components/ui/LargeHeading";

const useMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};

export default function Page() {
  const { resolvedTheme } = useTheme();
  const isMounted = useMounted();

  const [saveShopOwner, setSaveShopOwner] = useState({
    name: "",
    surname: "",
    email: "",
    telephoneNo: "",
  });

  const router = useRouter();

  const pathname = usePathname();
  const pathNames = pathname ? pathname.split("/") : [];
  const shopOwnerId = pathname ? pathNames[pathNames.length - 1] : null;

  useEffect(() => {
    const fetchShopOwner = async () => {
      const endpoint = "/api/shopStaff?id=" + shopOwnerId;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(endpoint, options);
      const result = await response.json();

      setSaveShopOwner(result);
    };

    fetchShopOwner();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const dataToSend = {
      ...saveShopOwner,
    };

    console.log("Data to send:", dataToSend);

    const endpoint = "/api/shopStaff?id=" + shopOwnerId;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    router.push("/shopStaff/" + shopOwnerId);
  };

  const handleSaveChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSaveShopOwner({ ...saveShopOwner, [name]: value });
  };

  return (
    isMounted && (
      <div className="relative min-h-screen flex items-start justify-center overflow-x-hidden">
        <div className="container pt-24 max-w-7xl mx-auto w-full">
          <div className="gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start dark:text-white">
            <LargeHeading
              size="lg"
              className="text-black dark:text-white max-w-2xl py-10"
            >
              Edit Shop Staff
            </LargeHeading>
            <Card className="border-black dark:border-white">
              <CardHeader>
                <CardTitle>Edit the details of the shop owner</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        name="name"
                        id="name"
                        value={saveShopOwner.name}
                        onChange={handleSaveChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="surname">Surname</Label>
                      <Input
                        name="surname"
                        id="surname"
                        value={saveShopOwner.surname}
                        onChange={handleSaveChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        name="email"
                        id="email"
                        value={saveShopOwner.email}
                        onChange={handleSaveChange}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="telephoneNo">Telephone Number</Label>
                      <Input
                        name="telephoneNo"
                        id="telephoneNo"
                        value={saveShopOwner.telephoneNo}
                        onChange={handleSaveChange}
                      />
                    </div>
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/shopStaff"
            >
              Back to Shop Staffs
            </Link>
          </div>
        </div>
      </div>
    )
  );
}
