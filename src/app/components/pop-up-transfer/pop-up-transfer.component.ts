import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopUpCardsComponent } from '../pop-up-cards/pop-up-cards.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pop-up-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pop-up-transfer.component.html',
  styleUrl: './pop-up-transfer.component.css'
})
export class PopUpTransferComponent {

  constructor(public dialogRef: MatDialogRef<PopUpCardsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  selectedOption: string = '';
  cpf: string = '';
  transferValue: string = '';
  description: string = '';
  transferType: string = '';

  onOptionChange() {
    if (this.selectedOption !== 'opcao4') {
      this.cpf = ''; // Limpa o campo CPF se a opção selecionada não for CPF
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onCreate() {
    // Lógica para criar a transferência
  }



}
