import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormatedForm } from '../../shared/models/formatedForm';
import { RegisterService } from './register.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  providers: [RegisterService, HttpClient],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  form!: FormGroup


  constructor(
    private readonly FormBuilder: FormBuilder,
    private readonly router: Router,
    private readonly registerService: RegisterService,
    private readonly toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.form = this.FormBuilder.group({
      name: [{
        value: '',
        disabled: false
      }, [
        Validators.required,
      ]],
      email: [{
        value: '',
        disabled: false
      }, [
        Validators.email
      ]],
      phone: [{
        value: '',
        disabled: false
      }, [
        Validators.required
      ]],
      password: [{
        value: '',
        disabled: false
      }, [
        Validators.required,
        Validators.minLength(6)
      ]],
      password_confirm: [{
        value: '',
        disabled: false
      }, [
        Validators.required,
        Validators.minLength(6)
      ]],
      cpf: [{
        value: '',
        disabled: false
      }, [
        Validators.required,
      ]],
      birthdate: [{
        value: '',
        disabled: false
      }, [
        Validators.required,
      ]],
    })
  }

  async submit(): Promise<void> {
    const formatedForm: FormatedForm = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      phone: this.form.value.phone,
      cpf: this.form.value.cpf,
      birthdate: this.form.value.birthdate
    };

    if (this.form.valid) {
      this.registerService.submit(formatedForm).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success("Cadastro feito com sucesso!");
          this.goToLogin();
        },
        error: (error) => {
          console.error('Erro ao enviar registro', error);
          this.toastr.error('Erro ao enviar registro.');
        },
        complete: () => {
          console.log('Envio de registro concluído.');
        }
      });
    } else {
      console.warn('Formulário inválido:', this.form.errors);
      this.toastr.warning('Por favor, preencha todos os campos corretamente.');
    }
  }

  goToLogin() {
    if (this.form.valid) {
      this.router.navigate(['/login'])
    }
  }
}
