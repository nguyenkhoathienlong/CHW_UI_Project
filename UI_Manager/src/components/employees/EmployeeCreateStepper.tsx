"use client";

import { useMemo, useState } from "react";
import { EmployeePersonalInfo, EmployeeRole } from "../../types/employee";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

interface EmployeeCreateStepperProps {
	onSubmit: (payload: EmployeePersonalInfo & { username?: string; password?: string; role?: EmployeeRole }) => void;
	onCancel?: () => void;
}

export function EmployeeCreateStepper({ onSubmit, onCancel }: EmployeeCreateStepperProps) {
	const [step, setStep] = useState<1 | 2>(1);
	const [personal, setPersonal] = useState<EmployeePersonalInfo>({
		fullName: "",
		idNumber: "",
		phoneNumber: "",
		email: "",
		address: "",
		avatarUrl: undefined,
	});
	// Location states
	const CITY_WARDS: Record<string, string[]> = {
		"TP. Hồ Chí Minh": ["Phường Bến Nghé", "Phường Bến Thành", "Phường Tân Định", "Phường 1", "Phường 2"],
		"Hà Nội": ["Phường Tràng Tiền", "Phường Hàng Bạc", "Phường Hàng Buồm", "Phường Cửa Đông"],
		"Đà Nẵng": ["Phường Thạch Thang", "Phường Hải Châu 1", "Phường Hải Châu 2"],
	};
	const cities = Object.keys(CITY_WARDS);
	const [city, setCity] = useState<string>("");
	const [ward, setWard] = useState<string>("");
	const [addressLine, setAddressLine] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [role, setRole] = useState<EmployeeRole>('staff');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

	const canNext = useMemo(() => {
		return (
			personal.fullName.trim().length > 0 &&
			personal.idNumber.trim().length > 0 &&
			personal.phoneNumber.trim().length > 0 &&
			personal.email.trim().length > 0 &&
			city.trim().length > 0 &&
			ward.trim().length > 0 &&
			addressLine.trim().length > 0
		);
	}, [personal, city, ward, addressLine]);

	const canSubmit = useMemo(() => {
		if (!username || !password || !confirmPassword) return false;
		if (password !== confirmPassword) return false;
		return true;
	}, [username, password, confirmPassword]);

	return (
		<div className="grid grid-cols-1 md:grid-cols-10 gap-4">
			{/* Vertical Stepper */}
			<div className="md:pt-1 md:col-span-2">
				<div className="rounded-lg border bg-white p-4">
					<div className="relative pl-10 gap-4">
						<div className="absolute left-3 top-4 bottom-4 w-[2px] bg-[#e5e7eb]" />
						<div className="flex md:flex-col gap-6">
							<div className="relative">
								<span className={`absolute -left-10 top-0 h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-semibold border ${step === 1 ? 'bg-[#2563eb] text-white border-[#2563eb]' : 'bg-white text-slate-700 border-[#cbd5e1]'}`}>1</span>
								<button
									type="button"
									onClick={() => setStep(1)}
									className={`w-full text-left rounded-[6px] px-3 py-2 border ${step === 1 ? 'bg-[#e0e7ef] text-[#2563eb] border-[#2563eb]' : 'bg-white text-slate-800 border-[#e5e7eb] hover:bg-gray-50'}`}
								>
									<p className="text-xs font-semibold mb-0.5">Thông tin cá nhân</p>
									<p className="text-[11px] text-muted-foreground">Họ tên, CCCD, liên hệ, địa chỉ</p>
								</button>
							</div>
							<div className="relative">
								<span className={`absolute -left-10 top-0 h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-semibold border ${step === 2 ? 'bg-[#2563eb] text-white border-[#2563eb]' : 'bg-white text-slate-700 border-[#cbd5e1]'}`}>2</span>
								<button
									type="button"
									onClick={() => { if (!canNext && step === 1) return; setStep(2); }}
									className={`w-full text-left rounded-[6px] px-3 py-2 border ${step === 2 ? 'bg-[#e0e7ef] text-[#2563eb] border-[#2563eb]' : (!canNext && step === 1 ? 'bg-white text-slate-400 border-[#e5e7eb] cursor-not-allowed' : 'bg-white text-slate-800 border-[#e5e7eb] hover:bg-gray-50')}`}
									disabled={!canNext && step === 1}
								>
									<p className="text-xs font-semibold mb-0.5">Thông tin tài khoản</p>
									<p className="text-[11px] text-muted-foreground">Tài khoản, mật khẩu, vai trò</p>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Content */}
			<div className="md:col-span-8">
				<div className="mb-2">
					<div className="h-1 w-full bg-[#e5e7eb] rounded">
						<div className={`h-1 rounded bg-[#2563eb]`} style={{ width: step === 1 ? '50%' : '100%' }} />
					</div>
				</div>
				{step === 1 && (
				<Card>
					<CardHeader className="pb-4">
						<CardTitle className="text-base">Thông tin cá nhân</CardTitle>
					</CardHeader>
					<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<label className="text-sm">Họ và tên</label>
							<Input value={personal.fullName} onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })} />
						</div>
						<div className="space-y-2">
							<label className="text-sm">Số CC/CCCD</label>
							<Input value={personal.idNumber} onChange={(e) => setPersonal({ ...personal, idNumber: e.target.value })} />
						</div>
						<div className="space-y-2">
							<label className="text-sm">Số điện thoại</label>
							<Input value={personal.phoneNumber} onChange={(e) => setPersonal({ ...personal, phoneNumber: e.target.value })} />
						</div>
						<div className="space-y-2">
							<label className="text-sm">Email</label>
							<Input type="email" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} />
						</div>
						<div className="space-y-2">
							<label className="text-sm">Thành phố/Tỉnh</label>
							<select
								value={city}
								onChange={(e) => {
									setCity(e.target.value);
									setWard("");
								}}
								className="text-xs h-8 px-2 bg-white border border-[#e5e7eb] rounded-[5px] focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
							>
								<option value="">Chọn thành phố/tỉnh</option>
								{cities.map((c) => (
									<option key={c} value={c}>{c}</option>
								))}
							</select>
						</div>
						<div className="space-y-2">
							<label className="text-sm">Phường/Xã</label>
							<select
								value={ward}
								onChange={(e) => setWard(e.target.value)}
								disabled={!city}
								className="text-xs h-8 px-2 bg-white border border-[#e5e7eb] rounded-[5px] focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full disabled:bg-slate-50"
							>
								<option value="">Chọn phường/xã</option>
								{(CITY_WARDS[city] || []).map((w) => (
									<option key={w} value={w}>{w}</option>
								))}
							</select>
						</div>
						<div className="space-y-2 md:col-span-2">
							<label className="text-sm">Địa chỉ (Số nhà, đường)</label>
							<Input value={addressLine} onChange={(e) => setAddressLine(e.target.value)} placeholder="Ví dụ: 123 Lê Lợi" />
						</div>
					</CardContent>
					<CardFooter className="flex items-center justify-end gap-2">
						<Button
							disabled={!canNext}
							onClick={() => {
								setPersonal((prev) => ({ ...prev, address: `${addressLine}, ${ward}, ${city}` }));
								setStep(2);
							}}
						>
							Tiếp tục
						</Button>
					</CardFooter>
				</Card>
				)}

				{step === 2 && (
				<Card>
					<CardHeader className="pb-4">
						<CardTitle className="text-base">Thông tin tài khoản</CardTitle>
					</CardHeader>
					<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<label className="text-sm">Tài khoản</label>
							<Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Đặt tên đăng nhập" />
						</div>
                        <div className="space-y-2">
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
						<div className="space-y-2">
							<label className="text-sm">Mật khẩu</label>
							<div className="relative">
								<Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
								<button type="button" aria-label="Toggle password" onClick={() => setShowPassword((v) => !v)} className="absolute right-2 top-1.5 p-1 text-slate-500 hover:text-slate-700">
									{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
								</button>
							</div>
						</div>
						<div className="space-y-2">
							<label className="text-sm">Nhập lại mật khẩu</label>
							<div className="relative">
								<Input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
								<button type="button" aria-label="Toggle confirm password" onClick={() => setShowConfirmPassword((v) => !v)} className="absolute right-2 top-1.5 p-1 text-slate-500 hover:text-slate-700">
									{showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
								</button>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex items-center justify-between gap-2">
						<Button variant="outline" onClick={() => setStep(1)}>Quay lại Bước 1</Button>
						<div className="flex items-center gap-2">
							<Button disabled={!canSubmit} onClick={() => onSubmit({ ...personal, username, password, role })}>Tạo nhân viên</Button>
						</div>
					</CardFooter>
				</Card>
				)}
			</div>
		</div>
	);
}


