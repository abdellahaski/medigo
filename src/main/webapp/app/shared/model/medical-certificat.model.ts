import { Moment } from 'moment';
import { IConsultation } from 'app/shared/model/consultation.model';

export interface IMedicalCertificat {
  id?: string;
  date?: Moment;
  startDate?: Moment;
  endDate?: Moment;
  days?: number;
  urlId?: string;
  consultation?: IConsultation;
}

export const defaultValue: Readonly<IMedicalCertificat> = {};
