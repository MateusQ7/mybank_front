import { Component } from '@angular/core';
import { ConfigDetailsService } from './config-details.service';
import { FormatedForm } from '../../shared/models/formatedForm';
import { FormatedFormUser } from '../../shared/models/FormatedFormUser';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../pages/login/login.service';
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
export class ConfigDetailsComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private configDetailsService: ConfigDetailsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      phone: [
        {
          value: '',
          disabled: false,
        },
        [Validators.required],
      ],
      password: [
        {
          value: '',
          disabled: false,
        },
        [Validators.minLength(6), Validators.required],
      ],
      confirmPassword: [
        {
          value: '',
          disabled: false,
        },
        [Validators.minLength(6), Validators.required],
      ],
      email: [
        {
          value: '',
          disabled: false,
        },
        [Validators.email, Validators.required],
      ],
    });
  }

  updateUser(): void {
    const storageCpf = sessionStorage.getItem('cpf');
    if (!storageCpf) {
      this.toastr.error('CPF não encontrado no sessionStorage.');
      return;
    }

    const formatedFormUser: FormatedFormUser = {
      email: this.form.value.email,
      password: this.form.value.password,
      confirmPassword: this.form.value.confirmPassword, // Corrigido o nome da propriedade
      phone: this.form.value.phone,
      cpf: storageCpf,
    };

    this.configDetailsService.updateUser(formatedFormUser).subscribe(
      (response) => {
        // Ajuste o tipo conforme a resposta esperada da API
        this.toastr.success('Usuário atualizado com sucesso!');
        console.log(response);
      },
      (error) => {
        console.error('Erro ao atualizar usuário', error);
        this.toastr.error('Erro ao atualizar usuário.');
      }
    );
  }
}
