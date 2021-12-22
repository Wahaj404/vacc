import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Appointment = {
  __typename?: 'Appointment';
  id: Scalars['Int'];
  center: VaccinationCenter;
  vaccineName: Scalars['String'];
  citizen: Citizen;
  time: Scalars['DateTime'];
  completed: Scalars['Boolean'];
};

export type AppointmentInput = {
  cnic: Scalars['String'];
  centerName: Scalars['String'];
  vaccineName: Scalars['String'];
  time: Scalars['DateTime'];
};

export type AppointmentResponse = {
  __typename?: 'AppointmentResponse';
  errors?: Maybe<Array<FieldError>>;
  appointment?: Maybe<Appointment>;
};

export type Citizen = {
  __typename?: 'Citizen';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  cnic: Scalars['String'];
  firstAppointment?: Maybe<Appointment>;
  secondAppointment?: Maybe<Appointment>;
  info: CitizenInfo;
};

export type CitizenInfo = {
  __typename?: 'CitizenInfo';
  cnic: Scalars['String'];
  name: Scalars['String'];
  age: Scalars['Int'];
  citizen: Citizen;
};

export type CitizenInfoInput = {
  cnic: Scalars['String'];
  name: Scalars['String'];
  age: Scalars['Int'];
};

export type CitizenInfoResponse = {
  __typename?: 'CitizenInfoResponse';
  errors?: Maybe<Array<FieldError>>;
  citizenInfo?: Maybe<CitizenInfo>;
};

export type CitizenInput = {
  cnic: Scalars['String'];
  password: Scalars['String'];
};

export type CitizenResponse = {
  __typename?: 'CitizenResponse';
  errors?: Maybe<Array<FieldError>>;
  citizen?: Maybe<Citizen>;
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type LocationInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFirstAppointment: AppointmentResponse;
  createSecondAppointment: AppointmentResponse;
  processAppointment: AppointmentResponse;
  cancelAppointment: Array<FieldError>;
  citizenRegister: CitizenResponse;
  citizenLogin: CitizenResponse;
  citizenLogout: Scalars['Boolean'];
  citizenMe?: Maybe<Citizen>;
  citizenDeregister: Scalars['Boolean'];
  cardInfo: CitizenResponse;
  verify: CitizenResponse;
  citizenCreate: CitizenInfoResponse;
  createVaccinationCenter: VaccinationCenterResponse;
  addVaccineToCenter: VaccinationCenterResponse;
  registerWorker: WorkerResponse;
  workerLogin: WorkerResponse;
  workerLogout: Scalars['Boolean'];
};


export type MutationCreateFirstAppointmentArgs = {
  options: AppointmentInput;
};


export type MutationCreateSecondAppointmentArgs = {
  options: AppointmentInput;
};


export type MutationProcessAppointmentArgs = {
  cnic: Scalars['String'];
  appointmentId: Scalars['Int'];
};


export type MutationCancelAppointmentArgs = {
  cnic: Scalars['String'];
  appointmentId: Scalars['Float'];
};


export type MutationCitizenRegisterArgs = {
  options: CitizenInput;
};


export type MutationCitizenLoginArgs = {
  options: CitizenInput;
};


export type MutationCitizenDeregisterArgs = {
  cnic: Scalars['String'];
};


export type MutationCardInfoArgs = {
  cnic: Scalars['String'];
};


export type MutationVerifyArgs = {
  id: Scalars['Int'];
};


export type MutationCitizenCreateArgs = {
  options: CitizenInfoInput;
};


export type MutationCreateVaccinationCenterArgs = {
  vaccinationCenter: VaccinationCenterInput;
};


export type MutationAddVaccineToCenterArgs = {
  vaccine: VaccineInput;
};


export type MutationRegisterWorkerArgs = {
  options: WorkerInput;
};


export type MutationWorkerLoginArgs = {
  options: WorkerInput;
};

export type Query = {
  __typename?: 'Query';
  Citizen?: Maybe<Citizen>;
  Citizens: Array<Citizen>;
  citizenMeQuery?: Maybe<Citizen>;
  getStats: Stats;
  vaccinationCenters: Array<VaccinationCenter>;
  worker?: Maybe<Worker>;
  workers: Array<Worker>;
  workerMeQuery?: Maybe<Worker>;
};


export type QueryCitizenArgs = {
  cnic: Scalars['String'];
};


export type QueryWorkerArgs = {
  id: Scalars['Int'];
};

export type Stat = {
  __typename?: 'Stat';
  total: Scalars['Float'];
  lastDay: Scalars['Float'];
};

export type Stats = {
  __typename?: 'Stats';
  firstDose: Stat;
  fullyVaccinated: Stat;
  totalDoses: Stat;
};

export type VaccinationCenter = {
  __typename?: 'VaccinationCenter';
  name: Scalars['String'];
  appointments?: Maybe<Array<Appointment>>;
  vaccines?: Maybe<Array<Vaccine>>;
  location: Location;
};

export type VaccinationCenterInput = {
  name: Scalars['String'];
  location: LocationInput;
};

export type VaccinationCenterResponse = {
  __typename?: 'VaccinationCenterResponse';
  errors?: Maybe<Array<FieldError>>;
  vaccinationCenter?: Maybe<VaccinationCenter>;
};

export type Vaccine = {
  __typename?: 'Vaccine';
  centerName: Scalars['String'];
  name: Scalars['String'];
  doseCount: Scalars['Int'];
  center: VaccinationCenter;
};

export type VaccineInput = {
  centerName: Scalars['String'];
  name: Scalars['String'];
  doseCount: Scalars['Int'];
};

export type Worker = {
  __typename?: 'Worker';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type WorkerInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type WorkerResponse = {
  __typename?: 'WorkerResponse';
  errors?: Maybe<Array<FieldError>>;
  worker?: Maybe<Worker>;
};

export type FetchFragment = (
  { __typename?: 'WorkerResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & Pick<FieldError, 'field' | 'message'>
  )>>, worker?: Maybe<(
    { __typename?: 'Worker' }
    & Pick<Worker, 'username'>
  )> }
);

export type LoginMutationVariables = Exact<{
  options: WorkerInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { workerLogin: (
    { __typename?: 'WorkerResponse' }
    & FetchFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'workerLogout'>
);

export type ProcessAppointmentMutationVariables = Exact<{
  cnic: Scalars['String'];
  id: Scalars['Int'];
}>;


export type ProcessAppointmentMutation = (
  { __typename?: 'Mutation' }
  & { processAppointment: (
    { __typename?: 'AppointmentResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, appointment?: Maybe<(
      { __typename?: 'Appointment' }
      & Pick<Appointment, 'id' | 'completed'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { workerMeQuery?: Maybe<(
    { __typename?: 'Worker' }
    & Pick<Worker, 'username' | 'updatedAt'>
  )> }
);

export const FetchFragmentDoc = gql`
    fragment Fetch on WorkerResponse {
  errors {
    field
    message
  }
  worker {
    username
  }
}
    `;
export const LoginDocument = gql`
    mutation Login($options: WorkerInput!) {
  workerLogin(options: $options) {
    ...Fetch
  }
}
    ${FetchFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  workerLogout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const ProcessAppointmentDocument = gql`
    mutation ProcessAppointment($cnic: String!, $id: Int!) {
  processAppointment(appointmentId: $id, cnic: $cnic) {
    errors {
      field
      message
    }
    appointment {
      id
      completed
    }
  }
}
    `;

export function useProcessAppointmentMutation() {
  return Urql.useMutation<ProcessAppointmentMutation, ProcessAppointmentMutationVariables>(ProcessAppointmentDocument);
};
export const MeDocument = gql`
    query Me {
  workerMeQuery {
    username
    updatedAt
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};