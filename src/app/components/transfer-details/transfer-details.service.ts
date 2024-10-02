import { Injectable } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { TransferenceModel } from '../../shared/models/transferenceModel';

@Injectable({
  providedIn: 'root'
})
export class TransferDetailsService {

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpClient
  ) { }

  getTransactions(cpf: string): Observable<TransferenceModel[]> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<TransferenceModel[]>(`${this.config.apiUrl}/transference/${cpf}`, { headers }).pipe(
      tap(transactions => console.log('Transações recebidas:', transactions)),
      catchError(error => {
        console.error('Erro ao buscar transações', error);
        throw error;
      })
    );
  }
}
