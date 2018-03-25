import { Monitoramento } from '../../models';

export interface MonitoramentoState {
  monitoramentos: Monitoramento[];
  loading: boolean;
  error: boolean;
}
