import { Ticket, User } from '@prisma/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import TicketPriority from '@/components/TicketPriority';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import DeleteButton from '@/app/api/tickets/[id]/DeleteButton';
import AssignTicket from '@/components/AssignTicket';

interface Props {
  ticket: Ticket;
  users: User[];
}

const TicketDetail = ({ ticket, users }: Props) => {
  return (
    <div className={'lg:grid lg:grid-cols-4'}>
      <Card className={'col-span-3 mx-4 mb-4'}>
        <CardHeader>
          <div className={'flex justify-between mb-3'}>
            <TicketStatusBadge status={ticket.status} />
            <TicketPriority priority={ticket.priority} />
          </div>
          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>
            Created:{' '}
            {ticket.createdAt.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className={'prose　dark:prose-invert'}>
          <ReactMarkdown>{ticket.description}</ReactMarkdown>
        </CardContent>
        <CardFooter>
          <p>
            Updated:{' '}
            {ticket.updatedAt.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </CardFooter>
      </Card>
      <div className={'mx-4 flex lg:flex-col lg:mx-0 gap-2'}>
        <AssignTicket ticket={ticket} users={users} />
        <Link href={`/tickets/edit/${ticket.id}`} className={`${buttonVariants({ variant: 'default' })}`}>
          Edit Ticket
        </Link>
        <DeleteButton ticketId={ticket.id} />
      </div>
    </div>
  );
};

export default TicketDetail;
