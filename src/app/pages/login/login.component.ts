import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormatedFormLogin } from '../../shared/models/formatedFormLogin';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  providers: [LoginService, HttpClient],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });

    this.route.queryParams.subscribe(params => {
      const successMessage = params['successMessage'];
      if (successMessage) {
        this.toastr.success(successMessage);
      }
    });
  }

  submit() {
    const formatedFormLogin: FormatedFormLogin = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    if (this.form.valid) {
      this.loginService.login(formatedFormLogin).subscribe({
        next: (res) => {
          console.log('Resposta da API:', res);
          if (res.token && res.name) {
            sessionStorage.setItem('auth-token', res.token);
            sessionStorage.setItem('name', res.name);
            sessionStorage.setItem('cpf', res.cpf);
            sessionStorage.setItem('invoice-id', res.invoiceId);
            this.toastr.success("Login feito com sucesso!");
            this.goToHome();
          } else {
            console.error('Token ou nome ausente na resposta:', res);
            this.toastr.error("Erro ao processar a resposta do login.");
          }
        },
        error: (error) => {
          console.error('Erro ao fazer login:', error);
          this.toastr.error("Erro ao fazer login.");
        },
        complete: () => {
          console.log('Operação de login concluída.');
          this.form.reset();
        }
      });
    } else {
      console.warn('Formulário inválido:', this.form.errors);
      this.toastr.warning("Por favor, preencha todos os campos corretamente.");
    }
  }

  goToHome() {
    if (this.form.valid) {
      this.router.navigate(['/account']);
    }
  }
}
