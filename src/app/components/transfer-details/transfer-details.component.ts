import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpTransferComponent } from '../pop-up-transfer/pop-up-transfer.component';

@Component({
  selector: 'app-transfer-details',
  standalone: true,
  imports: [],
  templateUrl: './transfer-details.component.html',
  styleUrl: './transfer-details.component.css'
})
export class TransferDetailsComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(PopUpTransferComponent, {
      width: '580px',
      height: '610px',
      data: { name: 'Angular' },
      panelClass: 'custom-dialog'
    })
    console.log("FUI CLICADO")
  }
}
