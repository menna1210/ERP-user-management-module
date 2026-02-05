import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedUser } from '../../store/userSlice';
import type { RootState } from '../../store/store';

const UserModal = () => {
  const { selectedUser: user } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  return (
    <AnimatePresence>
      {user && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => dispatch(clearSelectedUser())}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10"
          >
            <button 
              onClick={() => dispatch(clearSelectedUser())}
              className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full flex items-center justify-center z-20 transition-all group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-700"></div>
            <div className="px-10 pb-12">
              <div className="relative -mt-12 mb-8 flex items-end gap-6">
                <img src={user.image} className="w-24 h-24 rounded-[2rem] border-4 border-white dark:border-slate-900 shadow-xl bg-slate-50 object-cover" />
                <div className="pb-2">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight leading-none">{user.firstName} {user.lastName}</h2>
                  <p className="text-blue-600 text-sm font-semibold mt-1">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 border-t border-slate-50 dark:border-slate-800 pt-10">
                <DetailBox label="Location" value={user.address.city} />
                <DetailBox label="Company" value={user.company.name} />
                <DetailBox label="Job Title" value={user.company.title} />
                <DetailBox label="Department" value={user.company.department} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const DetailBox = ({ label, value }: { label: string, value: string }) => (
  <div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-[15px] font-medium text-slate-600 dark:text-slate-300">{value}</p>
  </div>
);

export default UserModal;