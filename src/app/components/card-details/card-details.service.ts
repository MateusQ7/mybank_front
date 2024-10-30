import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CardModel } from '../../shared/models/cardModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {

  constructor(private readonly http: HttpClient) { }

  getCards(accountCpf: string): Observable<CardModel[]> {
    const token = sessionStorage.getItem('auth-token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }


    return this.http.get<CardModel[]>(`${environment.apiUrl}/card/${accountCpf}`, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao buscar conta', error);
        return throwError(() => new Error(error));
      })
    );
  }


  disableCard(cardId: number): Observable<void> {
    const token = sessionStorage.getItem('auth-token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post<void>(`${environment.apiUrl}/card/disable/${cardId}`, {} , { headers }).pipe(
      catchError(error => {
        console.error('Erro ao deletar cartão', error);

        const errorMessage = error.error?.message || 'Erro ao deletar cartão';

        return throwError(() => new Error(errorMessage));
      })
    );
  }

}
