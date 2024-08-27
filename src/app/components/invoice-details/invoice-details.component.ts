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
    const storedId = sessionStorage.getItem('invoice-id');
    if (storedId) {
      const invoiceId = Number(storedId); // Certifica-se de que é um número
      
      this.invoiceDetailsService.getInvoiceById(invoiceId.toString()).subscribe(
        (data: Invoice) => {
          this.invoice = data;
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
