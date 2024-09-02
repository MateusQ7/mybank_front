import { Component } from '@angular/core';
import { PopUpInvoiceComponent } from '../pop-up-invoice/pop-up-invoice.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Invoice } from '../../shared/models/invoiceModel';
import { InvoiceDetailsService } from './invoice-details.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
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
    this.loadInvoiceByCpf();
  }

  loadInvoiceByCpf(): void {
    const storageCpf = sessionStorage.getItem('cpf');
  
    if (storageCpf) {
      this.invoiceDetailsService.getInvoiceByCpf(storageCpf).subscribe({
        next: (data: Invoice) => {
          this.invoice = data;
        },
        error: (error) => {
          console.error('Erro ao buscar faturas', error);
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
