import { Component, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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
  erroFormulario = signal('');
  readonly telefonePattern = '^\\(\\d{2}\\) \\d{4,5}-\\d{4}$';
  form = { nome: '', telefone: '', quantidadePessoas: null as number | null };

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

  aplicarMascaraTelefone(event: Event) {
    const input = event.target as HTMLInputElement;
    const numeros = input.value.replace(/\D/g, '').slice(0, 11);
    let formatado = '';

    if (numeros.length > 0) formatado = `(${numeros.slice(0, 2)}`;
    if (numeros.length >= 3) formatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    if (numeros.length > 6) {
      formatado = numeros.length > 10
        ? `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`
        : `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    }

    input.value = formatado;
    this.form.telefone = formatado;
  }

  confirmar(form: NgForm) {
    if (form.invalid || this.form.quantidadePessoas == null) {
      form.control.markAllAsTouched();
      this.erroFormulario.set('Preencha todos os campos obrigatórios.');
      return;
    }

    this.erroFormulario.set('');
    this.confirmacaoService.confirmar({
      nome: this.form.nome.trim(),
      telefone: this.form.telefone.trim(),
      quantidadePessoas: this.form.quantidadePessoas,
    }).subscribe({
      next: () => {
        this.enviado.set(true);
        setTimeout(() => {
          this.modalAberto.set(false);
          this.enviado.set(false);
          form.resetForm();
          this.form = {
            nome: '',
            telefone: '',
            quantidadePessoas: null,
          };
        }, 1200);
      },
      error: () => this.erroFormulario.set(
        'Não foi possível salvar. Tente novamente em instantes.',
      ),
    });
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
