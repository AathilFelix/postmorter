import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./badge";

interface GenerateTableProps {
  id: string;
  summary: string;
  status: string;
  date: string;
}

const GenerateTable = ({ incidents }: { incidents: GenerateTableProps[] }) => {
  return (
    <div className="w-full">
      <div className="border-2 border-[#00000033] rounded-t-[15px] bg-[#F8F8F8] overflow-hidden text-[#00000099]">
        <Table className="text-center table-fixed w-full">
          <TableHeader className="bg-[#FAFAFA]">
            <TableRow className="border-b border-[#00000033]">
              <TableHead className="w-25 font-bold text-[#00000099] text-xs uppercase tracking-wide h-12 text-center">
                Incident ID
              </TableHead>
              <TableHead className="w-140 font-bold text-[#00000099] text-xs uppercase tracking-wide text-center">
                Summary
              </TableHead>
              <TableHead className="w-37.5 font-bold text-[#00000099] text-xs uppercase tracking-wide text-center">
                Status
              </TableHead>
              <TableHead className="w-37.5 font-bold text-[#00000099] text-xs uppercase tracking-wide text-center">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incidents.map((incident, index) => (
              <TableRow
                key={index}
                className="bg-white hover:bg-[#FCFCFC] border-b-2 border-[#00000033] last:border-0">
                <TableCell className="font-medium text-black w-25 text-center">
                  {incident.id}
                </TableCell>
                <TableCell className="text-black w-140 break-all whitespace-normal text-center">
                  {incident.summary}
                </TableCell>
                <TableCell>
                  <Badge className="text-[#00000080] bg-[#F9FAFB] rounded-[10px] py-1.25 px-2.5">
                    {incident.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-black pr-6 w-37.5">
                  {incident.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GenerateTable;
