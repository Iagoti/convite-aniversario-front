import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../../core/services/evento.service';
import { Evento } from '../../../shared/models/evento.model';
@Component({selector:'app-configuracoes-evento',standalone:true,imports:[FormsModule,NgIf],templateUrl:'./configuracoes-evento.component.html',styleUrl:'./configuracoes-evento.component.scss'})
export class ConfiguracoesEventoComponent{evento:Evento={...this.eventoService.evento()};salvo=false;constructor(private eventoService:EventoService){} salvar(){this.eventoService.atualizar(this.evento);this.salvo=true;setTimeout(()=>this.salvo=false,1800)}}
