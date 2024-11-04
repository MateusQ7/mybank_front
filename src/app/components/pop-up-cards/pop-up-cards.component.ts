import { CommonModule, NgForOf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PopUpCardService } from './pop-up-cards.service';
import { CardModelCreate } from '../../shared/models/createdCardModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pop-up-cards',
  standalone: true,
  imports: [
    MatDialogModule,
    NgForOf,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './pop-up-cards.component.html',
  styleUrls: ['./pop-up-cards.component.css'],
})
export class PopUpCardsComponent {
  cardForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly popUpCardService: PopUpCardService,
    public dialogRef: MatDialogRef<PopUpCardsComponent>,
    public readonly toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cardForm = this.fb.group({
      cardName: ['', Validators.required],
      cardValue: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      ],
      cardPassword: ['', Validators.required],
    });
  }

  onCreate(): void {
    if (this.cardForm.valid) {
      const strCpf = sessionStorage.getItem('cpf') ?? '';
      const cardModelCreate: CardModelCreate = {
        accountCpf: strCpf,
        cardName: this.cardForm.value.cardName,
        cardPassword: this.cardForm.value.cardPassword,
        cardValue: this.cardForm.value.cardValue,
      };

      const cardValue = this.cardForm.get('cardValue')?.value;
      if (!cardValue || parseFloat(cardValue) <= 0) {
        this.toastr.error('Não pode criar um cartao com limite de R$ 0,00');
        return;
      }

      this.popUpCardService.createCard(cardModelCreate).subscribe({
        next: (response) => {
          console.log('Cartão criado com sucesso!');
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Erro ao criar cartão', error);
          this.dialogRef.close();
        },
      });
    } else {
      console.log('Formulário inválido');
    }
  }

  formatCurrency() {
    let inputValue = this.cardForm.get('cardValue')?.value || '0.00';

    inputValue = inputValue.replace(/\D/g, '').replace(',', '.');

    while (inputValue.length < 3) {
      inputValue = '0' + inputValue;
    }

    const integerPart = inputValue.slice(0, inputValue.length - 2);
    const decimalPart = inputValue.slice(inputValue.length - 2);

    const formattedValue = `${parseInt(integerPart, 10)}.${decimalPart}`;

    this.cardForm
      .get('cardValue')
      ?.setValue(formattedValue, { emitEvent: false });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
