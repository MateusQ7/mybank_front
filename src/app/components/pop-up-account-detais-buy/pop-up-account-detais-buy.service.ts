import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CardModel } from '../../shared/models/cardModel';
import { environment } from '../../../environments/environment';
import { TesteModel } from '../../shared/models/testeModel';

@Injectable({
  providedIn: 'root',
})
export class PopUpAccountDetaisBuyService {
  constructor(private readonly http: HttpClient) {}

  getCardsByAccount(accountCpf: string): Observable<CardModel[]> {
    const token = sessionStorage.getItem('auth-token');
    const cpf = sessionStorage.getItem('cpf');

    if (!cpf || !token) {
      return throwError(() => new Error('CPF ou Token não encontrado'));
    }

    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http
      .get<CardModel[]>(`${environment.apiUrl}/card/${accountCpf}`, {
        headers,
      })
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('Erro ao carregar os cartões'));
        })
      );
  }

  buyWithCard(testeModel: TesteModel): Observable<string> {
    const token = sessionStorage.getItem('auth-token');
    const cpf = sessionStorage.getItem('cpf');

    if (!cpf || !token) {
      return throwError(() => new Error('CPF ou Token não encontrado'));
    }

    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http
      .post<string>(`${environment.apiUrl}/card/buy2`, testeModel, {
        headers,
        responseType: 'text' as 'json',
      })
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
