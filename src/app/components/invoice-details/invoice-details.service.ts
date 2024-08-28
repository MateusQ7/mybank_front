import { Injectable } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Invoice } from '../../shared/models/invoiceModel';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailsService {

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  getInvoiceByCpf(cpf: string): Observable<Invoice> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<Invoice>(`${this.config.apiUrl}/invoice/account/${cpf}`, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao buscar fatura', error);
        throw error;
      })
    );
  }
}