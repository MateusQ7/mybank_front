import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormatedForm } from '../../shared/models/formatedForm';
import { RegisterService } from './register.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { checkPasswordMatch } from '../../security/validators/checkPasswordMatch';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, CommonModule],
  providers: [RegisterService, HttpClient],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly registerService: RegisterService,
    private readonly toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirm: ['', [Validators.required, Validators.minLength(6), checkPasswordMatch('password')]],
      cpf: ['', Validators.required],
      birthdate: ['', Validators.required],
    });

    this.form.get('password')?.valueChanges.subscribe(() => {
      this.form.get('password_confirm')?.updateValueAndValidity()
    })
  }

  async submit(): Promise<void> {
    if (this.form.valid) {
      const formatedForm: FormatedForm = this.form.value;
      this.registerService.submit(formatedForm).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success("Cadastro feito com sucesso!");
          this.goToLogin();
        },
        error: (error) => {
          console.error('Erro ao enviar registro', error);

          const errorMessage = error.error?.token;
          this.toastr.error(errorMessage);
        },
        complete: () => {
          console.log('Envio de registro concluído.');
        }
      });
    } else {
      console.warn('Formulário inválido:', this.form.errors);
      this.handleFormErrors();
    }
  }

  goToLogin(): void {
    if (this.form.valid) {
      this.router.navigate(['/login']);
    }
  }

  private handleFormErrors(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control?.invalid) {
        if (control.errors?.['required']) {
          this.toastr.warning(`O campo ${this.getFieldName(field)} é obrigatório.`);
        }
        if (control.errors?.['email']) {
          this.toastr.warning(`O campo email está inválido.`);
        }
        if (control.errors?.['minlength']) {
          this.toastr.warning(`O campo ${this.getFieldName(field)} deve ter pelo menos ${control.errors['minlength'].requiredLength} caracteres.`);
        }
      }
    });
  }

  private getFieldName(field: string): string {
    const fieldNames: { [key: string]: string } = {
      name: 'Nome',
      email: 'Email',
      phone: 'Telefone',
      password: 'Senha',
      password_confirm: 'Confirmação de Senha',
      cpf: 'CPF',
      birthdate: 'Data de Nascimento'
    };
    return fieldNames[field] || field;
  }
}
