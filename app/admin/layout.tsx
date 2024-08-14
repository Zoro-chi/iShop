import React from "react";

import AdminNav from "../components/admin/AdminNav";

export const metadata = {
	title: "iShop Admin",
	description: "iShop Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<AdminNav />
			{children}
		</div>
	);
};

export default AdminLayout;
