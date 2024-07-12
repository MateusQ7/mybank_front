import { Component } from '@angular/core';
import { DynamicCardComponent } from '../dynamic-card/dynamic-card.component';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { TransferComponent } from '../../pages/transfer/transfer.component';
import { TransferDetailsComponent } from '../transfer-details/transfer-details.component';
import { InvoiceDetailsComponent } from '../invoice-details/invoice-details.component';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [DynamicCardComponent,
    AccountDetailsComponent,
    TransferDetailsComponent,
    InvoiceDetailsComponent
  ],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.css'
})
export class HubComponent {

}
