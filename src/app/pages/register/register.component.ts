import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormatedForm } from '../../shared/models/formatedForm';
import { RegisterService } from './register.service';
import { BackResponse } from '../../shared/types/back-response.interface';
import { RegisterModule } from './register.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, RegisterModule, HttpClientModule],
  providers: [RegisterService, HttpClient],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  form!: FormGroup


  constructor(
    private FormBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.form = this.FormBuilder.group({
      name: [{
        value: '',
        disabled: false
      },[
        Validators.required,
      ]],
      email: [{
        value: '',
        disabled: false
      },[
        Validators.email
      ]],
      phone: [{
        value: '',
        disabled: false
      },[
        Validators.required
      ]],
      password: [{
        value: '',
        disabled: false
      },[
        Validators.required,
        Validators.minLength(6)
      ]],
      password_confirm: [{
        value: '',
        disabled: false
      },[
        Validators.required,
        Validators.minLength(6)
      ]],
      cpf: [{
        value: '',
        disabled: false
      },[
        Validators.required,
      ]],
      birthdate: [{
        value: '',
        disabled: false
      },[
        Validators.required,
      ]],
    })
  }

  async submit() {
    const formatedForm: FormatedForm = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      phone: this.form.value.phone,
      cpf: this.form.value.cpf,
      birthdate: this.form.value.birthdate
    }
    if(this.form.valid){
      this.registerService.submit(formatedForm).subscribe(
        (res) => {
          console.log(res)
          const backResponse: BackResponse = {
            status: res.status,
            message: res.message,
            data: res.data
          }
          this.goToLogin()
        },
        (error) => {
          const backResponse: BackResponse = {
            status: error.status,
            message: error.message
          }
        }
      )
    }
    return
  }

  goToLogin() {
    if(this.form.valid){
      this.router.navigate(['/login'])
    }
  }
}
