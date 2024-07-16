import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormatedForm } from '../../shared/models/formatedForm';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  form!: FormGroup


  constructor(
    private FormBuilder: FormBuilder,
    private router: Router
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
    })
  }

  async submit() {
    if(this.form.valid){
      const formatedForm: FormatedForm = {
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        phone: this.form.value.phone,
        cpf: this.form.value.cpf
      }
  
      const formatedFormJson = JSON.stringify(formatedForm, null, 2);

      console.log("Form: " + formatedFormJson)
      this.goToLogin();
    }else {
      console.log("Algum campo inválido!")
    }

  }

  goToLogin() {
    if(this.form.valid){
      this.router.navigate(['/login'])
    }
  }
}
