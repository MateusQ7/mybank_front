import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PopUpTransferService } from './pop-up-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { TransferenceModel } from '../../shared/models/transferenceModel';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { Account } from '../../shared/models/accountModel';
import { AccountDetailsService } from '../account-details/account-details.service';

@Component({
  selector: 'app-pop-up-transfer',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './pop-up-transfer.component.html',
  styleUrls: ['./pop-up-transfer.component.css'],
})
export class PopUpTransferComponent implements OnInit {
  senderCpf: string | undefined;
  transferForm!: FormGroup;
  account: Account | null = null; // Inicializando como null
  error: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<PopUpTransferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder,
    private readonly transferService: PopUpTransferService,
    private readonly toastr: ToastrService,
    private readonly accountService: AccountDetailsService
  ) {}

  ngOnInit(): void {
    this.senderCpf = sessionStorage.getItem('cpf') ?? '';

    this.transferForm = this.fb.group(
      {
        cpf: ['', [Validators.required, Validators.pattern('\\d{11}')]],
        transferValue: ['', [Validators.required]],
        description: [''],
        transferenceType: ['PIX', [Validators.required]],
      },
      { validators: this.cpfMatcher }
    );
  }

  private readonly cpfMatcher: ValidatorFn = (
    formGroup: AbstractControl
  ): { [key: string]: boolean } | null => {
    const cpfSender = sessionStorage.getItem('cpf') ?? '';
    const cpfReceiver = formGroup.get('cpf')?.value;

    return cpfSender === cpfReceiver ? { cpfMatch: true } : null;
  };

  onClose(): void {
    this.dialogRef.close();
  }

  async onCreate(): Promise<void> {
    if (this.transferForm.invalid) {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const transferValue = this.transferForm.get('transferValue')?.value;
    if (!transferValue || parseFloat(transferValue) <= 0) {
      this.toastr.error('Você não pode transferir R$ 0,00');
      return;
    }

    const transferenceModel: TransferenceModel = {
      cpfSender: this.senderCpf,
      cpfReceiver: this.transferForm.value.cpf,
      amount: parseFloat(this.transferForm.value.transferValue),
      paymentDescription: this.transferForm.value.description,
      transferenceType: this.transferForm.value.transferenceType,
    };

    // Aguarda a resposta de loadAccountByCpf
    const account = await this.loadAccountByCpf();

    if (!account) {
      this.toastr.error('Cpf não existe');
      return;
    }

    this.transferService.createTransaction(transferenceModel).subscribe({
      next: (response) => {
        this.dialogRef.close({ success: true });
        this.toastr.success('Transação feita com sucesso!');
      },
      error: (err) => {
        this.toastr.error('Erro ao criar a transação.');
        console.error(err);
      },
    });
  }

  formatCurrency() {
    let inputValue = this.transferForm.get('transferValue')?.value || '0.00';

    inputValue = inputValue.replace(/\D/g, '').replace(',', '.');

    while (inputValue.length < 3) {
      inputValue = '0' + inputValue;
    }

    const integerPart = inputValue.slice(0, inputValue.length - 2);
    const decimalPart = inputValue.slice(inputValue.length - 2);

    const formattedValue = `${parseInt(integerPart, 10)}.${decimalPart}`;

    this.transferForm
      .get('transferValue')
      ?.setValue(formattedValue, { emitEvent: false });
  }

  async loadAccountByCpf(): Promise<Account | null> {
    const receiverCpf = this.transferForm.get('cpf')?.value;

    if (receiverCpf) {
      try {
        const data: Account | undefined = await this.accountService
          .getAccountByCpf(receiverCpf)
          .toPromise();

        if (!data) {
          this.error = 'Conta não encontrada ou erro na requisição.';
          return null;
        }

        return data;
      } catch (error) {
        console.error('Cpf não encontrado', error);
        this.error = 'Cpf não encontrada ou erro na requisição.';
        return null;
      }
    } else {
      console.error('CPF não encontrado no form.');
      return null;
    }
  }
}
