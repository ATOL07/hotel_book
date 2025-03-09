

import { useState, useEffect } from 'react';
import { fetchUsers } from '../api-client';

const UserList = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const getUsers = async () => {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        setLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    // 🔍 Search Filter
    const filteredUsers = users.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase())
    );

    // 🔄 Sorting Users
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.firstName.localeCompare(b.firstName);
        } else {
            return b.firstName.localeCompare(a.firstName);
        }
    });

    // 📋 Copy Email to Clipboard
    const copyToClipboard = (email: string) => {
        navigator.clipboard.writeText(email);
        alert(`Copied: ${email}`);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                <p className="text-gray-600 text-lg">Loading users...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">User List</h1>

            {/* 🔍 Search & Sorting */}
            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="p-2 border rounded-lg w-full sm:w-1/2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="p-2 border rounded-lg"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">Sort A-Z</option>
                    <option value="desc">Sort Z-A</option>
                </select>
            </div>

            <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                {sortedUsers.map((user) => (
                    <li
                        key={user?._id}
                        className="p-4 bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition duration-300"
                    >
                        <div className="flex flex-col gap-2">
                            <p className="text-lg font-semibold text-gray-700">
                                Name: {user.firstName} {user.lastName}
                            </p>
                            <p
                                className="text-gray-500 cursor-pointer hover:text-blue-500"
                                onClick={() => copyToClipboard(user.email)}
                            >
                                {user.email} 📋
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
