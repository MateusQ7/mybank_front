import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CardModelCreate } from '../../shared/models/createdCardModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PopUpCardService {

  constructor(private readonly http: HttpClient) { }

  createCard(cardModelCreate: CardModelCreate): Observable<CardModelCreate> {
    const token = sessionStorage.getItem('auth-token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post<CardModelCreate>(`${environment.apiUrl}/card/create`, cardModelCreate, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao criar cartão no pop-up', error);
        throw error;
      })
    );
  }
}
