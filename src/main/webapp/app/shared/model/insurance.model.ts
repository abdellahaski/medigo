import { IConsultation } from 'app/shared/model/consultation.model';

export interface IInsurance {
  id?: string;
  company?: string;
  affiliationNumber?: string;
  consultation?: IConsultation;
}

export const defaultValue: Readonly<IInsurance> = {};
