import { IAppointment } from 'app/shared/model/appointment.model';
import { IConsultation } from 'app/shared/model/consultation.model';
import { ICabinet } from 'app/shared/model/cabinet.model';

export interface IMyUser {
  id?: string;
  username?: string;
  password?: string;
  email?: string;
  active?: boolean;
  firstName?: string;
  lastName?: string;
  cin?: string;
  type?: string;
  currentInsurance?: string;
  appointements?: IAppointment[];
  consultations?: IConsultation[];
  doctorCabinet?: ICabinet;
  assistantCabinet?: ICabinet;
}

export const defaultValue: Readonly<IMyUser> = {
  active: false
};
