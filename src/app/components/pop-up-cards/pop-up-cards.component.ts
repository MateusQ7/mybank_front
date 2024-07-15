import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-cards',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './pop-up-cards.component.html',
  styleUrl: './pop-up-cards.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PopUpCardsComponent {

  constructor(public dialogRef: MatDialogRef<PopUpCardsComponent>, @Inject (MAT_DIALOG_DATA) public data: any) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
