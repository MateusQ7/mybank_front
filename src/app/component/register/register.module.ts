import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component'; // Verifique o caminho correto para o RegisterComponent

@NgModule({
  declarations: [
    // Certifique-se de que o RegisterComponent está declarado corretamente aqui
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule // Certifique-se de que RouterModule seja importado corretamente se for necessário para o RegisterComponent
  ],
  exports: [
    RegisterComponent // Exporta o RegisterComponent para ser usado em outros módulos
  ]
})
export class RegisterModule { }
