import { Component, computed } from '@angular/core';
import { NgFor } from '@angular/common';
import { ConfirmacaoService } from '../../../core/services/confirmacao.service';
@Component({selector:'app-dashboard',standalone:true,imports:[NgFor],templateUrl:'./dashboard.component.html',styleUrl:'./dashboard.component.scss'})
export class DashboardComponent {
  lista = this.confirmacaoService.confirmacoes;
  resumo = computed(() => this.confirmacaoService.resumo());

  constructor(private confirmacaoService: ConfirmacaoService) {
    this.confirmacaoService.carregar();
  }
}
