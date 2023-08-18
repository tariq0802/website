"use client";

import { Recruitment, RecruitmentBoard } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

interface RecruitmentProps {
  recruitments: (Recruitment & {
    recruitmentBoard: RecruitmentBoard;
  })[];
}

const Recruitment: React.FC<RecruitmentProps> = ({ recruitments }) => {
  const currentDate = new Date();

  const runningRecruitments = recruitments.filter((item) => {
    if (item.lastDate) {
      const lastDate = new Date(item.lastDate);
      return lastDate >= currentDate;
    }
    return false;
  });

  return (
    <div>
      <div className="flex bg-slate-700 px-3 pt-1">
        <h2 className="bn text-lg font-bold text-white">কর্ম ফিলাপ</h2>
      </div>
      <div className="border-[1px] my-4 bg-slate-50 p-3">
        <h4 className="font-bold text-slate-700">Current notifications</h4>
        <Table className="mt-2 md:text-xs lg:text-sm text-sm">
          <TableCaption>
            <Link
              href="/recruitments"
              className={buttonVariants({ variant: "outline" })}
            >
              Previous recruitments
            </Link>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Board</TableHead>
              <TableHead>Vacancy</TableHead>
              <TableHead>Last Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {runningRecruitments.length !== 0 ? (
              runningRecruitments.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.recruitmentBoard.label}</TableCell>
                  <TableCell>{item.vacancy}</TableCell>

                  <TableCell>
                    {item.lastDate
                      ? new Date(item.lastDate).toLocaleDateString("en-IN", {
                          timeZone: "Asia/Kolkata",
                        })
                      : null}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div className="bn h-44 flex flex-col justify-center items-center p-3 text-center bg-slate-50 my-4">
                <p className="font-semibold py-4">No data found</p>
                <Link
                  href={"/recruitments"}
                  className={buttonVariants({ variant: "outline" })}
                >
                  এখানে ক্লিক করুন
                </Link>
              </div>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Recruitment;
