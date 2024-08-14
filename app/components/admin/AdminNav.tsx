"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
	MdDashboard,
	MdDns,
	MdFormatListBulleted,
	MdLibraryAdd,
} from "react-icons/md";

import Container from "../Container";
import AdminNavItem from "./AdminNavItem";

const AdminNav = () => {
	const pathName = usePathname();

	return (
		<div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
			<Container>
				<div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
					<Link href="/admin">
						<AdminNavItem
							label="Summary"
							icon={MdDashboard}
							selected={pathName === "/admin"}
						/>
					</Link>
					<Link href="/admin/add-product">
						<AdminNavItem
							label="Add Product"
							icon={MdLibraryAdd}
							selected={pathName === "/admin/add-product"}
						/>
					</Link>
					<Link href="/admin/manage-product">
						<AdminNavItem
							label="Manage Product"
							icon={MdDns}
							selected={pathName === "/admin/manage-product"}
						/>
					</Link>
					<Link href="/admin/manage-orders">
						<AdminNavItem
							label="Summary"
							icon={MdFormatListBulleted}
							selected={pathName === "/admin/manage-order"}
						/>
					</Link>
				</div>
			</Container>
		</div>
	);
};

export default AdminNav;
