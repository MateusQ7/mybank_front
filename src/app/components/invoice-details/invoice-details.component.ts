import { Component } from '@angular/core';
import { PopUpInvoiceComponent } from '../pop-up-invoice/pop-up-invoice.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Invoice } from '../../shared/models/invoiceModel';
import { InvoiceDetailsService } from './invoice-details.service';
import { CommonModule } from '@angular/common';
import { TransactionModel } from '../../shared/models/transactionModel';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  providers: [InvoiceDetailsService],
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent {
  invoices: Invoice[] = [];
  invoice: Invoice | undefined;
  error: string | undefined;
  transactions: TransactionModel[] = [];
  transaction: TransactionModel | undefined;

  constructor(
    public dialog: MatDialog,
    private readonly invoiceDetailsService: InvoiceDetailsService
  ) {}

  ngOnInit(): void {
    this.loadInvoiceByCpf();
    this.loadTransactionsByCpf();
  }

  loadInvoiceByCpf(): void {
    const storageCpf = sessionStorage.getItem('cpf');
    if (storageCpf) {
      this.invoiceDetailsService.getInvoiceByCpf(storageCpf).subscribe({
        next: (data: Invoice) => {
          this.invoice = data;
        },
        error: () => {
          this.error = 'Invoice not found or request error.';
        },
        complete: () => {
          console.log('Invoice search completed.');
        },
      });
    } else {
      this.handleMissingCpf();
    }
  }

  loadTransactionsByCpf(): void {
    const storageCpf = sessionStorage.getItem('cpf');
    if (storageCpf) {
      this.invoiceDetailsService.getTransactionsByCpf(storageCpf).subscribe({
        next: (transactions: TransactionModel[]) => {
          this.transactions = transactions;
        },
        error: () => {
          this.error = 'Transactions not found.';
        },
        complete: () => {
          console.log('Transactions search completed.');
        },
      });
    } else {
      this.handleMissingCpf();
    }
  }

  openDialog(): void {
    this.dialog.open(PopUpInvoiceComponent, {
      width: '558px',
      height: '462px',
      data: { invoiceValue: this.invoice?.amount },
      panelClass: 'custom-dialog',
    });
    console.log('Dialog opened');
  }

  private handleMissingCpf(): void {
    console.error('CPF not found in sessionStorage.');
    this.error = 'CPF not found.';
  }
}
