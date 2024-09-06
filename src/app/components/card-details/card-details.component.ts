import { Component, OnInit } from '@angular/core';
import { CardModel } from '../../shared/models/cardModel'; // Certifique-se de ter o modelo `Card`
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CardDetailsService } from './card-details.service';
import { PopUpCardsComponent } from '../pop-up-cards/pop-up-cards.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [CardDetailsService, HttpClient],
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'] // Corrigido: styleUrl -> styleUrls
})
export class CardDetailsComponent implements OnInit {
  cards: CardModel[] = []; // Armazena a lista de cartões
  error: string | undefined;

  constructor(
    private cardDetailsService: CardDetailsService,
    private dialog: MatDialog // Injetando MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCards(); // Carrega os cartões ao inicializar o componente
  }

  loadCards(): void {
    // Obtendo o cardId do sessionStorage ou de outro local
    const cpf = sessionStorage.getItem('cpf');

    if (!cpf) {
      console.error('CPF do cartão não encontrado.');
      return;
    }

    this.cardDetailsService.getCards(cpf).subscribe(
      (data: CardModel[]) => {
        this.cards = data;
      },
      (error) => {
        console.error('Erro ao buscar cartões', error);
        this.error = 'Erro ao buscar cartões.';
      }
    );
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(PopUpCardsComponent, {
      width: '500px',


    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O diálogo foi fechado');
      this.loadCards();
    });
  }
}
