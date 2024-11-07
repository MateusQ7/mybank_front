import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { PopUpAccountDetaisService } from './pop-up-account-detais.service'; // Certifique-se de importar o serviço correto
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-account-detais',
  standalone: true,
  imports: [NgxMaskDirective, CommonModule, ReactiveFormsModule, NgxMaskPipe],
  templateUrl: './pop-up-account-detais.component.html',
  styleUrls: ['./pop-up-account-detais.component.css'],
})
export class PopUpAccountDetaisComponent {
  money: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly accountService: PopUpAccountDetaisService,
    public dialogRef: MatDialogRef<PopUpAccountDetaisComponent>
  ) {
    // Inicializa o FormGroup com os controles
    this.money = this.fb.group({
      valueToAdd: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  onSubmit() {
    if (this.money.valid) {
      const value = this.money.value.valueToAdd;
      const cpf = sessionStorage.getItem('cpf');

      if (!cpf) {
        this.toastr.error('CPF não encontrado!');
        return;
      }

      this.accountService.addValueToAccount(cpf, value).subscribe({
        next: (response) => {
          this.toastr.success('Saldo atualizado com sucesso!');
          setTimeout(() => {
            window.location.reload();
          }, 1200);
          this.dialogRef.close();
        },
        error: (err) => {
          this.toastr.error('Erro ao atualizar saldo: ' + err);
        },
      });
    } else {
      this.toastr.error('Valor inválido ou faltando.');
    }
  }

  formatCurrency() {
    let inputValue = this.money.get('valueToAdd')?.value || '0.00';

    inputValue = inputValue.replace(/\D/g, '').replace(',', '.');

    while (inputValue.length < 3) {
      inputValue = '0' + inputValue;
    }

    const integerPart = inputValue.slice(0, inputValue.length - 2);
    const decimalPart = inputValue.slice(inputValue.length - 2);

    const formattedValue = `${parseInt(integerPart, 10)}.${decimalPart}`;

    this.money
      .get('valueToAdd')
      ?.setValue(formattedValue, { emitEvent: false });
  }
}
