import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { FormatedFormLogin } from '../../shared/models/formatedFormLogin';
import { LoginService } from './login.service';
import { BackResponse } from '../../shared/types/back-response.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    private loginService: LoginService
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

  submit(){
    const formatedFormLogin: FormatedFormLogin = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    if(this.form.valid){
      this.loginService.login(formatedFormLogin).subscribe(
        (res) => {
          console.log(res)
          const backResponse: BackResponse = {
            status: res.status,
            message: res.message,
            data: res.data
          }
          this.goToHome()
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


  goToHome() {
    if (this.form.valid) {
      this.router.navigate(['/account'])
    }
  }
}
