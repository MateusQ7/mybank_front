import { Injectable } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PayInvoiceModel } from '../../shared/models/payInvoiceModel';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpInvoiceService {

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpClient) { }

  payInvoice(payModel: PayInvoiceModel): Observable<PayInvoiceModel> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post<PayInvoiceModel>(`${this.config.apiUrl}/invoice/pay`, payModel, { headers }).pipe(
      catchError(error => {
        console.error('Error pay Invoice!', error);
        throw error;
      })
    );
  }
}
