import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface LoginResponse {
  token: string;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  logado = signal(!!localStorage.getItem('admin_token'));

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, { email, senha }).pipe(
      tap(response => {
        localStorage.setItem('admin_token', response.token);
        this.logado.set(true);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('admin_token');
    this.logado.set(false);
  }
}
