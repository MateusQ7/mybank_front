import { Injectable } from '@angular/core';
import { TransactionModel } from '../../shared/models/transactionModel';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class PopUpTransferService {

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  createTransaction(transactionModel: TransactionModel): O  {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post<string>(`${this.config.apiUrl}/transaction/create`, transactionModel, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao criar transação', error);
        throw error;
      })
    );
  }

}


