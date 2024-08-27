import { Component } from '@angular/core';
import { PopUpInvoiceComponent } from '../pop-up-invoice/pop-up-invoice.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Invoice } from '../../shared/models/invoiceModel';
import { InvoiceDetailsService } from './invoice-details.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [MatDialogModule, CommonModule, HttpClientModule],
  providers: [InvoiceDetailsService, HttpClient],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css'
})
export class InvoiceDetailsComponent {
  invoices: Invoice[] = [];
  invoice: Invoice | undefined;
  error: string | undefined;

  constructor(public dialog: MatDialog, private invoiceDetailsService: InvoiceDetailsService) { }

  ngOnInit(): void {
    this.loadInvoiceById();
  }

  loadInvoiceById(): void {
      this.invoiceDetailsService.getInvoiceById(2).subscribe(
        (data: Invoice) => {
          this.invoice = data;
        },
        (error) => {
          console.error('Erro ao buscar fatura', error);
          this.error = 'Conta não encontrada ou erro na requisição.';
        }
      );
  }
  openDialog(): void {
    this.dialog.open(PopUpInvoiceComponent, {
      width: '558px',
      height: '412px',
      data: { name: 'Angular' },
      panelClass: 'custom-dialog'
    })
    console.log("FUI CLICADO")
  }
}
