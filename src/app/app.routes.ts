import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './card/card.component';
import { AccountComponent } from './account/account.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { TransferComponent } from './transfer/transfer.component';
import { UserConfigComponent } from './user-config/user-config.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'card',
    component: CardComponent
  },
  {
    path: 'invoice',
    component: InvoiceComponent
  },
  {
    path: 'transfer',
    component: TransferComponent
  },
  {
    path: 'user-config',
    component: UserConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
