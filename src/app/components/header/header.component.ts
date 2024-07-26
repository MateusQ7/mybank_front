import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'; // Ajuste o caminho conforme necessário
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) { }
  onLogout() {
    this.authService.logout(); // Chama o método de logout
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}
