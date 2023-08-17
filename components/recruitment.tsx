"use client";

import { Recruitment, RecruitmentBoard } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "./ui/table";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

interface recruitmentProps {
  recruitments: (Recruitment & {
    recruitmentBoard: RecruitmentBoard;
  })[];
}

const recruitment: React.FC<recruitmentProps> = ({ recruitments }) => {
  console.log(Date());
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
      {runningRecruitments.length !== 0 ? (
        runningRecruitments.map((item) => (
          <React.Fragment key={item.id}>
            <div className="border-[1px] my-4 bg-slate-50 p-3">
              <h4 className="font-bold text-slate-700">{item.label}</h4>
              <Table>
                <TableCaption>
                  <Link href={`/career-update/${item.slug}`}>
                    Click Here for details
                  </Link>
                </TableCaption>
                <TableBody>
                  <TableRow>
                    <TableHead>Board</TableHead>
                    <TableCell>{item.recruitmentBoard.label}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Last date</TableHead>
                    <TableCell>
                      {item.lastDate
                        ? new Date(item.lastDate).toLocaleDateString("en-IN", {
                            timeZone: "Asia/Kolkata",
                          })
                        : null}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Vacancy</TableHead>
                    <TableCell>{item.vacancy}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </React.Fragment>
        ))
      ) : (
        <div className="bn h-44 flex flex-col justify-center items-center p-3 text-center bg-slate-50 my-4">
          <p className="font-semibold py-4">
            এই মুহূর্তে কোনো ফর্ম ফিলাপ চলছে না। পূর্ববর্তী নিয়োগ সম্পর্কে
            জানতে
          </p>
          <Link href={"/recruitments"} className={buttonVariants({variant: "outline"})}>এখানে ক্লিক করুন</Link>
        </div>
      )}
    </div>
  );
};
export default recruitment;
