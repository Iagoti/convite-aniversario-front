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
  entradaPendente = signal(true);
  videoAtivo = signal(false);
  videoMudo = signal(true);
  modalAberto = signal(false);
  enviado = signal(false);
  form = { nome: '', telefone: '', quantidadePessoas: 1, observacao: '' };

  constructor(
    private eventoService: EventoService,
    private confirmacaoService: ConfirmacaoService,
  ) {}

  async liberarEntrada(video: HTMLVideoElement) {
    this.entradaPendente.set(false);
    video.muted = false;
    this.videoMudo.set(false);
    video.currentTime = 0;

    try {
      await video.play();
      this.videoAtivo.set(true);
    } catch {
      video.muted = true;
      this.videoMudo.set(true);
      await video.play();
      this.videoAtivo.set(true);
    }
  }

  async iniciarVideo(video: HTMLVideoElement) {
    video.muted = false;
    this.videoMudo.set(false);

    try {
      await video.play();
      this.videoAtivo.set(true);
    } catch {
      video.muted = true;
      this.videoMudo.set(true);
      await video.play();
      this.videoAtivo.set(true);
    }
  }

  alternarSom(video: HTMLVideoElement) {
    video.muted = !video.muted;
    this.videoMudo.set(video.muted);
    if (video.paused) void this.iniciarVideo(video);
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
