import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopUpCardsComponent } from '../pop-up-cards/pop-up-cards.component';

@Component({
  selector: 'app-pop-up-transfer',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-transfer.component.html',
  styleUrl: './pop-up-transfer.component.css'
})
export class PopUpTransferComponent {

  constructor(public dialogRef: MatDialogRef<PopUpCardsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
