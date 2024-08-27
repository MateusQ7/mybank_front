import { Injectable } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Invoice } from '../../shared/models/invoiceModel';
import id from '@angular/common/locales/id';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailsService {

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) { }

  getInvoiceById(invoiceId: String): Observable<Invoice> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<Invoice>(`${this.config.apiUrl}/invoice/${invoiceId}`, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao buscar fatura', error);
        throw error;
      })
    );
  }
}