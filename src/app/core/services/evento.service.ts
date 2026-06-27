import { Injectable, signal } from '@angular/core';
import { Evento, SugestaoPresente } from '../../shared/models/evento.model';
const EVENTO_KEY='convite_evento';
@Injectable({providedIn:'root'})
export class EventoService{
 private eventoPadrao: Evento={id:1,nomeAniversariante:'Isabella',idade:'1 aninho',dataEvento:'18 de Julho',horario:'16:00 horas',mensagem:'Espero você para comemorar comigo esse dia tão especial!',localFesta:'Salão de Festas Encanto',endereco:'Rua das Flores, 123 - Centro',linkMaps:'https://maps.google.com',videoUrl:'assets/videos/convite-isabella.mp4'};
 private sugestoesPadrao: SugestaoPresente[]=[{id:1,titulo:'Roupas',descricao:'Tamanho 2 anos',icone:'👗'},{id:2,titulo:'Sapatos',descricao:'Tamanho 21/22',icone:'👟'},{id:3,titulo:'Brinquedos',descricao:'Boneca, educativos',icone:'🧸'}];
 evento=signal<Evento>(this.carregarEvento());
 sugestoes=signal<SugestaoPresente[]>(this.sugestoesPadrao);
 atualizar(evento:Evento){localStorage.setItem(EVENTO_KEY,JSON.stringify(evento));this.evento.set(evento)}
 private carregarEvento():Evento{const raw=localStorage.getItem(EVENTO_KEY);return raw?JSON.parse(raw):this.eventoPadrao}
}
