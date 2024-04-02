import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environments } from '../../environments/environments.prod';
import { Login } from '../interfaces/login.interface';
import { Token } from '../interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);

  public postLogin(login: Login): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/auth/login`, login);
  }
}
