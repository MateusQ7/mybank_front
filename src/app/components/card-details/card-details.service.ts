// card-details.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ConfigService } from '../../services/config/config.service';
import { CardModel } from '../../shared/models/cardModel';

@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  getCards(accountCpf: string): Observable<CardModel[]> {
    const token = sessionStorage.getItem('auth-token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }


    return this.http.get<CardModel[]>(`${this.config.apiUrl}/card/${accountCpf}`, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao buscar conta', error);
        return throwError(error);
      })
    );
  }


  deleteCard(cardId: number): Observable<void> {
    const token = sessionStorage.getItem('auth-token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.delete<void>(`${this.config.apiUrl}/card/${cardId}`, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao deletar cartão', error);
        return throwError(error);
      })
    );
  }
}
