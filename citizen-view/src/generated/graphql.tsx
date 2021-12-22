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
  loginWorker: WorkerResponse;
};


export type MutationCreateFirstAppointmentArgs = {
  options: AppointmentInput;
};


export type MutationCreateSecondAppointmentArgs = {
  options: AppointmentInput;
};


export type MutationProcessAppointmentArgs = {
  appointmentId: Scalars['Float'];
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


export type MutationLoginWorkerArgs = {
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
  name: Scalars['String'];
  doseCount: Scalars['Int'];
};

export type VaccineInput = {
  centerName: Scalars['String'];
  name: Scalars['String'];
  doseCount: Scalars['Int'];
};

export type Worker = {
  __typename?: 'Worker';
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
  { __typename?: 'CitizenResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & Pick<FieldError, 'field' | 'message'>
  )>>, citizen?: Maybe<(
    { __typename?: 'Citizen' }
    & Pick<Citizen, 'cnic'>
  )> }
);

export type AppointmentDetailsMutationVariables = Exact<{ [key: string]: never; }>;


export type AppointmentDetailsMutation = (
  { __typename?: 'Mutation' }
  & { citizenMe?: Maybe<(
    { __typename?: 'Citizen' }
    & Pick<Citizen, 'cnic'>
    & { firstAppointment?: Maybe<(
      { __typename?: 'Appointment' }
      & Pick<Appointment, 'id' | 'vaccineName' | 'time' | 'completed'>
      & { center: (
        { __typename?: 'VaccinationCenter' }
        & Pick<VaccinationCenter, 'name'>
      ) }
    )>, secondAppointment?: Maybe<(
      { __typename?: 'Appointment' }
      & Pick<Appointment, 'id' | 'vaccineName' | 'time' | 'completed'>
      & { center: (
        { __typename?: 'VaccinationCenter' }
        & Pick<VaccinationCenter, 'name'>
      ) }
    )>, info: (
      { __typename?: 'CitizenInfo' }
      & Pick<CitizenInfo, 'name'>
    ) }
  )> }
);

export type CreateFirstAppointmentMutationVariables = Exact<{
  options: AppointmentInput;
}>;


export type CreateFirstAppointmentMutation = (
  { __typename?: 'Mutation' }
  & { createFirstAppointment: (
    { __typename?: 'AppointmentResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, appointment?: Maybe<(
      { __typename?: 'Appointment' }
      & Pick<Appointment, 'id' | 'vaccineName' | 'time' | 'completed'>
      & { center: (
        { __typename?: 'VaccinationCenter' }
        & Pick<VaccinationCenter, 'name'>
        & { appointments?: Maybe<Array<(
          { __typename?: 'Appointment' }
          & Pick<Appointment, 'id'>
        )>> }
      ), citizen: (
        { __typename?: 'Citizen' }
        & { info: (
          { __typename?: 'CitizenInfo' }
          & Pick<CitizenInfo, 'name'>
        ) }
      ) }
    )> }
  ) }
);

export type CreateSecondAppointmentMutationVariables = Exact<{
  options: AppointmentInput;
}>;


export type CreateSecondAppointmentMutation = (
  { __typename?: 'Mutation' }
  & { createSecondAppointment: (
    { __typename?: 'AppointmentResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, appointment?: Maybe<(
      { __typename?: 'Appointment' }
      & Pick<Appointment, 'id' | 'vaccineName' | 'time' | 'completed'>
      & { center: (
        { __typename?: 'VaccinationCenter' }
        & Pick<VaccinationCenter, 'name'>
        & { appointments?: Maybe<Array<(
          { __typename?: 'Appointment' }
          & Pick<Appointment, 'id'>
        )>> }
      ), citizen: (
        { __typename?: 'Citizen' }
        & { info: (
          { __typename?: 'CitizenInfo' }
          & Pick<CitizenInfo, 'name'>
        ) }
      ) }
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  options: CitizenInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { citizenLogin: (
    { __typename?: 'CitizenResponse' }
    & FetchFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'citizenLogout'>
);

export type RegisterMutationVariables = Exact<{
  options: CitizenInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { citizenRegister: (
    { __typename?: 'CitizenResponse' }
    & FetchFragment
  ) }
);

export type VerifyMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type VerifyMutation = (
  { __typename?: 'Mutation' }
  & { verify: (
    { __typename?: 'CitizenResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, citizen?: Maybe<(
      { __typename?: 'Citizen' }
      & Pick<Citizen, 'cnic'>
      & { firstAppointment?: Maybe<(
        { __typename?: 'Appointment' }
        & Pick<Appointment, 'id' | 'vaccineName' | 'time' | 'completed'>
        & { center: (
          { __typename?: 'VaccinationCenter' }
          & Pick<VaccinationCenter, 'name'>
        ) }
      )>, secondAppointment?: Maybe<(
        { __typename?: 'Appointment' }
        & Pick<Appointment, 'id' | 'vaccineName' | 'time' | 'completed'>
        & { center: (
          { __typename?: 'VaccinationCenter' }
          & Pick<VaccinationCenter, 'name'>
        ) }
      )>, info: (
        { __typename?: 'CitizenInfo' }
        & Pick<CitizenInfo, 'name'>
      ) }
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { citizenMeQuery?: Maybe<(
    { __typename?: 'Citizen' }
    & Pick<Citizen, 'cnic' | 'updatedAt'>
    & { info: (
      { __typename?: 'CitizenInfo' }
      & Pick<CitizenInfo, 'name'>
    ) }
  )> }
);

export type StatsQueryVariables = Exact<{ [key: string]: never; }>;


export type StatsQuery = (
  { __typename?: 'Query' }
  & { getStats: (
    { __typename?: 'Stats' }
    & { firstDose: (
      { __typename?: 'Stat' }
      & Pick<Stat, 'total' | 'lastDay'>
    ), fullyVaccinated: (
      { __typename?: 'Stat' }
      & Pick<Stat, 'total' | 'lastDay'>
    ), totalDoses: (
      { __typename?: 'Stat' }
      & Pick<Stat, 'total' | 'lastDay'>
    ) }
  ) }
);

export type VaccinationCentersQueryVariables = Exact<{ [key: string]: never; }>;


export type VaccinationCentersQuery = (
  { __typename?: 'Query' }
  & { vaccinationCenters: Array<(
    { __typename?: 'VaccinationCenter' }
    & Pick<VaccinationCenter, 'name'>
    & { appointments?: Maybe<Array<(
      { __typename?: 'Appointment' }
      & Pick<Appointment, 'time'>
    )>>, vaccines?: Maybe<Array<(
      { __typename?: 'Vaccine' }
      & Pick<Vaccine, 'name' | 'doseCount'>
    )>>, location: (
      { __typename?: 'Location' }
      & Pick<Location, 'latitude' | 'longitude'>
    ) }
  )> }
);

export const FetchFragmentDoc = gql`
    fragment Fetch on CitizenResponse {
  errors {
    field
    message
  }
  citizen {
    cnic
  }
}
    `;
export const AppointmentDetailsDocument = gql`
    mutation AppointmentDetails {
  citizenMe {
    cnic
    firstAppointment {
      id
      center {
        name
      }
      vaccineName
      time
      completed
    }
    secondAppointment {
      id
      center {
        name
      }
      vaccineName
      time
      completed
    }
    info {
      name
    }
  }
}
    `;

export function useAppointmentDetailsMutation() {
  return Urql.useMutation<AppointmentDetailsMutation, AppointmentDetailsMutationVariables>(AppointmentDetailsDocument);
};
export const CreateFirstAppointmentDocument = gql`
    mutation CreateFirstAppointment($options: AppointmentInput!) {
  createFirstAppointment(options: $options) {
    errors {
      field
      message
    }
    appointment {
      id
      center {
        name
        appointments {
          id
        }
      }
      vaccineName
      citizen {
        info {
          name
        }
      }
      time
      completed
    }
  }
}
    `;

export function useCreateFirstAppointmentMutation() {
  return Urql.useMutation<CreateFirstAppointmentMutation, CreateFirstAppointmentMutationVariables>(CreateFirstAppointmentDocument);
};
export const CreateSecondAppointmentDocument = gql`
    mutation CreateSecondAppointment($options: AppointmentInput!) {
  createSecondAppointment(options: $options) {
    errors {
      field
      message
    }
    appointment {
      id
      center {
        name
        appointments {
          id
        }
      }
      vaccineName
      citizen {
        info {
          name
        }
      }
      time
      completed
    }
  }
}
    `;

export function useCreateSecondAppointmentMutation() {
  return Urql.useMutation<CreateSecondAppointmentMutation, CreateSecondAppointmentMutationVariables>(CreateSecondAppointmentDocument);
};
export const LoginDocument = gql`
    mutation Login($options: CitizenInput!) {
  citizenLogin(options: $options) {
    ...Fetch
  }
}
    ${FetchFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  citizenLogout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: CitizenInput!) {
  citizenRegister(options: $options) {
    ...Fetch
  }
}
    ${FetchFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const VerifyDocument = gql`
    mutation Verify($id: Int!) {
  verify(id: $id) {
    errors {
      field
      message
    }
    citizen {
      cnic
      firstAppointment {
        id
        center {
          name
        }
        vaccineName
        time
        completed
      }
      secondAppointment {
        id
        center {
          name
        }
        vaccineName
        time
        completed
      }
      info {
        name
      }
    }
  }
}
    `;

export function useVerifyMutation() {
  return Urql.useMutation<VerifyMutation, VerifyMutationVariables>(VerifyDocument);
};
export const MeDocument = gql`
    query Me {
  citizenMeQuery {
    cnic
    updatedAt
    info {
      name
    }
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const StatsDocument = gql`
    query Stats {
  getStats {
    firstDose {
      total
      lastDay
    }
    fullyVaccinated {
      total
      lastDay
    }
    totalDoses {
      total
      lastDay
    }
  }
}
    `;

export function useStatsQuery(options: Omit<Urql.UseQueryArgs<StatsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StatsQuery>({ query: StatsDocument, ...options });
};
export const VaccinationCentersDocument = gql`
    query VaccinationCenters {
  vaccinationCenters {
    name
    appointments {
      time
    }
    vaccines {
      name
      doseCount
    }
    location {
      latitude
      longitude
    }
  }
}
    `;

export function useVaccinationCentersQuery(options: Omit<Urql.UseQueryArgs<VaccinationCentersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<VaccinationCentersQuery>({ query: VaccinationCentersDocument, ...options });
};