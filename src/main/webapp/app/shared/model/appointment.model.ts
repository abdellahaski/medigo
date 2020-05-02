import { IMyUser } from 'app/shared/model/my-user.model';

export interface IAppointment {
  id?: string;
  patient?: IMyUser;
}

export const defaultValue: Readonly<IAppointment> = {};
