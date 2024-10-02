import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TransferenceModel } from '../../shared/models/transferenceModel';
import { CommonModule, NgForOf } from '@angular/common';
import { TransferDetailsService } from './transfer-details.service';
import { PopUpTransferComponent } from '../pop-up-transfer/pop-up-transfer.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-transfer-details',
  standalone: true,
  imports: [MatDialogModule, NgForOf, CommonModule],
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.css']
})
export class TransferDetailsComponent implements OnInit {
  transferences: TransferenceModel[] = [];
  transference: TransferenceModel | undefined;
  error: string | undefined;

  constructor(
    public dialog: MatDialog,
    private readonly transferenceDetailsService: TransferDetailsService,
    private readonly toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    const cpf = sessionStorage.getItem('cpf');

    if (cpf) {
      this.transferenceDetailsService.getTransactions(cpf).subscribe({
        next: (transferences) => {
          if (transferences && transferences.length > 0) {
            transferences.forEach(transference => {
              console.log('cpfSender:', transference.cpfSender);
            });
            this.transferences = transferences;
          } else {
            console.log('Não há transações.');
          }
        },
        error: (error) => {
          console.error('Erro ao carregar transações:', error);
        },
        complete: () => {
          console.log('Carregamento de transações concluído.');
        }
      });
    } else {
      console.log('Não há transações.');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopUpTransferComponent, {
      width: '580px',
      height: '620px',
      data: { name: 'Angular' },
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.toastr.success('Transação realizada com sucesso!');
        this.loadTransactions();
      }
    });
  }
}