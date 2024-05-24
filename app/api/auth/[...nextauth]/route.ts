import NextAuth from 'next-auth';
import options from './options';

// Imagine you are visiting a club that has a reception desk.
// The reception desk handles various types of requests from club members,
// such as checking in (signing in), checking out (signing out), and verifying
// membership status. The reception desk has a single staff member who can handle
// all these requests, whether you come in person or call on the phone.
const handler = NextAuth(options);

// Explanation: By exporting the handler as both GET and POST, the club ensures
// that the reception desk can process both types of requests using the same staff member:
// GET Requests: Similar to handling in-person visits where members come to check their
// membership status or view the sign-in/sign-out pages.
// POST Requests: Similar to handling phone calls where members submit their
// check-in/check-out actions or process other actions like OAuth callbacks.
export { handler as GET, handler as POST };
