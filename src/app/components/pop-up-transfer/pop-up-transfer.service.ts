import { Injectable } from '@angular/core';
import { TransferenceModel } from '../../shared/models/transferenceModel';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PopUpTransferService {

  constructor(
    private readonly http: HttpClient
  ) { }

  createTransaction(transferenceModel: TransferenceModel): Observable<TransferenceModel> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    console.log('Requisição para criar transação:', transferenceModel);

    return this.http.post<TransferenceModel>(`${environment.apiUrl}/transference/create`, transferenceModel, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao criar transação', error);
        throw error;
      })
    );
  }

}
