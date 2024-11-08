import { Component, OnInit } from '@angular/core';
import { AccountDetailsService } from './account-details.service';
import { Account } from '../../shared/models/accountModel';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { InvoiceDetailsService } from '../invoice-details/invoice-details.service';
import { Invoice } from '../../shared/models/invoiceModel';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpAccountDetaisComponent } from '../pop-up-account-detais/pop-up-account-detais.component';
import { PopUpAccountDetaisBuyComponent } from '../pop-up-account-detais-buy/pop-up-account-detais-buy.component';

@Component({
  selector: 'account-details',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  providers: [AccountDetailsService, HttpClient, CurrencyPipe],
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  accounts: Account[] = [];
  account: Account | undefined;
  invoices: Invoice[] = [];
  invoice: Invoice | undefined;
  error: string | undefined;

  constructor(
    private readonly accountService: AccountDetailsService,
    private readonly invoiceDetailsService: InvoiceDetailsService,
    private readonly translate: TranslateService,
    private readonly currencyPipe: CurrencyPipe,
    public readonly dialog: MatDialog
  ) {
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
  }

  ngOnInit(): void {
    this.loadAccountByCpf();
    this.loadInvoiceByCpf();
  }

  loadAccountByCpf(): void {
    const storedCpf = sessionStorage.getItem('cpf');

    if (storedCpf) {
      this.accountService.getAccountByCpf(storedCpf).subscribe({
        next: (data: Account) => {
          this.account = data;

          sessionStorage.setItem(
            'userName',
            data.user.name || 'Não disponível'
          );
        },
        error: (error) => {
          console.error('Erro ao buscar conta', error);
          this.error = 'Conta não encontrada ou erro na requisição.';
        },
        complete: () => {
          console.log('Busca de conta concluída.');
        },
      });
    } else {
      console.error('CPF não encontrado no sessionStorage.');
      this.error = 'CPF não encontrado no sessionStorage.';
    }
  }

  loadInvoiceByCpf(): void {
    const storageCpf = sessionStorage.getItem('cpf');

    if (storageCpf) {
      this.invoiceDetailsService.getInvoiceByCpf(storageCpf).subscribe({
        next: (data: Invoice) => {
          this.invoice = data;
        },
        error: (error) => {
          this.error = 'Faturas não encontradas ou erro na requisição.';
        },
        complete: () => {
          console.log('Busca de faturas concluída.');
        },
      });
    } else {
      console.error('CPF não encontrado no sessionStorage.');
      this.error = 'CPF não encontrado.';
    }
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
  }

  formatCurrency(value: number): string | null {
    const currentLang = this.translate.currentLang;
    return this.currencyPipe.transform(
      value,
      currentLang === 'pt' ? 'BRL' : 'USD',
      'symbol',
      '1.2-2'
    );
  }

  addValueToAccount(value: number) {
    const storageCpf = sessionStorage.getItem('cpf');

    if (storageCpf) {
      this.accountService.addValueToAccount(storageCpf, value).subscribe({
        next: (data: Account) => {
          this.account = data;
        },
        error: (error) => {
          this.error = 'Deu não encontradas ou erro na requisição.';
        },
        complete: () => {
          console.log('Deu certo.');
        },
      });
    } else {
      console.error('CPF não encontrado no sessionStorage.');
      this.error = 'CPF não encontrado.';
    }
  }

  openDialog(): void {
    this.dialog.open(PopUpAccountDetaisComponent, {
      width: '508px',
      height: '300px',
      data: { name: 'Angular' },
      panelClass: 'custom-dialog',
    });
    console.log('Dialog opened');
  }
  openPurchaseDialog(): void {
    this.dialog.open(PopUpAccountDetaisBuyComponent, {
      width: '508px',
      height: '300px',
      data: { name: 'Purchase' },
      panelClass: 'custom-dialog',
    });
    console.log('Purchase Dialog opened');
  }
}
