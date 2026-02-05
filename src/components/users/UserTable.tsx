import UserCard from '../shared/UserCard';
import type { User } from '../../types/user';

interface Props {
  users: User[];
  onOpenModal: (user: User) => void;
}

const UserTable = ({ users, onOpenModal }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user, index) => (
        <UserCard key={user.id} user={user} index={index} onOpen={onOpenModal} />
      ))}
    </div>
  );
};

export default UserTable;