import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PayInvoiceModel } from '../../shared/models/payInvoiceModel';
import { PopUpInvoiceService } from './pop-up-invoice.service';

@Component({
  selector: 'app-pop-up-invoice',
  standalone: true,
  imports: [MatDialogModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './pop-up-invoice.component.html',
  styleUrls: ['./pop-up-invoice.component.css']
})
export class PopUpInvoiceComponent implements OnInit {
  paymentConfirmationForm!: FormGroup;
  currentDate: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<PopUpInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly popUpInvoiceService: PopUpInvoiceService
  ) { }

  ngOnInit(): void {
    const today = new Date();
    this.currentDate = today.toLocaleDateString('pt-BR');

    this.paymentConfirmationForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
      paymentValue: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      paymentDate: [this.currentDate, Validators.required],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  payInvoice(): void {
    if (this.paymentConfirmationForm.invalid) {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios e verifique se os CPFs são diferentes.');
      return;
    }

    const payModel: PayInvoiceModel = {
      accountCpf: this.paymentConfirmationForm.value.cpf,
      payValue: this.paymentConfirmationForm.value.paymentValue,
    };

    this.popUpInvoiceService.payInvoice(payModel).subscribe({
      next: (response) => {
        this.dialogRef.close({ success: true });
        this.toastr.success('Pagamento realizado com sucesso!');
        window.location.reload();
      },
      error: (err) => {
        this.toastr.error('Erro ao criar a transação.');
        console.error(err);
      }
    });
  }
}
