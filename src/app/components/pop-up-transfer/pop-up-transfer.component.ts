import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PopUpTransferService } from './pop-up-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { TransactionModel } from '../../shared/models/transactionModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pop-up-transfer',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './pop-up-transfer.component.html',
  styleUrls: ['./pop-up-transfer.component.css']
})
export class PopUpTransferComponent {
  transferForm: FormGroup;
  senderCpf: string;

  constructor(
    public dialogRef: MatDialogRef<PopUpTransferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private transferService: PopUpTransferService,
    private toastr: ToastrService
  ) {
    this.senderCpf = sessionStorage.getItem('cpf') ?? '';

    this.transferForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern('\\d{11}')]],
      transferValue: ['', [Validators.required]],
      description: [''],
      transferType: ['PIX', [Validators.required]]
    }, { validators: this.cpfMatcher });
  }

  private cpfMatcher(formGroup: FormGroup): void {
    const cpfSender = sessionStorage.getItem('cpf') ?? '';
    const cpfReceiver = formGroup.get('cpf')?.value;

    if (cpfSender === cpfReceiver) {
      formGroup.get('cpf')?.setErrors({ cpfMatch: true });
    } else {
      formGroup.get('cpf')?.setErrors(null);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    if (this.transferForm.invalid) {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios e verifique se os CPFs são diferentes.');
      return;
    }

    const transactionModel: TransactionModel = {
      cpfSender: this.senderCpf,
      cpfReceiver: this.transferForm.value.cpf,
      amount: parseFloat(this.transferForm.value.transferValue),
      paymentDescription: this.transferForm.value.description,
      transactionType: this.transferForm.value.transferType
    };

    this.transferService.createTransaction(transactionModel).subscribe({
      next: (response) => {
        this.dialogRef.close({ success: true });
      },
      error: (err) => {
        this.toastr.error('Erro ao criar a transação.');
        console.error(err);
      }
    });
  }
}