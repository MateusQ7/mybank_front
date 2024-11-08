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
  cpf: string | undefined;
  productName: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly accountService: PopUpAccountDetaisService,
    public dialogRef: MatDialogRef<PopUpAccountDetaisComponent>,
    private readonly cardService: CardDetailsService,
    private readonly buyService: PopUpAccountDetaisBuyService
  ) {
    this.money = this.fb.group({
      productName: ['', Validators.required],
      cardId: ['', Validators.required],
      valueToAdd: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    const cpf = sessionStorage.getItem('cpf');
    if (!cpf) {
      console.error('CPF não encontrado.');
      return;
    }

    this.cardService.getCards(cpf).subscribe({
      next: (data: CardModel[]) => {
        this.cards = data;
      },
      error: (error) => {
        console.error('Erro ao buscar cartões', error);
        this.toastr.error('Erro ao carregar cartões');
      },
    });
  }

  onSubmit(): void {
    if (this.money.valid) {
      this.productName = this.money.value.productName;
      const selectedCard = this.money.value.cardId;
      const purchaseAmount = this.money.value.valueToAdd;
      const cpf = sessionStorage.getItem('cpf');

      if (!cpf) {
        console.error('CPF não encontrado');
        return;
      }

      this.buyWithCard(cpf, selectedCard, purchaseAmount);
    } else {
      console.error('formulario invalido');
    }
  }

  buyWithCard(cpf: string, cardId: number, purchaseAmount: number): void {
    this.buyService.buyWithCard(cpf, cardId, purchaseAmount).subscribe({
      next: (response) => {
        this.toastr.success('Compra realizada com sucesso!');
        this.dialogRef.close();
      },
      error: (error) => {
        if (
          error.error.includes(
            'Your card does not have enough value for this purchase!'
          )
        ) {
          this.toastr.error('Limite insuficiente');
        }
        if (
          error.error.includes(
            'The card is disabled and cannot be used for purchases.'
          )
        ) {
          this.toastr.error('Você está tentando usar um cartao deletado');
        } else {
          this.toastr.error('Cartão não existe');
        }
      },
    });
  }
}
