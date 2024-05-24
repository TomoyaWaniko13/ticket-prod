import dynamic from 'next/dynamic';
import prisma from '@/prisma/db';

const TicketForm = dynamic(() => import('@/components/TicketForm'), {
  ssr: false,
});

interface Props {
  params: { id: string };
}

const EditTicketPage = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return <p className={'text-destructive'}>ticket not found!</p>;
  }

  return <TicketForm ticket={ticket} />;
};

export default EditTicketPage;
