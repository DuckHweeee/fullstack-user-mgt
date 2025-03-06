export type UserRole = 'ADMIN' | 'USER' | 'MANAGER';
export type UserStatus = 'Active' | 'Inactive' | 'Pending';

export interface User {
  id: number;
  name: string;
  emailId: string;
  role: UserRole;
  status: UserStatus;
  createTime: string; 
}

export interface UserFormData {
  name: string;
  emailId: string;
  role: UserRole;
  status: UserStatus;
}
