import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setSelectedUser } from '../../store/userSlice';
import type { User } from '../../types/user';

const UserCard = ({ user, index }: { user: User; index: number }) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
    >
      <div className="relative mb-4">
        <img src={user.image} className="w-20 h-20 rounded-2xl bg-slate-50 object-cover border-2 border-white shadow-sm" alt={user.firstName}/>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
      </div>

      <h3 className="text-lg font-black text-slate-800 tracking-tight">{user.firstName} {user.lastName}</h3>
      <p className="text-slate-400 text-xs font-bold mt-1 mb-4">{user.email}</p>
      
      <div className="w-full pt-4 border-t border-slate-50 mb-5 space-y-3">
        <div className="flex items-center gap-3 text-slate-600">
          <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-[13px] font-bold truncate">{user.address.city}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600">
          <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="text-[13px] font-bold truncate">{user.company.name}</span>
        </div>
      </div>

      <button 
        onClick={() => dispatch(setSelectedUser(user))}
        className="w-full py-3.5 bg-blue-600 font-bold text-white text-[12px]  rounded-2xl transition-all duration-300 tracking-[0.1em] uppercase  active:scale-95"
      >
        View Details
      </button>
    </motion.div>
  );
};

export default UserCard;