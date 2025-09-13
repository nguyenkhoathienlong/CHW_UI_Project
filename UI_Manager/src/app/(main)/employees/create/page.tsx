"use client";

import { useRouter } from "next/navigation";
import { EmployeeCreateStepper } from "../../../../components/employees/EmployeeCreateStepper";
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
} from 'lucide-react';

export default function EmployeeCreatePage() {
	const router = useRouter();
	return (
		<div className="p-4 md:p-6 space-y-4">
			<div className="flex items-center gap-2 mb-2">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => router.back()}
					className="flex items-center gap-2"
					>
					<ArrowLeft className="h-4 w-4" />
					Quay lại
				</Button>
			</div>
			<div className="mb-6">
        		<h1 className="font-bold text-[26px] text-[#222] mb-1 tracking-tight">Thêm nhân viên</h1>
        		<div className="text-[#64748b] text-[15px]">Thêm nhân viên mới vào đơn vị</div>
      		</div>
			<EmployeeCreateStepper
				onSubmit={() => {
					// TODO: integrate API
					router.push("/employees");
				}}
				onCancel={() => router.back()}
			/>
		</div>
	);
}


