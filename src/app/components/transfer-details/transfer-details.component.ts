import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TransactionModel } from '../../shared/models/transactionModel';
import { CommonModule, NgForOf } from '@angular/common';
import { TransactionService } from './transfer-details.service';
import { PopUpTransferComponent } from '../pop-up-transfer/pop-up-transfer.component';


@Component({
  selector: 'app-transfer-details',
  standalone: true,
  imports: [MatDialogModule, NgForOf, CommonModule],
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.css']
})
export class TransferDetailsComponent implements OnInit {
  transactions: TransactionModel[] = [];
  transaction: TransactionModel | undefined;
  error: string | undefined;

  constructor(
    public dialog: MatDialog,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    const cpf = sessionStorage.getItem('cpf');

    if (cpf) {
      this.transactionService.getTransactions(cpf).subscribe(
        (transactions) => {
          console.log('Transações recebidas:', transactions);
          transactions.forEach(transaction => {
            console.log('cpfSender:', transaction.cpfSender); 
          });
          this.transactions = transactions;
        },
        (error) => {
          console.error('Erro ao carregar transações:', error);
        }
      );
    }
  }

  openDialog(): void {
    this.dialog.open(PopUpTransferComponent, {
      width: '580px',
      height: '660px',
      data: { name: 'Angular' },
      panelClass: 'custom-dialog'
    });
    console.log("FUI CLICADO");
  }
}
