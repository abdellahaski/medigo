import { IPrescription } from 'app/shared/model/prescription.model';

export interface ICustomLine {
  id?: string;
  content?: string;
  prescription?: IPrescription;
}

export const defaultValue: Readonly<ICustomLine> = {};
