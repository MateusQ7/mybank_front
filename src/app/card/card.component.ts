import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HubComponent } from '../components/hub/hub.component';
import { FooterComponent } from '../components/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    HubComponent,
    FooterComponent,
    HomeComponent,
    RouterModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

}
