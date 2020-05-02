import { IOneString } from 'app/shared/model/one-string.model';

export interface IDrug {
  id?: string;
  label?: string;
  type?: string;
  validated?: boolean;
  cabinetIds?: IOneString[];
}

export const defaultValue: Readonly<IDrug> = {
  validated: false
};
