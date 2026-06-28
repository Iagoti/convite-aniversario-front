import { Component, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../../core/services/evento.service';
import { ConfirmacaoService } from '../../../core/services/confirmacao.service';

@Component({
  selector: 'app-convite-page',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './convite-page.component.html',
  styleUrl: './convite-page.component.scss',
})
export class ConvitePageComponent {
  evento = this.eventoService.evento;
  sugestoes = this.eventoService.sugestoes;
  videoAtivo = signal(false);
  videoMudo = signal(true);
  modalAberto = signal(false);
  enviado = signal(false);
  form = { nome: '', telefone: '', quantidadePessoas: 1, observacao: '' };

  constructor(
    private eventoService: EventoService,
    private confirmacaoService: ConfirmacaoService,
  ) {}

  iniciarVideo(video: HTMLVideoElement) {
    this.videoAtivo.set(true);
    video.play();
  }

  alternarSom(video: HTMLVideoElement) {
    video.muted = !video.muted;
    this.videoMudo.set(video.muted);
    if (video.paused) this.iniciarVideo(video);
  }

  confirmar() {
    if (!this.form.nome.trim() || !this.form.telefone.trim()) return;
    this.confirmacaoService.confirmar({ ...this.form });
    this.enviado.set(true);
    setTimeout(() => {
      this.modalAberto.set(false);
      this.enviado.set(false);
      this.form = {
        nome: '',
        telefone: '',
        quantidadePessoas: 1,
        observacao: '',
      };
    }, 1200);
  }

  abrirMapa() {
    const link = this.evento().linkMaps?.trim();
    if (!link) return;
    window.open(link, '_blank', 'noopener,noreferrer');
  }

  scrollParaPresentes() {
    document.getElementById('presentes')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
