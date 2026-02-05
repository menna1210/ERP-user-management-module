import type { User } from '../../types/user';
import { useDispatch } from 'react-redux';
import { setSelectedUser } from '../../store/userSlice';

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
  const dispatch = useDispatch();

  return (
    <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-slate-400 text-[11px] uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
            <th className="p-6 font-bold">User</th>
            <th className="p-6 font-bold">Email</th>
            <th className="p-6 font-bold">Company</th>
            <th className="p-6 font-bold text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0">
              <td className="p-6">
                <div className="flex items-center gap-3">
                  <img src={user.image} className="w-10 h-10 rounded-xl bg-slate-100 object-cover" alt="" />
                  <span className="font-bold text-slate-700 dark:text-slate-200">{user.firstName} {user.lastName}</span>
                </div>
              </td>
              <td className="p-6 text-sm text-slate-500 dark:text-slate-400 font-medium">{user.email}</td>
              <td className="p-6 text-sm text-slate-500 dark:text-slate-400 font-medium">{user.company.name}</td>
              <td className="p-6 text-right">
                <button 
                  onClick={() => dispatch(setSelectedUser(user))}
                  className="px-5 py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white text-xs font-black rounded-xl transition-all duration-300 transform active:scale-95"
                >
                  VIEW DETAILS
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;