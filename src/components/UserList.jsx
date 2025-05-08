import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { removeUser } from '../redux/slices/usersSlice';
import UserForm from './UserForm';

export default function UserList({setShowNew }) {
  const users = useAppSelector(state => state.users.users);
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(null);

  return (
    <div className="space-y-6">
      {editing && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Edit User</h2>
          <UserForm
            editing={editing}
            onFinish={() => setEditing(null)}
          />
        </div>
      )}

      {/* Users table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">DOB</th>
              <th className="px-4 py-2">Experiences</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map(user => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.contact}</td>
                <td className="px-4 py-2">
                  {new Date(user.dob).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <ul className="list-disc list-inside space-y-1">
                    {user.experiences.map(exp => (
                      <li key={exp.id}>
                        {exp.company}: {new Date(exp.from).toLocaleDateString()} –{' '}
                        {new Date(exp.to).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(user);
                      setShowNew(true);
                    }}
                    className="px-3 py-1 bg-yellow-300 rounded hover:bg-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch(removeUser(user.id))}
                    className="mt-2 mb-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No users added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
