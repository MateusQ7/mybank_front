import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { FormatedFormLogin } from '../../shared/models/formatedFormLogin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
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

  async submit() {
    if (this.form.valid) {
      const formatedFormLogin: FormatedFormLogin = {
        email: this.form.value.email,
        password: this.form.value.password
      }
      const formatedFormJson = JSON.stringify(formatedFormLogin, null, 2);
      console.log("login: " + formatedFormJson)
      this.goToHome()
    }
    else {
      console.log("Algum campo inválido!")
    }


  }


  goToHome() {
    if (this.form.valid) {
      this.router.navigate(['/account'])
    }
  }
}
