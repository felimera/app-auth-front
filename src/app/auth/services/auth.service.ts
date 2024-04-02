import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environments } from '../../environments/environments.prod';
import { Login, ResponseMessage, ResponseUser, Token, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);

  public postLogin(login: Login): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/auth/login`, login);
  }

  public createUser(user: User): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.baseUrl}/auth/user`, user);
  }

  public createUserAll(user: User): Observable<ResponseUser> {
    return this.http.post<ResponseUser>(`${this.baseUrl}/auth/signup`, user);
  }
}
