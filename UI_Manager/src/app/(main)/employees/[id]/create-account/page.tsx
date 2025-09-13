"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { useState } from "react";

export default function CreateAccountPage() {
	const { id } = useParams();
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	return (
		<div className="p-4 md:p-6 space-y-4 max-w-xl">
			<div className="flex items-start justify-between">
				<div>
					<div className="flex items-center gap-2 mb-1">
						<button onClick={() => router.back()} className="text-[#2563eb] text-xs hover:underline">Quay lại</button>
					</div>
					<h1 className="font-bold text-2xl text-[#222] mb-1 tracking-tight">Tạo tài khoản</h1>
					<div className="text-[#64748b] text-sm">Thiết lập thông tin đăng nhập cho nhân viên {String(id)}.</div>
				</div>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Thông tin tài khoản</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="space-y-1">
						<label className="text-sm">Tài khoản</label>
						<Input value={username} onChange={(e) => setUsername(e.target.value)} />
					</div>
					<div className="space-y-1">
						<label className="text-sm">Mật khẩu</label>
						<Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					</div>
					<div className="space-y-1">
						<label className="text-sm">Nhập lại mật khẩu</label>
						<Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
					</div>
					<div className="flex items-center justify-end gap-2 pt-2">
						<Button variant="outline" onClick={() => router.back()}>Hủy</Button>
						<Button onClick={() => router.push(`/employees/${id}`)}>Tạo và quay lại</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}


