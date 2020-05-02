import { IAppointment } from 'app/shared/model/appointment.model';
import { IMyUser } from 'app/shared/model/my-user.model';

export interface ICabinet {
  id?: string;
  name?: string;
  address?: string;
  coordinates?: string;
  speciality?: string;
  appointements?: IAppointment[];
  doctors?: IMyUser[];
  assistants?: IMyUser[];
}

export const defaultValue: Readonly<ICabinet> = {};
