"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useRef } from "react";

interface EmployeesToolbarProps {
	query: string;
	onQueryChange: (q: string) => void;
}

export function EmployeesToolbar({ query, onQueryChange }: EmployeesToolbarProps) {
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const onSearch = (v: string) => {
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => onQueryChange(v), 300);
	};
	return (
		<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
			<div className="flex items-center gap-2 w-full md:w-[420px]">
				<Input defaultValue={query} placeholder="Tìm kiếm theo tên, CC/CCCD, email, SĐT..." onChange={(e) => onSearch(e.target.value)} />
			</div>
			<div className="flex items-center gap-2 w-full md:w-auto">
				<Link href="/employees/create">
					<Button className="whitespace-nowrap">Thêm nhân viên</Button>
				</Link>
			</div>
		</div>
	);
}


