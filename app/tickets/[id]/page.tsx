import prisma from '@/prisma/db';
import TicketDetail from '@/app/tickets/TicketDetail';

interface Props {
  params: { id: string };
}

const ViewTicketPage = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  const users = await prisma.user.findMany();

  if (!ticket) {
    return <p className={'text-destructive'}>Ticket Not Found...</p>;
  }
  return <TicketDetail ticket={ticket} users={users} />;
};

export default ViewTicketPage;
