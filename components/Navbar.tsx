import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Dot } from "lucide-react";

interface NavbarProps {
  showBreadcrumb ?: boolean;
}


const Navbar = ({ showBreadcrumb = true }: NavbarProps) => {
  return (
    <nav className="w-full border-b border-slate-400 px-2 sm:px-2 lg:px-4 py-2 lg:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 lg:gap-5">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2 lg:gap-3">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_18_22)">
                <path
                  d="M7.5 4L3.5 8L7.5 12"
                  stroke="#564787"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.5 4L17.5 8L13.5 12"
                  stroke="#564787"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.5 6H25C25.2652 6 25.5196 6.10536 25.7071 6.29289C25.8946 6.48043 26 6.73478 26 7V25C26 25.2652 25.8946 25.5196 25.7071 25.7071C25.5196 25.8946 25.2652 26 25 26H7C6.73478 26 6.48043 25.8946 6.29289 25.7071C6.10536 25.5196 6 25.2652 6 25V17.5"
                  stroke="#564787"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_18_22">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="text-lg lg:text-[16px] font-medium text-black">
              Postmortor
            </span>
            {showBreadcrumb && (
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbSeparator className="flex items-center justify-center">
                    <Dot size={24} strokeWidth={8} className="text-black" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-lg lg:text-[16px] font-medium text-black">
                      Inc 042
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>

          {/* Breadcrumb Arrow */}
        </div>

        {/* User Avatar */}
        <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gray-100 shrink-0" />
      </div>
    </nav>
  );
};

export default Navbar;
