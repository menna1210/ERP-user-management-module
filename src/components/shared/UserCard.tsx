import type { User } from '../../types/user';
import { useDispatch } from 'react-redux';
import { setSelectedUser } from '../../store/userSlice';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-500 rounded-[2.2rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-10"></div>
          <img 
            src={user.image} 
            className="w-28 h-28 rounded-[2rem] bg-slate-50 dark:bg-slate-800 object-cover relative z-10 border-4 border-white dark:border-slate-900 shadow-md"
            alt={user.firstName}
          />
        </div>
        
        <h3 className="text-xl font-black text-slate-800 dark:text-white mb-1 tracking-tight">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-blue-600 text-xs font-black uppercase tracking-widest mb-6">{user.company.title}</p>
        
        <div className="w-full space-y-3 mb-8">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-transparent hover:border-blue-100 dark:hover:border-slate-700 transition-colors">
            <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <span className="truncate font-medium">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-transparent hover:border-blue-100 dark:hover:border-slate-700 transition-colors">
            <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="font-medium">{user.address.city}</span>
          </div>
        </div>

        <button 
          onClick={() => dispatch(setSelectedUser(user))}
          className="w-full py-4 bg-blue-500 dark:bg-white text-white dark:text-slate-900 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 transform active:scale-95 shadow-xl shadow-slate-200 dark:shadow-none"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default UserCard;