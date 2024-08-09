import { Component, OnInit } from '@angular/core';
import { AccountDetailsService } from './account-details.service';
import { Account } from '../../shared/models/accountModel';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AccountDetailsModule } from './account-details.module';

@Component({
  selector: 'account-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AccountDetailsModule],
  providers: [AccountDetailsService, HttpClient],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit {
  
  accounts: Account[] = [];
  account: Account | undefined;
  error: string | undefined;

  constructor(private accountService: AccountDetailsService) {}

  ngOnInit(): void {
    this.loadAccountByCpf();
  }

  loadAccountByCpf(): void {
    const storedCpf = sessionStorage.getItem('cpf');
    if (storedCpf) {
      this.accountService.getAccountByCpf(storedCpf).subscribe(
        (data: Account) => {
          this.account = data;
        },
        (error) => {
          console.error('Erro ao buscar conta', error);
          this.error = 'Conta não encontrada ou erro na requisição.';
        }
      );
    } else {
      this.error = 'CPF não encontrado no sessionStorage.';
    }
  }
}
