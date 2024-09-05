import { Injectable } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { TransactionModel } from '../../shared/models/transactionModel'; // Ajuste o caminho e a importação conforme necessário
import { Account } from '../../shared/models/accountModel';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  getTransactions(cpf: string): Observable<TransactionModel[]> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<TransactionModel[]>(`${this.config.apiUrl}/transaction/${cpf}`, { headers }).pipe(
      tap(transactions => console.log('Transações recebidas:', transactions)),
      catchError(error => {
        console.error('Erro ao buscar transações', error);
        throw error;
      })
    );
  }

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
