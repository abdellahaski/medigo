import { IDrug } from 'app/shared/model/drug.model';
import { IPrescription } from 'app/shared/model/prescription.model';

export interface IDrugLine {
  id?: string;
  doseMatin?: number;
  doseMidi?: number;
  doseSoir?: number;
  afterBefore?: string;
  duration?: number;
  drug?: IDrug;
  prescription?: IPrescription;
}

export const defaultValue: Readonly<IDrugLine> = {};
