import { Priority } from '@prisma/client';
import { Flame } from 'lucide-react';

interface Props {
  priority: Priority;
}

const priorityMap: Record<Priority, { label: string; level: 1 | 2 | 3 }> = {
  HIGH: { label: 'High', level: 3 },
  MEDIUM: { label: 'Medium', level: 2 },
  LOW: { label: 'Low', level: 1 },
};

const TicketPriority = ({ priority }: Props) => {
  return (
    <div className='flex'>
      <Flame className={`${priorityMap[priority].level >= 1 ? 'text-red-500' : 'text-gray-300'}`} />
      <Flame className={`${priorityMap[priority].level >= 2 ? 'text-red-500' : 'text-gray-300'}`} />
      <Flame className={`${priorityMap[priority].level >= 3 ? 'text-red-500' : 'text-gray-300'}`} />
    </div>
  );
};

export default TicketPriority;
