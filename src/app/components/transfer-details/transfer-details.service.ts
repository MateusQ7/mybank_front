import { Injectable } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { TransactionModel } from '../../shared/models/transactionModel'; // Ajuste o caminho e a importação conforme necessário

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  getTransactions(): Observable<TransactionModel[]> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<TransactionModel[]>(`${this.config.apiUrl}/transaction/history`, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao buscar transações', error);
        throw error;
      })
    );
  }



}
