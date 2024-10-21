import { Injectable } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Account } from '../../shared/models/accountModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountDetailsService {

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpClient
  ) { }

  getAccountByCpf(cpf: string): Observable<Account> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<Account>(`${environment.apiUrl}/account/${cpf}`, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao buscar conta', error);
        throw error;
      })
    );
  }
}
