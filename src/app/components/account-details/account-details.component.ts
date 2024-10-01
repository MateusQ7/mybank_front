import { Component, OnInit } from '@angular/core';
import { AccountDetailsService } from './account-details.service';
import { Account } from '../../shared/models/accountModel';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { InvoiceDetailsService } from '../invoice-details/invoice-details.service';
import { Invoice } from '../../shared/models/invoiceModel';

@Component({
  selector: 'account-details',
  standalone: true,
  imports: [CommonModule],
  providers: [AccountDetailsService, HttpClient],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit {

  accounts: Account[] = [];
  account: Account | undefined;
  invoices: Invoice[] = [];
  invoice: Invoice | undefined;
  error: string | undefined;

  constructor(private readonly accountService: AccountDetailsService,
    private readonly invoiceDetailsService: InvoiceDetailsService
  ) { }

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

          sessionStorage.setItem('userName', data.user.name || 'Não disponível');
          sessionStorage.setItem('NOME', data.user.cpf || 'Não disponível');


        },
        error: (error) => {
          console.error('Erro ao buscar conta', error);
          this.error = 'Conta não encontrada ou erro na requisição.';
        },
        complete: () => {
          console.log('Busca de conta concluída.');
        }
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
        }
      });
    } else {
      console.error('CPF não encontrado no sessionStorage.');
      this.error = 'CPF não encontrado.';
    }
  }
}
