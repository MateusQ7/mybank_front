import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { FormatedFormLogin } from '../../shared/models/formatedFormLogin';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../../shared/types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  login(form: FormatedFormLogin){
    return this.http.post<LoginResponse>(`${this.config.apiUrl}/auth/login`, form).pipe(
      tap((value) => {
        sessionStorage.setItem('auth-token', value.token)
        sessionStorage.setItem('name', value.name)
      })
    )
  }
}
