
/* eslint-disable */
import {Injectable} from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  Session, SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import {IDatabaseAuthService} from '../interfaces/database-auth-service.interface';
import {CustomSupabaseClient} from './supabase.client';
import {of} from 'rxjs';
export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseAuthService extends CustomSupabaseClient implements IDatabaseAuthService {
  session: AuthSession | null = null;

  constructor() {
    super();
  }

  getSession() : Promise<Session | null>{
    return this.supabase.auth.getSession().then(({data}) => {
      this.session = data.session;
      return this.session;
    });
  }

  // profile(user: User) {
  //   return this.supabase
  //     .from('profiles')
  //     .select(`username, website, avatar_url`)
  //     .eq('id', user.id)
  //     .single();
  // }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signInWLink(email: string) {
    return this.supabase.auth.signInWithOtp({email});
  }

  signInWPw(email: string, password: string){
    return this.supabase.auth.signInWithPassword({email, password});
  }

  signUpWPw(email: string, password: string) {
    const creds: SignUpWithPasswordCredentials = {email, password};
    return this.supabase.auth.signUp(creds);
  }

  setPasswordWithSession(password: string, session: Session) {
    this.session = session;
    return this.setPassword(password);
  }

  setPassword(password: string) {
    if(!this.session){
      this.getSession().then((result)=> {
        return this.setPw(password);
      });

    }else {
      return this.setPw(password);
    }
    return new Promise((resolve) => { resolve("")});

  }

  signUpWithPw(email: string, password: string) {
    return this.supabase.auth.signUp({email, password})
  }

  private setPw(password: string){
    return this.supabase.auth.getUser(this.session?.access_token).then((response)=> {
      return this.supabase.auth.updateUser({email: response.data.user?.email, password, phone: response.data.user?.phone, data: response.data.user?.user_metadata});
    });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  sendResetPasswordLink(email: string, redirectTo:string){
    console.log(redirectTo);
    return this.supabase.auth.resetPasswordForEmail(email, {redirectTo: redirectTo});
  }
}
