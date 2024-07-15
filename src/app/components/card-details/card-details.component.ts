import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopUpCardsComponent } from '../pop-up-cards/pop-up-cards.component';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [
    MatDialogModule,
  ],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent {
  
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(PopUpCardsComponent, {
      width: '557px',
      height: '476px',
      data: {name: 'Angular'},
      panelClass: 'custom-dialog'
    })
    console.log("FUI CLICADO")
  }
}
