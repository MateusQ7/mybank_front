import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-invoice',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './pop-up-invoice.component.html',
  styleUrl: './pop-up-invoice.component.css'
})
export class PopUpInvoiceComponent {

  constructor(public dialogRef: MatDialogRef<PopUpInvoiceComponent>, @Inject (MAT_DIALOG_DATA) public data: any) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
