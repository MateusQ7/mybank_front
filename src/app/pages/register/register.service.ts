import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormatedForm } from '../../shared/models/formatedForm';
import { Observable } from 'rxjs';
import { BackResponse } from '../../shared/types/back-response.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  submit(formData: FormatedForm): Observable<BackResponse> {
    return this.http.post<BackResponse>(`${environment.apiUrl}/auth/register`, formData)
  }
}
