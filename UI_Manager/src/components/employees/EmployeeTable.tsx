"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { Employee } from "../../types/employee";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface EmployeeTableProps {
	employees: Employee[];
	page: number;
	pageSize: number;
	onPageChange: (page: number) => void;
}

export function EmployeeTable({ employees, page, pageSize, onPageChange }: EmployeeTableProps) {
	const total = employees.length;
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const pageData = useMemo(() => {
		const start = (page - 1) * pageSize;
		return employees.slice(start, start + pageSize);
	}, [employees, page, pageSize]);

	return (
		<div className="space-y-4">
			<Card className="border bg-white">
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[320px]">Tên</TableHead>
								<TableHead className="min-w-[140px]">Số CC/CCCD</TableHead>
								<TableHead className="min-w-[120px]">Số điện thoại</TableHead>
								<TableHead className="min-w-[200px]">Email</TableHead>
								<TableHead className="min-w-[240px]">Địa chỉ</TableHead>
								<TableHead className="min-w-[140px]">Tài khoản</TableHead>
								<TableHead className="text-center w-[120px]">Thao tác</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{pageData.map((emp) => (
								<TableRow key={emp.id}>
									<TableCell className="font-medium">
										<div className="flex items-center gap-3">
											<div className="h-8 w-8 rounded-full overflow-hidden bg-slate-100 border">
												{emp.personal.avatarUrl ? (
													<Image src={emp.personal.avatarUrl} alt={emp.personal.fullName} width={32} height={32} className="h-8 w-8 object-cover" />
												) : null}
											</div>
											<div className="flex flex-col">
												<span className="text-xs font-medium text-slate-800">{emp.personal.fullName}</span>
											</div>
										</div>
									</TableCell>
									<TableCell className="whitespace-nowrap">{emp.personal.idNumber}</TableCell>
									<TableCell className="whitespace-nowrap">{emp.personal.phoneNumber}</TableCell>
									<TableCell className="truncate max-w-[200px]">{emp.personal.email}</TableCell>
									<TableCell className="truncate max-w-[260px]">{emp.personal.address}</TableCell>
									<TableCell className="truncate max-w-[160px]">{emp.account?.username}</TableCell>
									<TableCell className="text-center">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<MoreHorizontal size={18} color="#64748b" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem asChild>
													<Link href={`/employees/${emp.id}`} className="hover:bg-[#e0e7ef] hover:text-[#2563eb]">
														Chi tiết
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem className="hover:bg-[#fee2e2] hover:text-[#b91c1c]">
													Xóa
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
			<div className="flex items-center justify-between">
				<p className="text-xs text-muted-foreground">Tổng {total} nhân viên</p>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>
						Trước
					</Button>
					<span className="text-xs text-muted-foreground">{page}/{totalPages}</span>
					<Button variant="outline" size="sm" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
						Sau
					</Button>
				</div>
			</div>
		</div>
	);
}


