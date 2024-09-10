import { Component, OnInit } from '@angular/core';
import { DynamicCardComponent } from '../dynamic-card/dynamic-card.component';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { TransferDetailsComponent } from '../transfer-details/transfer-details.component';
import { ConfigDetailsComponent } from '../config-details/config-details.component';
import { InvoiceDetailsComponent } from '../invoice-details/invoice-details.component';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { CommonModule } from '@angular/common';
import { StateService } from '../../services/state/state.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule,
    DynamicCardComponent,
    AccountDetailsComponent,
    TransferDetailsComponent,
    InvoiceDetailsComponent,
    CardDetailsComponent,
    ConfigDetailsComponent
  ],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.css'
})
export class HubComponent implements OnInit{

  component$!: Observable<string>

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.component$ = this.stateService.component$
  }
}
