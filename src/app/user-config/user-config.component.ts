import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HubComponent } from '../components/hub/hub.component';
import { HomeComponent } from '../components/home/home.component';

@Component({
  selector: 'app-user-config',
  standalone: true,
  imports: [NavbarComponent,
    HeaderComponent,
    FooterComponent,
    RouterModule,
    HubComponent,
    HomeComponent

  ],
  templateUrl: './user-config.component.html',
  styleUrl: './user-config.component.css'
})
export class UserConfigComponent {

}
