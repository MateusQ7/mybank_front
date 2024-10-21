import { Injectable } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Invoice } from '../../shared/models/invoiceModel';
import { TransactionModel } from '../../shared/models/transactionModel';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailsService {

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpClient
  ) { }

  getInvoiceByCpf(cpf: string): Observable<Invoice> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<Invoice>(`${this.config.apiUrl}/invoice/account/${cpf}`, { headers }).pipe(
      catchError(error => {
        console.error('Invoice not found');
        throw error;
      })
    );
  }

  getInvoicesByCpf(cpf: string): Observable<Invoice[]> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<Invoice[]>(`${this.config.apiUrl}/invoice/${cpf}`, { headers }).pipe(
      catchError(error => {
        console.error('Invoices not found');
        throw error;
      })
    );
  }

  getTransactionsByCpf(cpf: string): Observable<TransactionModel[]>{
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<TransactionModel[]>(`${this.config.apiUrl}/transaction/${cpf}`, { headers }).pipe(
      catchError(error => {
        console.error('Invoices not found');
        throw error;
      })
    );
  }
}
