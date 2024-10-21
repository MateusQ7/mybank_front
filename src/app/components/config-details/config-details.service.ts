import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { UpdatedUser } from '../../shared/models/updatedUser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ConfigDetailsService {
  constructor(private readonly http: HttpClient,
  ) { }

  updateUser(updatedUser: UpdatedUser): Observable<UpdatedUser> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.put<UpdatedUser>(`${environment.apiUrl}/user/update`, updatedUser, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao da conta', error);
        throw error;
      })
    );
  }
}
