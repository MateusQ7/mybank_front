import { Component, OnInit } from '@angular/core';
import { CardModel } from '../../shared/models/cardModel';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CardDetailsService } from './card-details.service';
import { PopUpCardsComponent } from '../pop-up-cards/pop-up-cards.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule],
  providers: [CardDetailsService, HttpClient],
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'],
})
export class CardDetailsComponent implements OnInit {
  cards: CardModel[] = [];
  error: string | undefined;
  userName: string | undefined;
  cpf: string | undefined;

  constructor(
    private readonly cardDetailsService: CardDetailsService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCards();

    this.userName = sessionStorage.getItem('userName') ?? 'Não disponível';
    this.cpf = sessionStorage.getItem('cpf') ?? 'Não disponível';
  }

  loadCards(): void {
    const cpf = sessionStorage.getItem('cpf');

    if (!cpf) {
      console.error('CPF do cartão não encontrado.');
      return;
    }

    this.cardDetailsService.getCards(cpf).subscribe({
      next: (data: CardModel[]) => {
        this.cards = data;
      },
      error: (error) => {
        console.error('Erro ao buscar cartões', error);
        this.error = 'Erro ao buscar cartões.';
      },
      complete: () => {
        console.log('Busca de cartões concluída.');
      },
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopUpCardsComponent, {
      width: '500px',
      height: '530px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('O diálogo foi fechado');
      this.loadCards();
    });
  }

  deleteCard(cardId: number): void {
    if (confirm('Você tem certeza que deseja deletar este cartão?')) {
      this.cardDetailsService.deleteCard(cardId).subscribe(
        () => {
          this.loadCards();
          this.snackBar.open('Cartão deletado com sucesso!', 'Fechar', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Erro ao deletar cartão', error);
          this.snackBar.open('Erro ao deletar cartão.', 'Fechar', {
            duration: 3000,
          });
        }
      );
    }
  }
}
