export type AccountStatus = 'has_account' | 'no_account';

export interface EmployeeAccount {
	username: string;
	email: string;
	phoneNumber: string;
	lastPasswordResetAt?: string;
	isActive?: boolean;
}

export type EmployeeRole = 'manager' | 'staff' | 'hr' | 'accountant' | 'other';

export interface EmployeePersonalInfo {
	fullName: string;
	idNumber: string;
	phoneNumber: string;
	email: string;
	address: string;
	avatarUrl?: string;
}

export interface Employee {
	id: string;
	personal: EmployeePersonalInfo;
	account?: EmployeeAccount; // undefined means no account yet
	role?: EmployeeRole;
}


