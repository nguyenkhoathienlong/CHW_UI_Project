"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { EMPLOYEES_SEED } from "../../../constants/employees";
import { Employee } from "../../../types/employee";
import { EmployeesToolbar } from "../../../components/employees/EmployeesToolbar";
import { EmployeeTable } from "../../../components/employees/EmployeeTable";

export default function EmployeesPage() {
	const [query, setQuery] = useState("");
	const router = useRouter();
	const [page, setPage] = useState(1);
	const pageSize = 8;

	const filtered: Employee[] = useMemo(() => {
		const q = query.trim().toLowerCase();
		let data = EMPLOYEES_SEED;
		if (!q) return data;
		return data.filter((e) => {
			const personal = e.personal;
			const account = e.account;
			return (
				personal.fullName.toLowerCase().includes(q) ||
				personal.idNumber.toLowerCase().includes(q) ||
				personal.phoneNumber.toLowerCase().includes(q) ||
				personal.email.toLowerCase().includes(q) ||
				personal.address.toLowerCase().includes(q) ||
				(account?.username?.toLowerCase().includes(q) ?? false) ||
				(account?.email?.toLowerCase().includes(q) ?? false) ||
				(account?.phoneNumber?.toLowerCase().includes(q) ?? false)
			);
		});
	}, [query]);

	return (
		<div className="p-4 md:p-6 space-y-4">
			<div className="flex items-start justify-between">
				<div>
					<h1 className="font-bold text-2xl text-[#222] mb-1 tracking-tight">Quản lý nhân viên</h1>
					<div className="text-[#64748b] text-base">Theo dõi, tìm kiếm và quản lý hồ sơ nhân viên của đơn vị.</div>
				</div>
			</div>
			<EmployeesToolbar
				query={query}
				onQueryChange={(q) => {
					setPage(1);
					setQuery(q);
				}}
			/>
			<EmployeeTable employees={filtered} page={page} pageSize={pageSize} onPageChange={setPage} />
		</div>
	);
}