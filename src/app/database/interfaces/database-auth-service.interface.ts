import {AuthChangeEvent, Session} from '@supabase/supabase-js';

export interface IDatabaseAuthService {
  getSession(): Promise<Session | null>;
  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void): any;
  signInWLink(email: string): any;
  signInWPw(email: string, password: string): any;
  setPassword(password: string): any;
  signUpWithPw(email: string, password: string): any;
  signOut(): any;
  sendResetPasswordLink(email: string, redirectTo: string): any;
  setPasswordWithSession(password: string, session: Session): any;
  signUpWPw(email: string, password: string): any;
}
