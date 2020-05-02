import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import myUser, {
  MyUserState
} from 'app/entities/my-user/my-user.reducer';
// prettier-ignore
import appointment, {
  AppointmentState
} from 'app/entities/appointment/appointment.reducer';
// prettier-ignore
import cabinet, {
  CabinetState
} from 'app/entities/cabinet/cabinet.reducer';
// prettier-ignore
import consultation, {
  ConsultationState
} from 'app/entities/consultation/consultation.reducer';
// prettier-ignore
import prescription, {
  PrescriptionState
} from 'app/entities/prescription/prescription.reducer';
// prettier-ignore
import drugLine, {
  DrugLineState
} from 'app/entities/drug-line/drug-line.reducer';
// prettier-ignore
import customLine, {
  CustomLineState
} from 'app/entities/custom-line/custom-line.reducer';
// prettier-ignore
import drug, {
  DrugState
} from 'app/entities/drug/drug.reducer';
// prettier-ignore
import oneString, {
  OneStringState
} from 'app/entities/one-string/one-string.reducer';
// prettier-ignore
import medicalCertificat, {
  MedicalCertificatState
} from 'app/entities/medical-certificat/medical-certificat.reducer';
// prettier-ignore
import insurance, {
  InsuranceState
} from 'app/entities/insurance/insurance.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly myUser: MyUserState;
  readonly appointment: AppointmentState;
  readonly cabinet: CabinetState;
  readonly consultation: ConsultationState;
  readonly prescription: PrescriptionState;
  readonly drugLine: DrugLineState;
  readonly customLine: CustomLineState;
  readonly drug: DrugState;
  readonly oneString: OneStringState;
  readonly medicalCertificat: MedicalCertificatState;
  readonly insurance: InsuranceState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  myUser,
  appointment,
  cabinet,
  consultation,
  prescription,
  drugLine,
  customLine,
  drug,
  oneString,
  medicalCertificat,
  insurance,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
