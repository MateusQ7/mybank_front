import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { FormatedForm } from '../../shared/models/formatedForm';
import { Observable } from 'rxjs';
import { BackResponse } from '../../shared/types/back-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  submit(formData: FormatedForm): Observable<BackResponse>{
    return this.http.post<BackResponse>(`${this.config.apiUrl}/auth/register`, formData)
  }
}
