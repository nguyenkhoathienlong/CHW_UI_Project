"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EMPLOYEES_SEED } from "../../../../constants/employees";
import { Employee } from "../../../../types/employee";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Badge } from "../../../../components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default function EmployeeDetailPage() {
	const params = useParams();
	const router = useRouter();
	const id = String(params?.id);
	const employee = useMemo<Employee | undefined>(() => EMPLOYEES_SEED.find((e) => e.id === id), [id]);
	const [isEditing, setIsEditing] = useState(false);
	const [form, setForm] = useState(employee?.personal);

	if (!employee) {
		return (
			<div className="p-6">
				<p className="text-sm text-muted-foreground">Không tìm thấy nhân viên.</p>
				<Button className="mt-3" variant="outline" onClick={() => router.push("/employees")}>Quay lại</Button>
			</div>
		);
	}

	return (
		<div className="p-4 md:p-6 space-y-4">
			<div className="flex items-start justify-between">
				<div>
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-4 mb-4">
							<Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
								<ArrowLeft className="h-4 w-4" /> Quay lại
							</Button>
						</div>
					</div>
					<h1 className="font-bold text-2xl text-[#222] mb-1 tracking-tight">Hồ sơ nhân viên</h1>
					<div className="text-[#64748b] text-sm">Xem và cập nhật thông tin cá nhân, tài khoản liên quan.</div>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" onClick={() => setIsEditing((v) => !v)}>{isEditing ? "Hủy" : "Cập nhật"}</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle>Thông tin cá nhân</CardTitle>
					</CardHeader>
					<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<label className="text-sm">Họ và tên</label>
							<Input disabled={!isEditing} defaultValue={employee.personal.fullName} onChange={(e) => setForm({ ...employee.personal, fullName: e.target.value })} />
						</div>
						<div className="space-y-2">
							<label className="text-sm">Số CC/CCCD</label>
							<Input disabled={!isEditing} defaultValue={employee.personal.idNumber} onChange={(e) => setForm({ ...employee.personal, idNumber: e.target.value })} />
						</div>
						<div className="space-y-2">
							<label className="text-sm">Số điện thoại</label>
							<Input disabled={!isEditing} defaultValue={employee.personal.phoneNumber} onChange={(e) => setForm({ ...employee.personal, phoneNumber: e.target.value })} />
						</div>
						<div className="space-y-2">
							<label className="text-sm">Email</label>
							<Input disabled={!isEditing} defaultValue={employee.personal.email} onChange={(e) => setForm({ ...employee.personal, email: e.target.value })} />
						</div>
						<div className="space-y-2 md:col-span-2">
							<label className="text-sm">Địa chỉ</label>
							<Input disabled={!isEditing} defaultValue={employee.personal.address} onChange={(e) => setForm({ ...employee.personal, address: e.target.value })} />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Thông tin tài khoản</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{employee.account ? (
							<div className="space-y-2">
								<div className="grid grid-cols-2 gap-2 text-xs">
									<p className="text-muted-foreground">Tài khoản</p>
									<p className="font-medium">{employee.account.username}</p>
									<p className="text-muted-foreground">Email</p>
									<p className="font-medium">{employee.account.email}</p>
									<p className="text-muted-foreground">Số điện thoại</p>
									<p className="font-medium">{employee.account.phoneNumber}</p>
									<p className="text-muted-foreground">Trạng thái</p>
									<p className="font-medium">
										<Badge variant={employee.account.isActive ? "success" : "destructive"}>
											{employee.account.isActive ? "Hoạt động" : "Bị khóa"}
										</Badge>
									</p>
									<p className="text-muted-foreground">Lần đặt lại mật khẩu</p>
									<p className="font-medium">{employee.account.lastPasswordResetAt ? new Date(employee.account.lastPasswordResetAt).toLocaleString() : "-"}</p>
								</div>
								<div className="flex items-center gap-2 pt-2">
									<Button size="sm" variant="outline">Đặt lại mật khẩu</Button>
									<Button size="sm" variant="secondary">Đổi mật khẩu</Button>
									<Button 
										size="sm" 
										variant={employee.account.isActive ? "destructive" : "secondary"}
										onClick={() => {
											// TODO: API call to toggle account status
											console.log('Toggle account status for', employee.id);
										}}
									>
										{employee.account.isActive ? "Hủy kích hoạt" : "Kích hoạt"}
									</Button>
								</div>
							</div>
						) : (
							<div className="space-y-3">
								<p className="text-xs text-muted-foreground">Nhân viên chưa có tài khoản</p>
								<Link href={`/employees/${employee.id}/create-account`}>
									<Button>Tạo tài khoản</Button>
								</Link>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}


