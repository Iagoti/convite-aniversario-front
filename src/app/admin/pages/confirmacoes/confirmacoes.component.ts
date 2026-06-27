import { Component, computed, signal } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmacaoService } from '../../../core/services/confirmacao.service';
@Component({selector:'app-confirmacoes',standalone:true,imports:[NgFor,FormsModule,DatePipe],templateUrl:'./confirmacoes.component.html',styleUrl:'./confirmacoes.component.scss'})
export class ConfirmacoesComponent{busca=signal('');lista=this.confirmacaoService.confirmacoes;filtradas=computed(()=>this.lista().filter(c=>(c.nome+c.telefone).toLowerCase().includes(this.busca().toLowerCase())));constructor(public confirmacaoService:ConfirmacaoService){} }
