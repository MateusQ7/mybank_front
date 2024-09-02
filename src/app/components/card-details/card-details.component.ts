import { Component, OnInit } from '@angular/core';
import { CardModel } from '../../shared/models/cardModel'; // Certifique-se de ter o modelo `Card`
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CardDetailsService } from './card-details.service';
import { PopUpCardsComponent } from '../pop-up-cards/pop-up-cards.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule],
  providers: [CardDetailsService, HttpClient],
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'] // Corrigido: styleUrl -> styleUrls
})
export class CardDetailsComponent implements OnInit {
  card: CardModel | undefined; // Para armazenar os detalhes do cartão retornados
  error: string | undefined; // Para armazenar mensagens de erro, se houver

  constructor(private cardDetailsService: CardDetailsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.openDialog(); // Carrega o cartão ao inicializar o componente
  }

  //lembrar de pegar os dados do popup estilo do register service e component, a diferença é q é no op up en  no form
  openDialog(): void {
    this.dialog.open(PopUpCardsComponent, {
      width: '558px',
      height: '564px',
      data: { name: 'Angular' },
      panelClass: 'custom-dialog'
    })
    console.log("FUI CLICADO")
  }
}
