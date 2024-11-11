import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PopUpAccountDetaisComponent } from '../pop-up-account-detais/pop-up-account-detais.component';
import { PopUpAccountDetaisService } from '../pop-up-account-detais/pop-up-account-detais.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CardModel } from '../../shared/models/cardModel';
import { CardDetailsService } from '../card-details/card-details.service';
import { PopUpAccountDetaisBuyService } from './pop-up-account-detais-buy.service';
import { BuyModel } from '../../shared/models/buyModel';
import { TesteModel } from '../../shared/models/testeModel';

@Component({
  selector: 'app-pop-up-account-detais-buy',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pop-up-account-detais-buy.component.html',
  styleUrl: './pop-up-account-detais-buy.component.css',
})
export class PopUpAccountDetaisBuyComponent implements OnInit {
  money: FormGroup;
  cards: CardModel[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly accountService: PopUpAccountDetaisService,
    public dialogRef: MatDialogRef<PopUpAccountDetaisComponent>,
    private readonly cardService: CardDetailsService,
    private readonly buyService: PopUpAccountDetaisBuyService
  ) {
    this.money = this.fb.group({
      paymentDescription: ['', Validators.required],
      cardName: ['', Validators.required],
      purchaseAmount: ['', [Validators.required, Validators.min(0.01)]],
      cardPassword: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.loadCards();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  loadCards(): void {
    const cpf = sessionStorage.getItem('cpf');
    if (!cpf) {
      this.toastr.error('CPF não encontrado');
      return;
    }

    this.buyService.getCardsByAccount(cpf).subscribe({
      next: (response: CardModel[]) => {
        this.cards = response;
      },
      error: (error) => {
        this.toastr.error('Erro ao carregar os cartões');
      },
    });
  }

  formatCurrency() {
    let inputValue = this.money.get('purchaseAmount')?.value || '0.00';

    inputValue = inputValue.replace(/\D/g, '').replace(',', '.');

    while (inputValue.length < 3) {
      inputValue = '0' + inputValue;
    }

    const integerPart = inputValue.slice(0, inputValue.length - 2);
    const decimalPart = inputValue.slice(inputValue.length - 2);

    const formattedValue = `${parseInt(integerPart, 10)}.${decimalPart}`;

    this.money
      .get('purchaseAmount')
      ?.setValue(formattedValue, { emitEvent: false });
  }

  buyWithCard() {
    if (this.money.valid) {
      const cpf = sessionStorage.getItem('cpf') ?? '';
      const buy: TesteModel = {
        cardName: this.money.value.cardName,
        accountCpf: cpf,
        purchaseAmount: this.money.value.purchaseAmount,
        cardPassword: this.money.value.cardPassword,
        paymentDescription: this.money.value.paymentDescription,
      };
      this.buyService.buyWithCard(buy).subscribe({
        next: (response) => {
          this.toastr.success('Compra realizada com sucesso!');
          this.dialogRef.close();
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        },
        error: (error) => {
          const errorMessage = error.error ? error.error : error.message;

          console.log('Erro recebido:', error);

          if (errorMessage.includes('Insufficient Limit!')) {
            this.toastr.error('Limite insuficiente');
          }
          if (
            errorMessage.includes(
              'The card is disabled and cannot be used for purchases.'
            )
          ) {
            this.toastr.error('Você está tentando usar um cartão deletado');
          }
          if (errorMessage.includes('This card belongs to another account')) {
            this.toastr.error('Cartão utilizado não pertence a esta conta!');
          }
          if (errorMessage.includes('Incorrect card password.')) {
            this.toastr.error('Senha do cartão incorreta');
          }
          if (errorMessage.includes('Erro inesperado ao realizar a compra.')) {
            this.toastr.error('Cartão não existe');
          }
        },
      });
    }
  }
}
