"use client";

import Image from "next/image";
import { useState } from "react";
import { EmployeePersonalInfo, EmployeeRole } from "../../types/employee";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

interface EmployeeFormProps {
	initial?: Partial<EmployeePersonalInfo> & { role?: EmployeeRole };
	onSubmit: (data: EmployeePersonalInfo & { username?: string; password?: string; role?: EmployeeRole }) => void;
	onCancel?: () => void;
}

export function EmployeeForm({ initial, onSubmit, onCancel }: EmployeeFormProps) {
	const [form, setForm] = useState<EmployeePersonalInfo>({
		fullName: initial?.fullName || "",
		idNumber: initial?.idNumber || "",
		phoneNumber: initial?.phoneNumber || "",
		email: initial?.email || "",
		address: initial?.address || "",
		avatarUrl: initial?.avatarUrl,
	});
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [role, setRole] = useState<EmployeeRole>(initial?.role || 'staff');

	return (
		<Card>
			<CardHeader className="pb-4">
				<CardTitle className="text-base">Thông tin nhân viên</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<label className="text-sm">Họ và tên</label>
					<Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
				</div>
				<div className="space-y-2">
					<label className="text-sm">Số CC/CCCD</label>
					<Input value={form.idNumber} onChange={(e) => setForm({ ...form, idNumber: e.target.value })} />
				</div>
				<div className="space-y-2">
					<label className="text-sm">Số điện thoại</label>
					<Input value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
				</div>
				<div className="space-y-2">
					<label className="text-sm">Email</label>
					<Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
				</div>
				<div className="space-y-2 md:col-span-2">
					<label className="text-sm">Địa chỉ</label>
					<Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
				</div>
				<div className="space-y-2 md:col-span-2">
					<label className="text-sm">Vai trò</label>
					<select
						value={role}
						onChange={(e) => setRole(e.target.value as EmployeeRole)}
						className="text-xs h-8 px-2 bg-white border border-[#e5e7eb] rounded-[5px] focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
					>
						<option value="manager">Quản lý</option>
						<option value="staff">Nhân viên</option>
						<option value="hr">Nhân sự</option>
						<option value="accountant">Kế toán</option>
						<option value="other">Khác</option>
					</select>
				</div>
				<div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
					<div className="space-y-2">
						<label className="text-sm">Tài khoản (tùy chọn)</label>
						<Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Đặt tên đăng nhập" />
					</div>
					<div className="space-y-2">
						<label className="text-sm">Mật khẩu</label>
						<Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					</div>
					<div className="space-y-2">
						<label className="text-sm">Nhập lại mật khẩu</label>
						<Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex items-center justify-between gap-2">
				<div className="text-[11px] text-muted-foreground">Có thể tạo tài khoản ngay hoặc bỏ qua để thêm sau.</div>
				{onCancel && (
					<Button variant="outline" onClick={onCancel}>Hủy</Button>
				)}
				<Button onClick={() => onSubmit({ ...form, username, password, role })}>Lưu</Button>
			</CardFooter>
		</Card>
	);
}


