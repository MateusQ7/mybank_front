import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CardModel } from '../../shared/models/cardModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PopUpAccountDetaisBuyService {
  constructor(private readonly http: HttpClient) {}

  buyWithCard(
    cpf: string,
    cardId: number,
    purchaseAmount: number,
    body: { cardPassword: string }
  ): Observable<CardModel> {
    const token = sessionStorage.getItem('auth-token');

    if (!cpf || !token) {
      return throwError(() => new Error('CPF ou Token não encontrado'));
    }

    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http
      .post<CardModel>(
        `${environment.apiUrl}/card/buy/${cpf}/${cardId}/${purchaseAmount}`,
        body,
        {
          headers,
        }
      )
      .pipe(
        catchError((error) => {
          console.error('Erro ao criar cartão no pop-up', error);
          let errorMessage = 'Um erro desconhecido ocorreu';

          if (error.error) {
            errorMessage = error.error;
          }

          return throwError(errorMessage);
        })
      );
  }
}
