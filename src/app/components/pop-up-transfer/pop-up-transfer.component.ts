import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { PopUpTransferService } from './pop-up-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { TransferenceModel } from '../../shared/models/transferenceModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pop-up-transfer',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './pop-up-transfer.component.html',
  styleUrls: ['./pop-up-transfer.component.css']
})
export class PopUpTransferComponent implements OnInit {
  senderCpf: string | undefined;
  transferForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PopUpTransferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder,
    private readonly transferService: PopUpTransferService,
    private readonly toastr: ToastrService) {
  }

  ngOnInit(): void {

    this.senderCpf = sessionStorage.getItem('cpf') ?? '';

    this.transferForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern('\\d{11}')]],
      transferValue: ['', [Validators.required]],
      description: [''],
      transferenceType: ['PIX', [Validators.required]]
    }, {validators: this.cpfMatcher});
  }

  private readonly cpfMatcher: ValidatorFn = (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const cpfSender = sessionStorage.getItem('cpf') ?? '';
    const cpfReceiver = formGroup.get('cpf')?.value;

    if (cpfSender === cpfReceiver) {
      return { cpfMatch: true };
    }
    return null;
  };

  onClose(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    if (this.transferForm.invalid) {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios e verifique se os CPFs são diferentes.');
      return;
    }

    const transferenceModel: TransferenceModel = {
      cpfSender: this.senderCpf,
      cpfReceiver: this.transferForm.value.cpf,
      amount: parseFloat(this.transferForm.value.transferValue),
      paymentDescription: this.transferForm.value.description,
      transferenceType: this.transferForm.value.transferenceType
    };
    console.log(transferenceModel)

    this.transferService.createTransaction(transferenceModel).subscribe({
      next: (response) => {
        this.dialogRef.close({ success: true });
      },
      error: (err) => {
        this.toastr.error('Erro ao criar a transação.');
        console.log(transferenceModel)
        console.error(err);
      }
    });
  }
}