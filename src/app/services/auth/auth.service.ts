// src/app/services/auth/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  logout() {
    sessionStorage.removeItem('auth-token'); // Remover o token ao sair
    sessionStorage.removeItem('name'); // Remover o nome do usuário, se necessário
  }


}
