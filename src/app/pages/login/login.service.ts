import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormatedFormLogin } from '../../shared/models/formatedFormLogin';
import { LoginResponse } from '../../shared/types/login-response.type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  login(form: FormatedFormLogin){
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, form);
  }
}
