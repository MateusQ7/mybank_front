import { Component } from '@angular/core';
import { DynamicCardComponent } from '../dynamic-card/dynamic-card.component';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [DynamicCardComponent],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.css'
})
export class HubComponent {

}
