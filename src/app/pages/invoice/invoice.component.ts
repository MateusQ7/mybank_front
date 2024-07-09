import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HubComponent } from '../../components/hub/hub.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HomeComponent } from '../../components/home/home.component';

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
