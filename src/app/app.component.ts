import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mybank_frontend';

  constructor(private router: Router, private stateService: StateService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updatePageState(this.router.url);
      }
    });
  }

  updatePageState(url: string) {
    if (url.includes('account')) {
      this.stateService.setName('Conta')
      this.stateService.setImg('../assets/info-icon.svg')
    } else if (url.includes('card')) {
      this.stateService.setName('Cartão')
      this.stateService.setImg('../assets/credit-card.svg')
    } else if (url.includes('invoice')) {
      this.stateService.setName('Fatura')
      this.stateService.setImg('../assets/invoice.svg')
    } else if (url.includes('transfer')) {
      this.stateService.setName('Transferência')
      this.stateService.setImg('../assets/transfer.svg')
    } else if (url.includes('user-config')) {
      this.stateService.setName('Configurações')
      this.stateService.setImg('../assets/config.svg')
    }
  }

}
