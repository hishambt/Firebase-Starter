import { User } from '@angular/fire/auth';

export type IUser = {
	uid: string;
	email?: string;
	firstName: string;
	lastName: string;
	phone?: string;
	address?: string;
	photoURL?: string;
};
export type AuthUser = User | null;
