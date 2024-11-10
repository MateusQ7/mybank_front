import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CardModel } from '../../shared/models/cardModel';
import { environment } from '../../../environments/environment';
import { BuyModel } from '../../shared/models/buyModel';

@Injectable({
  providedIn: 'root',
})
export class PopUpAccountDetaisBuyService {
  constructor(private readonly http: HttpClient) {}

  buyWithCard(buyModel: BuyModel): Observable<CardModel> {
    const token = sessionStorage.getItem('auth-token');
    const cpf = sessionStorage.getItem('cpf');

    if (!cpf || !token) {
      return throwError(() => new Error('CPF ou Token não encontrado'));
    }

    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http
      .post<CardModel>(`${environment.apiUrl}/card/buy/`, buyModel, { headers })
      .pipe(
        catchError((error) => {
          console.error('Erro ao criar cartão no pop-up', error);
          let errorMessage = 'Um erro desconhecido ocorreu';

          if (error.error) {
            errorMessage = error.error;
          }

          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
