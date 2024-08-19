// src/types/session.d.ts

import 'cookie-session';

declare module 'cookie-session' {
  interface CookieSessionObject {
    data?: {
      name: string;
      email: string;
      password: string;
      userType: string;
      otp: string;
    };
  }
}
