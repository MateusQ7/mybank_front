import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../../services/config/config.service';
import { CardModelCreate } from '../../shared/models/createdCardModel';

@Injectable({
  providedIn: 'root'
})
export class PopUpCardService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  createCard(cardModelCreate: CardModelCreate): Observable<CardModelCreate> {
    const token = sessionStorage.getItem('auth-token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post<CardModelCreate>(`${this.config.apiUrl}/card/create`, cardModelCreate, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao criar cartão no pop-up', error);
        return throwError(error);
      })
    );
  }
}
