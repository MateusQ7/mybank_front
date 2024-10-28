import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { ToastrService } from 'ngx-toastr';
import { PayInvoiceModel } from '../../shared/models/payInvoiceModel';
import { PopUpInvoiceService } from './pop-up-invoice.service';
import { InvoiceDetailsService } from '../invoice-details/invoice-details.service';
import { Invoice } from '../../shared/models/invoiceModel';

@Component({
  selector: 'app-pop-up-invoice',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './pop-up-invoice.component.html',
  styleUrls: ['./pop-up-invoice.component.css'],
})
export class PopUpInvoiceComponent implements OnInit {
  invoices: Invoice[] = [];
  invoice: Invoice | undefined;
  error: string | undefined;
  paymentConfirmationForm!: FormGroup;
  currentDate: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<PopUpInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly popUpInvoiceService: PopUpInvoiceService,
    private readonly invoiceDetailsService: InvoiceDetailsService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.currentDate = today.toLocaleDateString('pt-BR');

    this.paymentConfirmationForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
      paymentValue: [
        '0.00',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      ],
      paymentDate: [this.currentDate, Validators.required],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  async payInvoice(): Promise<void> {
    if (this.paymentConfirmationForm.invalid) {
      this.toastr.error(
        'Por favor, preencha todos os campos obrigatórios e verifique se os CPFs são diferentes.'
      );
      return;
    }

    const invoice: Invoice | undefined = await this.loadInvoiceByCpf();

    if (invoice) {
      const amountFromInvoice = invoice.amount;

      const payModel: PayInvoiceModel = {
        accountCpf: this.paymentConfirmationForm.value.cpf,
        payValue: this.paymentConfirmationForm.value.paymentValue,
      };

      const storageCpf = sessionStorage.getItem('cpf');
      if (storageCpf !== payModel.accountCpf) {
        this.toastr.error('CPF colocado não condiz com o CPF da conta');
        return undefined;
      }

      if (payModel.payValue > amountFromInvoice) {
        this.toastr.error(
          'O valor não pode ultrapassar o valor total da fatura.'
        );
        return;
      }

      this.popUpInvoiceService.payInvoice(payModel).subscribe({
        next: (response) => {
          this.dialogRef.close({ success: true });
          this.toastr.success('Pagamento realizado com sucesso!');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        error: (err) => {
          this.toastr.error('Erro ao criar a transação.');
          console.error(err);
        },
      });
    } else {
      this.toastr.error('Fatura não encontrada.');
    }
  }

  async loadInvoiceByCpf(): Promise<Invoice | undefined> {
    const storageCpf = sessionStorage.getItem('cpf');
    if (storageCpf) {
      try {
        const data = await this.invoiceDetailsService
          .getInvoiceByCpf(storageCpf)
          .toPromise();
        console.log('Invoice search completed.');
        return data;
      } catch (error) {
        this.error = 'Invoice not found or request error.';
        console.error(error);
        return undefined;
      }
    } else {
      this.handleMissingCpf();
      return undefined;
    }
  }

  private handleMissingCpf(): void {
    console.error('CPF not found in sessionStorage.');
    this.error = 'CPF not found.';
  }

  formatCurrency() {
    let inputValue =
      this.paymentConfirmationForm.get('paymentValue')?.value || '0.00';

    inputValue = inputValue.replace(/\D/g, '').replace(',', '.');

    while (inputValue.length < 3) {
      inputValue = '0' + inputValue;
    }

    const integerPart = inputValue.slice(0, inputValue.length - 2);
    const decimalPart = inputValue.slice(inputValue.length - 2);

    const formattedValue = `${parseInt(integerPart, 10)}.${decimalPart}`;

    this.paymentConfirmationForm
      .get('paymentValue')
      ?.setValue(formattedValue, { emitEvent: false });
  }
}
