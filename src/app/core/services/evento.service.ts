import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Evento, SugestaoPresente } from '../../shared/models/evento.model';

@Injectable({ providedIn: 'root' })
export class EventoService {
  private readonly apiUrl = `${environment.apiUrl}/eventos/atual`;
  private readonly eventoPadrao: Evento = {
    id: 0,
    nomeAniversariante: 'Isabella',
    idade: '1 aninho',
    dataEvento: '18 de Julho',
    horario: '16:00 horas',
    mensagem: 'Espero você para comemorar comigo esse dia tão especial!',
    localFesta: 'Salão de Festas Encanto',
    endereco: 'Rua das Flores, 123 - Centro',
    linkMaps: 'https://maps.google.com',
    videoUrl: 'assets/videos/convite-isabella.mp4',
  };

  evento = signal<Evento>(this.eventoPadrao);
  sugestoes = signal<SugestaoPresente[]>([]);

  constructor(private http: HttpClient) {
    this.carregar();
  }

  carregar(): void {
    this.http.get<Evento>(this.apiUrl).subscribe({
      next: evento => this.definirEvento(evento),
      error: error => console.error('Não foi possível carregar o evento', error),
    });
  }

  atualizar(evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(this.apiUrl, evento).pipe(
      tap(atualizado => this.definirEvento(atualizado)),
    );
  }

  private definirEvento(evento: Evento): void {
    this.evento.set(evento);
    this.sugestoes.set(evento.sugestoes ?? []);
  }
}
