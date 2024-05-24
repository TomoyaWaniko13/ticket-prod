import NextAuth, { DefaultSession } from 'next-auth/next';
import { JWT } from 'next-auth/jwt';
import { Role } from '@prisma/client';

// NextAuthの型定義を拡張
declare module 'next-auth' {
  // セッションにカスタムフィールドを追加
  // セッションオブジェクトに追加したusernameとroleの情報は、以下のような場面で利用されます：
  //
  // 1. アクセス制御
  // 目的: ユーザーの役割に基づいて、アクセスできるページや機能を制限するため。
  // 例: 管理者だけがアクセスできる管理パネルや機能。

  // if (session.user.role === 'admin') {
  //   // 管理者向けの機能やページを表示
  // } else {
  //   // 一般ユーザー向けのコンテンツを表示
  // }
  interface Session {
    user: {
      username: string;
      role: string;
    } & DefaultSession['user'];
  }

  // ユーザー情報にカスタムフィールドを追加
  interface User {
    id: number;
    name: string;
    username: string;
    role: Role;
  }
}

// JWTトークンの型定義を拡張
declare module 'next-auth/jwt' {
  interface JWT {
    role?: string; // オプションの役割フィールド
  }
}
