import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TransferenceModel } from '../../shared/models/transferenceModel';
import { CommonModule, NgForOf } from '@angular/common';
import { TransferDetailsService } from './transfer-details.service';
import { PopUpTransferComponent } from '../pop-up-transfer/pop-up-transfer.component';
import { ToastrService } from 'ngx-toastr';
import { AccountDetailsService } from '../account-details/account-details.service';
import { Account } from '../../shared/models/accountModel';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import StringMask from 'string-mask';

@Component({
  selector: 'app-transfer-details',
  standalone: true,
  imports: [
    MatDialogModule,
    NgForOf,
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.css'],
})
export class TransferDetailsComponent implements OnInit {
  transferences: TransferenceModel[] = [];
  transference: TransferenceModel | undefined;
  error: string | undefined;
  account: Account | undefined;

  constructor(
    public dialog: MatDialog,
    private readonly transferenceDetailsService: TransferDetailsService,
    private readonly toastr: ToastrService,
    private readonly accountService: AccountDetailsService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
    this.loadAccountByCpf();
  }

  loadTransactions(): void {
    const cpf = sessionStorage.getItem('cpf');

    if (cpf) {
      this.transferenceDetailsService.getTransactions(cpf).subscribe({
        next: (transferences) => {
          if (transferences && transferences.length > 0) {
            transferences.forEach((transference) => {});
            this.transferences = transferences;
          } else {
            console.log('Não há transações.');
          }
        },
        error: (error) => {
          console.error('Erro ao carregar transações:', error);
        },
        complete: () => {
          console.log('Carregamento de transações concluído.');
        },
      });
    } else {
      console.log('Não há transações.');
    }
  }

  private readonly cpfMask = '###.###.###-##';
  private readonly formatter = new StringMask(this.cpfMask);

  formatCPF(cpf?: string): string {
    if (!cpf) return '';

    const maskedCPF = this.formatter.apply(cpf);

    return `${maskedCPF.substring(0, 4)}***.***-${maskedCPF.substring(9, 11)}`;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopUpTransferComponent, {
      width: '580px',
      height: '620px',
      data: { name: 'Angular' },
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.success) {
        this.loadTransactions();
      }
    });
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
          sessionStorage.setItem('NOME', data.user.cpf || 'Não disponível');
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
}
