import { IMedicalCertificat } from 'app/shared/model/medical-certificat.model';
import { IAppointment } from 'app/shared/model/appointment.model';
import { IPrescription } from 'app/shared/model/prescription.model';
import { IInsurance } from 'app/shared/model/insurance.model';
import { IMyUser } from 'app/shared/model/my-user.model';

export interface IConsultation {
  id?: string;
  type?: string;
  cost?: number;
  advance?: number;
  medicalCertificats?: IMedicalCertificat[];
  appointements?: IAppointment[];
  prescriptions?: IPrescription[];
  insurances?: IInsurance[];
  doctor?: IMyUser;
}

export const defaultValue: Readonly<IConsultation> = {};
