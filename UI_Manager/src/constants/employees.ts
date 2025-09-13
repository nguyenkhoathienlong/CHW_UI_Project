import { Employee } from "../types/employee";

export const EMPLOYEES_SEED: Employee[] = [
	{
		id: "EMP-001",
		personal: {
			fullName: "Nguyen Van A",
			idNumber: "012345678901",
			phoneNumber: "0901000001",
			email: "a.nguyen@example.com",
			address: "123 Le Loi, Q1, TP.HCM",
			avatarUrl: "/vercel.svg",
		},
		account: {
			username: "nguyenvana",
			email: "a.nguyen@example.com",
			phoneNumber: "0901000001",
			lastPasswordResetAt: new Date().toISOString(),
			isActive: true,
		},
	},
	{
		id: "EMP-002",
		personal: {
			fullName: "Tran Thi B",
			idNumber: "079999999999",
			phoneNumber: "0902000002",
			email: "b.tran@example.com",
			address: "25 Nguyen Hue, Q1, TP.HCM",
			avatarUrl: "/next.svg",
		},
		account: {
			username: "tranthib",
			email: "b.tran@example.com",
			phoneNumber: "0902000002",
			lastPasswordResetAt: new Date().toISOString(),
			isActive: true,
		},
	},
	{
		id: "EMP-003",
		personal: {
			fullName: "Le Van C",
			idNumber: "031111111111",
			phoneNumber: "0903000003",
			email: "c.le@example.com",
			address: "56 Vo Van Tan, Q3, TP.HCM",
			avatarUrl: "/globe.svg",
		},
		account: {
			username: "levanc",
			email: "c.le@example.com",
			phoneNumber: "0903000003",
			lastPasswordResetAt: new Date().toISOString(),
			isActive: false,
		},
	},
];


