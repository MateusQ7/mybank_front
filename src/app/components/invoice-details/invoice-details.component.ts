import { Component } from '@angular/core';
import { PopUpInvoiceComponent } from '../pop-up-invoice/pop-up-invoice.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css'
})
export class InvoiceDetailsComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(PopUpInvoiceComponent, {
      width: '558px',
      height: '412px',
      data: {name: 'Angular'},
      panelClass: 'custom-dialog'
    })
    console.log("FUI CLICADO")
  }
}
