import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HomeComponent } from '../../components/home/home.component';
import { HubComponent } from '../../components/hub/hub.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [NavbarComponent,
    FooterComponent,
    HomeComponent,
    HubComponent,
    HeaderComponent,
    RouterModule
  ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent {

}
