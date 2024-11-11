import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { TransferenceModel } from '../../shared/models/transferenceModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransferDetailsService {
  constructor(private readonly http: HttpClient) {}

  getTransactions(cpf: string): Observable<TransferenceModel[]> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http
      .get<TransferenceModel[]>(`${environment.apiUrl}/transference/${cpf}`, {
        headers,
      })
      .pipe(
        tap((transactions) => console.log('Transações recebidas!')),
        catchError((error) => {
          console.error('Erro ao buscar transações', error);
          throw error;
        })
      );
  }
}
