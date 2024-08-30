// ConfigDetailsComponent

import { Component, OnInit } from '@angular/core';
import { ConfigDetailsService } from './config-details.service';
import { FormatedFormUser } from '../../shared/models/FormatedFormUser';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-config-details',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [ConfigDetailsService, HttpClient],
  templateUrl: './config-details.component.html',
  styleUrl: './config-details.component.css',
})
export class ConfigDetailsComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private configDetailsService: ConfigDetailsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        phone: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );

    const errorMessage: string | null = sessionStorage.getItem('errorMessage');
    if (errorMessage) {
      this.toastr.error(errorMessage);
      sessionStorage.removeItem('errorMessage');
    }
  }

  passwordMatchValidator(form: FormGroup): void {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }

  updateUser(): void {
    if (this.form.invalid) {
      sessionStorage.setItem('errorMessage', 'Por favor, preencha todos os campos corretamente.');
      window.location.reload();
      return;
    }

    const storageCpf = sessionStorage.getItem('cpf');
    if (!storageCpf) {
      sessionStorage.setItem('errorMessage', 'CPF não encontrado no sessionStorage.');
      window.location.reload();
      return;
    }

    const formatedFormUser: FormatedFormUser = {
      email: this.form.value.email,
      password: this.form.value.password,
      confirmPassword: this.form.value.confirmPassword,
      phone: this.form.value.phone,
      cpf: storageCpf,
    };

    this.configDetailsService.updateUser(formatedFormUser).subscribe(
      (response) => {
        this.router.navigate(['/login'], { queryParams: { successMessage: 'Usuário atualizado com sucesso!' } });
      },
      (error) => {
        console.error('Erro ao atualizar usuário', error);
        sessionStorage.setItem('errorMessage', 'Erro ao atualizar usuário.');
        window.location.reload();
      }
    );
  }
}
