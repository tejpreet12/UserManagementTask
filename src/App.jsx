import  { useState } from 'react';
import UserForm from "../src/components/UserForm"
import UserList from "../src/components/UserList"
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
  const [showNew, setShowNew] = useState(true);
  const [showAddNewUser,setShowAddNewUser] = useState(false);

  return (

    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">User Management</h1>

      {showNew ? (
        <div className="text-center mb-6">
          <button
            onClick={() => {
              setShowNew(true)
              setShowAddNewUser(true);
            }}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition"
          >
            Add New User
          </button>
        </div>
      ) : (
        null
      )}

      {showAddNewUser? (
        <div className="mb-6 bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Create New User</h2>
          <UserForm onFinish={() => {
            setShowNew(false)
            setShowAddNewUser(false);
            }}
            onRequestCancel = {() => {
              setShowAddNewUser(false);
            }}
            />
        </div>
      ): (
        null
      )}



    <UserList setShowNew={setShowNew} />
    </div>

  );
}
