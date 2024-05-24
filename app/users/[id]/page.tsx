import prisma from '@/prisma/db';
import { userSchema } from '@/ValidationSchema/users';
import UserForm from '@/components/UserForm';

interface Props {
  params: { id: string };
}

const EditUserPage = async ({ params }: Props) => {
  const user = await prisma?.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return <p className={'text-destructive'}>User Not Found.</p>;
  }

  // clear the password field of the user object before passing it to the UserForm component.
  // To ensure that the password field of the user object does not contain any sensitive data,
  // it is explicitly set to an empty string with user.password = '';. This way, when the UserForm
  // component receives the user object, the password field is already empty and ready for the user
  // to enter a new password if they choose to do so.
  user.password = '';
  return <UserForm user={user} />;
};

export default EditUserPage;
