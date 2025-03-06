"use client"

import { useEffect, useState } from "react"
import { User } from "@/types/user"
import { userService } from "@/services/userService"
import { UserTable } from "@/components/UserTable"
import { UserForm } from "@/components/UserForm"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadUsers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await userService.getUsers()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      setError("Failed to load users")
      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      setError(null);
      await userService.deleteUser(id);
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  const handleFormSubmit = async () => {
    try {
      await loadUsers();
      setIsFormOpen(false);
      setEditingUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh users");
    }
  };

  return (
    <main className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={() => setIsFormOpen(true)}>Add User</Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <UserTable 
          users={users} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {isFormOpen && (
        <UserForm
          user={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false)
            setEditingUser(null)
          }}
        />
      )}
    </main>
  )
}
