import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Account } from '../../shared/models/accountModel';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PopUpAccountDetaisService {
  constructor(private readonly http: HttpClient) {}

  addValueToAccount(cpf: string, value: number): Observable<Account> {
    const token = sessionStorage.getItem('auth-token');

    if (!cpf || !token) {
      return throwError('CPF ou Token não encontrado');
    }

    let headers = new HttpHeaders();

    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http
      .post<Account>(
        `${environment.apiUrl}/account/${cpf}/${value}`,
        {},
        {
          headers,
        }
      )
      .pipe(
        catchError((error) => {
          console.error('Erro ao adicionar valor à conta', error);
          let errorMessage = 'Um erro desconhecido ocorreu';
          return throwError(errorMessage);
        })
      );
  }
}
