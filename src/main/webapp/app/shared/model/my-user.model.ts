import { IAppointment } from 'app/shared/model/appointment.model';

export interface IMyUser {
  id?: string;
  username?: string;
  password?: string;
  email?: string;
  active?: boolean;
  firstName?: string;
  lastName?: string;
  cin?: string;
  appointements?: IAppointment[];
}

export const defaultValue: Readonly<IMyUser> = {
  active: false
};
