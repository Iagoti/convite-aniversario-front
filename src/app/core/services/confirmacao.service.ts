import { Injectable, signal } from '@angular/core';
import { ConfirmacaoPresenca, ResumoConfirmacoes } from '../../shared/models/confirmacao-presenca.model';
const KEY='convite_confirmacoes';
@Injectable({providedIn:'root'})
export class ConfirmacaoService{
 confirmacoes=signal<ConfirmacaoPresenca[]>(this.carregar());
 confirmar(dados:Omit<ConfirmacaoPresenca,'id'|'status'|'criadoEm'>){
  const item:ConfirmacaoPresenca={...dados,id:Date.now(),status:'CONFIRMADO',criadoEm:new Date().toISOString()};
  this.salvar([item,...this.confirmacoes()]);
 }
 cancelar(id:number){this.salvar(this.confirmacoes().map(c=>c.id===id?{...c,status:'CANCELADO'}:c));}
 excluir(id:number){this.salvar(this.confirmacoes().filter(c=>c.id!==id));}
 resumo():ResumoConfirmacoes{const lista=this.confirmacoes();const confirmados=lista.filter(c=>c.status==='CONFIRMADO');return {totalConfirmacoes:confirmados.length,totalPessoas:confirmados.reduce((t,c)=>t+c.quantidadePessoas,0),cancelados:lista.filter(c=>c.status==='CANCELADO').length};}
 exportarCsv(){const linhas=['Nome;Telefone;Quantidade;Status;Data',...this.confirmacoes().map(c=>`${c.nome};${c.telefone};${c.quantidadePessoas};${c.status};${new Date(c.criadoEm).toLocaleString('pt-BR')}`)];const blob=new Blob([linhas.join('\n')],{type:'text/csv'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='confirmacoes-isabella.csv';a.click();URL.revokeObjectURL(url)}
 private carregar():ConfirmacaoPresenca[]{const raw=localStorage.getItem(KEY);return raw?JSON.parse(raw):[]}
 private salvar(lista:ConfirmacaoPresenca[]){localStorage.setItem(KEY,JSON.stringify(lista));this.confirmacoes.set(lista)}
}
