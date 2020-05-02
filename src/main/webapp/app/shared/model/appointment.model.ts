import { Moment } from 'moment';
import { IMyUser } from 'app/shared/model/my-user.model';
import { ICabinet } from 'app/shared/model/cabinet.model';
import { IConsultation } from 'app/shared/model/consultation.model';

export interface IAppointment {
  id?: string;
  dateTime?: Moment;
  notes?: string;
  patient?: IMyUser;
  cabinet?: ICabinet;
  consultation?: IConsultation;
}

export const defaultValue: Readonly<IAppointment> = {};
