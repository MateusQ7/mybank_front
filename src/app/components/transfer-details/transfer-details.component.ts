import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TransactionModel } from '../../shared/models/transactionModel';
import { CommonModule, NgForOf } from '@angular/common';
import { TransactionService } from './transfer-details.service';
import { PopUpTransferComponent } from '../pop-up-transfer/pop-up-transfer.component';
import { ToastrService } from 'ngx-toastr';


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
    private transactionService: TransactionService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    const cpf = sessionStorage.getItem('cpf');

    if (cpf) {
      this.transactionService.getTransactions(cpf).subscribe(
        (transactions) => {
          if (transactions && transactions.length > 0) {
            transactions.forEach(transaction => {
              console.log('cpfSender:', transaction.cpfSender);
            });
            this.transactions = transactions;
          } else {
            console.log('Não há transações.');
          }
        },
        (error) => {
          console.error('Erro ao carregar transações:', error);
        }
      );
    } else {
      console.log('Não há transações.');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopUpTransferComponent, {
      width: '580px',
      height: '660px',
      data: { name: 'Angular' },
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.toastr.success('Transação realizada com sucesso!');
        this.loadTransactions();
      }
    });
  }
}