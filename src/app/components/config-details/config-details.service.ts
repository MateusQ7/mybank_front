import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { UpdatedUser } from '../../shared/models/updatedUser';
import { ConfigService } from '../../services/config/config.service';

@Injectable({
  providedIn: 'root'
})


export class ConfigDetailsService {
  constructor(private http: HttpClient,
    private config: ConfigService
  ) { }

  updateUser(updatedUser: UpdatedUser): Observable<UpdatedUser> {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.put<UpdatedUser>(`${this.config.apiUrl}/user/update`, updatedUser, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao da conta', error);
        throw error;
      })
    );
  }
}