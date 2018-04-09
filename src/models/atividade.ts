import { Action } from './monitoramento';
import {
  Cliente,
  Endereco,
  Contato,
  Tecnico,
  Avaliacao,
  InteracaoTecnico,
  Motivo,
  Assinatura,
} from './atendimento';


export interface IAtividade {
  _id: string;
  cliente: Cliente;
  endereco: Endereco;
  contato: Contato;
  tecnico: Tecnico;
  avaliacao: Avaliacao[];
  data_atendimento: Date;
  estacionamento: string;
  modelo_equipamento: string;
  numero_equipamento: string;
  tipo: string;
  descricao: string;
  testes_efetuados: string;
  observacao: string;
  valor: string;
  autorizado: string;
  estado: string;
  interacao_tecnico: InteracaoTecnico;
  motivos: Motivo[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  imagens: any[];
  synced?: boolean;
  assinatura: Assinatura;
  uuid?: string;
  km_inicial?: number;
  km_final?: number;
  data_hora_inicial_km?: Date;
  data_hora_final_km?: Date;
  data_hora_inicial_virgente_local?: Date;
  data_hora_final_virgente_local?: Date;
  id_funcionario?: string;
  id_atendimento?: string;
  isUploaded?: boolean;
  isPaused?: boolean;
  actions?: Action[];
}
