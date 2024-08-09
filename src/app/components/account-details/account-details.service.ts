import { Injectable } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Account } from '../../shared/models/accountModel';

@Injectable({
  providedIn: 'root',
})
export class AccountDetailsService {

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  getAccountByCpf(cpf: string): Observable<Account> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<Account>(`${this.config.apiUrl}/account/${cpf}`, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao buscar conta', error);
        throw error;
      })
    );
  }
}
