import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { catchError, Observable, throwError } from 'rxjs';
import { CardModel } from '../../shared/models/cardModel';

@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  createCard(cardModel: CardModel): Observable<CardModel> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post<CardModel>(`${this.config.apiUrl}/card/create`,cardModel, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao buscar cartão', error);
        return throwError(error);
      })
    );
  }
}
