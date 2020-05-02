import { IDrug } from 'app/shared/model/drug.model';

export interface IOneString {
  id?: string;
  content?: string;
  drug?: IDrug;
}

export const defaultValue: Readonly<IOneString> = {};
