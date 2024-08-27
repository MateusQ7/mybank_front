import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { FormatedFormLogin } from '../../shared/models/formatedFormLogin';
import { LoginService } from './login.service';
import { BackResponse } from '../../shared/types/back-response.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [LoginService, HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) { }



  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [{
        value: '',
        disabled: false
      }, [
        Validators.email
      ]],
      password: [{
        value: '',
        disabled: false
      }, [
        Validators.minLength(6)
      ]
      ]
    }
    )
  }

  submit() {
    const formatedFormLogin: FormatedFormLogin = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    if (this.form.valid) {
      this.loginService.login(formatedFormLogin).subscribe(
        (res) => {
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
        (error) => {
          console.error('Erro ao fazer login:', error);
          const backResponse: BackResponse = {
            status: error.status,
            message: error.message
          };
          this.toastr.error("Erro ao fazer login.");
        }
      );
    } else {
      console.warn('Formulário inválido:', this.form.errors);
      this.toastr.warning("Por favor, preencha todos os campos corretamente.");
    }

    return;
  }


  goToHome() {
    if (this.form.valid) {
      this.router.navigate(['/account'])
    }
  }
}
