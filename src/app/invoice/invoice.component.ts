import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HomeComponent } from '../components/home/home.component';
import { HubComponent } from '../components/hub/hub.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    HubComponent,
    FooterComponent,
    HomeComponent,
    RouterModule
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {

}
