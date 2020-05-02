import { Moment } from 'moment';
import { IDrugLine } from 'app/shared/model/drug-line.model';
import { ICustomLine } from 'app/shared/model/custom-line.model';
import { IConsultation } from 'app/shared/model/consultation.model';

export interface IPrescription {
  id?: string;
  date?: Moment;
  drugsLines?: IDrugLine[];
  customLines?: ICustomLine[];
  consultation?: IConsultation;
}

export const defaultValue: Readonly<IPrescription> = {};
