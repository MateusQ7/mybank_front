import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HomeComponent } from '../../components/home/home.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HubComponent } from '../../components/hub/hub.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    HubComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

}
