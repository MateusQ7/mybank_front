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


  deleteCard(cardId: number): Observable<void> {
    const token = sessionStorage.getItem('auth-token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.delete<void>(`${environment.apiUrl}/card/${cardId}`, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao deletar cartão', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
