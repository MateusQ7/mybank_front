import { Component } from '@angular/core';
import { DynamicCardComponent } from '../dynamic-card/dynamic-card.component';
import { AccountDetailsComponent } from '../account-details/account-details.component';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [DynamicCardComponent,
    AccountDetailsComponent
  ],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.css'
})
export class HubComponent {

}
