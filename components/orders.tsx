"use client";

import { Case, CaseOrder } from "@prisma/client";
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
import { buttonVariants } from "./ui/button";

interface OrdersProps {
  orders: (CaseOrder & {
    case: Case;
  })[];
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {

  return (
    <div>
      <div className="flex bg-slate-700 px-3 pt-1">
        <h2 className="bn text-lg font-bold text-white">আদেশনামা</h2>
      </div>
      <div className="border-[1px] my-4 bg-slate-50 p-3">
        <Table>
          <TableCaption>
            <Link
              href="/case-orders/"
              className={buttonVariants({ variant: "outline" })}
            >
              All orders
            </Link>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Case No</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="md:text-xs lg:text-sm text-sm">
            {orders.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Link href={`/case-orders/${item.slug}`}>
                    {item.case.label}
                  </Link>
                </TableCell>
                <TableCell>
                  {new Date(item.orderDate).toLocaleDateString("en-IN")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Orders;
