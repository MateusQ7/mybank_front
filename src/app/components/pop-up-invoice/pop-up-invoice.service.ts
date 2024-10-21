import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PayInvoiceModel } from '../../shared/models/payInvoiceModel';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PopUpInvoiceService {

  constructor(
    private readonly http: HttpClient) { }

  payInvoice(payModel: PayInvoiceModel): Observable<PayInvoiceModel> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post<PayInvoiceModel>(`${environment.apiUrl}/invoice/pay`, payModel, { headers }).pipe(
      catchError(error => {
        console.error('Error pay Invoice!', error);
        throw error;
      })
    );
  }
}
