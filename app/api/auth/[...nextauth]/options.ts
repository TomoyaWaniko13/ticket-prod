import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/prisma/db';
import bcrypt from 'bcryptjs';

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'password',
      name: 'Username and Password',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Username...',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { username: credentials!.username },
        });

        if (!user) {
          return null;
        }

        const match = await bcrypt.compare(credentials!.password, user.password);

        if (match) {
          return user;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    // tokenはデジタルパスポート：
    // あなたが誰であるかを証明するためのデジタルな証明書。 ログイン後に発行され、
    // ウェブサイトやアプリでの活動中にあなたが認証済みであることを示すために使われる。

    // accountはログイン情報。
    // ユーザーがログインした際の認証プロバイダーから提供される情報(ログイン情報)を指します。

    // userはログインに成功したユーザーの詳細情報。
    async jwt({ token, account, user }) {
      // もしaccount情報があれば、tokenにuser.roleを設定する。
      // user.roleは、ログインに成功したユーザーの役割（例えば、管理者、一般ユーザーなど）を示します。
      // token.roleにこの情報を設定することで、トークン内にユーザーの役割情報が含まれるようになります。
      if (account) {
        token.role = user.role;
      }
      return token; // 設定されたtokenを返す。
    },

    // session
    // サーバー側の一時的な記憶：
    // 意味：サーバーでユーザーごとに一時的にデータを保存する仕組み。
    // 使い方：ユーザーがログインしている間、その情報をサーバーで保持し、次のリクエストで使えるようにする。

    // token
    // デジタルパスポート：
    // 意味：あなたが誰であるかを証明するためのデジタルな証明書。
    // 使い方：ログイン後に発行され、ウェブサイトやアプリでの活動中にあなたが認証済みであることを示すために使われる。
    session({ session, token }) {
      // もしユーザーがログインしていたら、そのユーザーにtokenのroleを設定する。
      // セッションにユーザーの役割情報を持たせることで、アプリケーション内の異なる部分でユーザーの
      // 権限を簡単にチェックできるようになります。例えば、管理者ユーザーだけがアクセスできる管理ページや機能を
      // 制御することができます。

      // session.user.roleはユーザーの役割情報をセッションオブジェクト内に保存したもので、
      // "サーバー側"でセッション管理システムによって保持される。
      // 使用目的は、ユーザーがサイトを利用している間、そのuserのrole情報を持続的に保持し、
      // サーバーがユーザーのリクエストを処理する際に利用する。

      // token.roleは、userのrole情報をJWT（JSON Web Token）内に保存したもの。token.roleはtokenとして"クライアント"
      // （ユーザーのブラウザやアプリ）に渡され、後続のリクエスト時にサーバーに送信される。
      // 使用目的は、クライアントから送られてくるリクエストが認証済みかどうかを確認し、ユーザーの役割に基づいて適切な権限を適用する。

      // つまり、userがログインしている間(session.user is true)、そのrole情報はサーバー側のsessionに保存されます。
      if (session.user) {
        session.user.role = token.role || 'USER';
      }
      return session;
    },
  },
};

export default options;
