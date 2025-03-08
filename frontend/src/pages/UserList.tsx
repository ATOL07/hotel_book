// import { useState, useEffect } from 'react'
// import { fetchUsers } from '../api-client'
// const UserList = () => {

//     const [loading, setLoading] = useState(false);
//     const [users, setUsers] = useState<any[]>([])

//     const getUsers = async () => {

//         setLoading(true);
//         const data = await fetchUsers();
//         setUsers(data)
//         setLoading(false)

//     }

//     useEffect(() => {
//         getUsers();
//     }, [])


//     if (loading) {
//         return <div>Loading</div>
//     }

//     const renderUsers = () => {

//         return users.map((user) => {
//             return <li key={user?._id} className='flex flex-col px-4 py-2 bg-gray-300 rounded-md shadow-md'>
//                 {/* {JSON.stringify(user)} */}
//                 <div  className='flex gap-2 font-semibold'>
//                     <p>First Name:{user.firstName}</p>
//                     <p>Last Name:{user.lastName}</p>
//                 </div>
//                 <p>User Email:{user.email}</p>

//             </li>
//         })
//     }

//     return <div>
//         <h1>User List</h1>
//         <ul className="gap-4 flex flex-col">
//             {renderUsers()}
//         </ul>
//     </div>
// }

// export default UserList


import { useState, useEffect } from 'react';
import { fetchUsers } from '../api-client';

const UserList = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<any[]>([]);

    const getUsers = async () => {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        setLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">User List</h1>
            <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                {users.map((user) => (
                    <li
                        key={user?._id}
                        className="p-4 bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition duration-300"
                    >
                        <div className="flex flex-col gap-2">
                            <p className="text-lg font-semibold text-gray-700">
                               Name: {user.firstName} {user.lastName}
                            </p>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
