import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CardComponent } from './pages/card/card.component';
import { AccountComponent } from './pages/account/account.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { UserConfigComponent } from './pages/user-config/user-config.component';
import { AuthGuard} from './services/auth/auth-guard.service';

export const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'card',
    component: CardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'transfer',
    component: TransferComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-config',
    component: UserConfigComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
