import dynamic from 'next/dynamic';

const TicketForm = dynamic(() => import('@/components/TicketForm'), { ssr: false });

const NewtTicket = () => {
  return (
    <div>
      <TicketForm />
    </div>
  );
};

export default NewtTicket;
