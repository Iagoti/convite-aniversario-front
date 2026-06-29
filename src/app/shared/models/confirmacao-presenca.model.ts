export type StatusConfirmacao = 'CONFIRMADO' | 'CANCELADO';
export interface ConfirmacaoPresenca {
  id: number;
  nome: string;
  telefone: string;
  quantidadePessoas: number;
  status: StatusConfirmacao;
  criadoEm: string;
}
export interface ResumoConfirmacoes { totalConfirmacoes: number; totalPessoas: number; cancelados: number; }
