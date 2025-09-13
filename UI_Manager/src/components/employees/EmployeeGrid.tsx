"use client";

import Image from "next/image";
import Link from "next/link";
import { Employee } from "../../types/employee";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface EmployeeGridProps {
	employees: Employee[];
	page: number;
	pageSize: number;
	onPageChange: (page: number) => void;
}

export function EmployeeGrid({ employees, page, pageSize, onPageChange }: EmployeeGridProps) {
	const total = employees.length;
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const start = (page - 1) * pageSize;
	const pageData = employees.slice(start, start + pageSize);

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
				{pageData.map((emp) => (
					<Card key={emp.id} className="border bg-white hover:shadow-sm transition-shadow">
						<CardContent className="p-4">
							<div className="flex items-start gap-3">
								<div className="h-12 w-12 rounded-full overflow-hidden bg-slate-100 border flex-shrink-0">
									{emp.personal.avatarUrl ? (
										<Image src={emp.personal.avatarUrl} alt={emp.personal.fullName} width={48} height={48} className="h-12 w-12 object-cover" />
									) : null}
								</div>
								<div className="min-w-0 flex-1">
									<div className="flex items-center justify-between gap-3">
										<div className="min-w-0">
											<p className="text-sm font-semibold text-slate-900 truncate">{emp.personal.fullName}</p>
											<p className="text-[11px] text-muted-foreground truncate">{emp.personal.email}</p>
										</div>
										<Link href={`/employees/${emp.id}`}>
											<Button size="sm" variant="outline">Chi tiết</Button>
										</Link>
									</div>
									<div className="mt-3 grid grid-cols-2 gap-2 text-xs">
										<div className="text-muted-foreground">Mã/CCCD</div>
										<div className="font-medium truncate">{emp.personal.idNumber}</div>
										<div className="text-muted-foreground">Điện thoại</div>
										<div className="font-medium truncate">{emp.personal.phoneNumber}</div>
										<div className="text-muted-foreground">Địa chỉ</div>
										<div className="font-medium truncate">{emp.personal.address}</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
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


