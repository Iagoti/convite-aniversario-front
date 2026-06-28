import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfirmacaoPresenca, ResumoConfirmacoes } from '../../shared/models/confirmacao-presenca.model';

@Injectable({ providedIn: 'root' })
export class ConfirmacaoService {
  private readonly apiUrl = `${environment.apiUrl}/confirmacoes`;
  confirmacoes = signal<ConfirmacaoPresenca[]>([]);

  constructor(private http: HttpClient) {}

  carregar(): void {
    this.http.get<ConfirmacaoPresenca[]>(this.apiUrl).subscribe({
      next: lista => this.confirmacoes.set(lista),
      error: error => console.error('Não foi possível carregar as confirmações', error),
    });
  }

  confirmar(dados: Omit<ConfirmacaoPresenca, 'id' | 'status' | 'criadoEm'>): Observable<ConfirmacaoPresenca> {
    return this.http.post<ConfirmacaoPresenca>(this.apiUrl, dados);
  }

  cancelar(id: number): void {
    this.http.patch<ConfirmacaoPresenca>(`${this.apiUrl}/${id}/cancelamento`, {}).subscribe({
      next: atualizada => this.confirmacoes.update(lista =>
        lista.map(item => item.id === id ? atualizada : item)),
    });
  }

  excluir(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe({
      next: () => this.confirmacoes.update(lista => lista.filter(item => item.id !== id)),
    });
  }

  resumo(): ResumoConfirmacoes {
    const lista = this.confirmacoes();
    const confirmados = lista.filter(item => item.status === 'CONFIRMADO');
    return {
      totalConfirmacoes: confirmados.length,
      totalPessoas: confirmados.reduce((total, item) => total + item.quantidadePessoas, 0),
      cancelados: lista.filter(item => item.status === 'CANCELADO').length,
    };
  }

  exportarCsv(): void {
    const linhas = [
      'Nome;Telefone;Quantidade;Status;Data',
      ...this.confirmacoes().map(item =>
        `${item.nome};${item.telefone};${item.quantidadePessoas};${item.status};${new Date(item.criadoEm).toLocaleString('pt-BR')}`),
    ];
    const blob = new Blob([linhas.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'confirmacoes-isabella.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
