import { User } from "@/types/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  if (!Array.isArray(users)) {
    return <div>No users data available</div>
  }

  if (users.length === 0) {
    return <div className="text-center py-4">No users found</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Create Time</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.emailId}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs ${
                user.status === 'Active' ? 'bg-green-100 text-green-800' :
                user.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {user.status}
              </span>
            </TableCell>
            <TableCell>
              {new Date(user.createTime).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => onEdit(user)}
              >
                Edit
              </Button>
              <Button variant="destructive" onClick={() => onDelete(user.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
