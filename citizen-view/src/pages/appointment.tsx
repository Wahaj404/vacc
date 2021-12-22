import { Card as Card } from "../components/Card";
import { NavBar } from "../components/NavBar/NavBar";
import { ScheduleAppointment } from "../components/ScheduleAppointment";
import { createUrqlClient } from "../utils/createUrqlClient";
import {
  Box,
  Center,
  Stack,
  Text
  } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { GeolocatedProps } from "react-geolocated";
import {
  Appointment,
  AppointmentDetailsMutation,
  Maybe,
  useAppointmentDetailsMutation,
  VaccinationCenter,
} from "../generated/graphql";

type AppointmentType = Maybe<
  { __typename?: "Appointment" } & Pick<
    Appointment,
    "id" | "vaccineName" | "time" | "completed"
  > & {
      center: { __typename?: "VaccinationCenter" } & Pick<
        VaccinationCenter,
        "name"
      >;
    }
>;

interface PendingProps {
  appointment: AppointmentType;
}

const PendingAppointment = ({ appointment }: PendingProps) => {
  return (
    <Box>
      <NavBar />
      <Center m={20} borderColor="teal" borderWidth="2px" padding="10">
        <Stack>
          <Text>You already have an appointment scheduled!</Text>
          <Text>Appointment id: {appointment?.id}</Text>
          <Text>Location: {appointment?.center.name}</Text>
          <Text>Date: {new Date(appointment?.time).toDateString()}</Text>
        </Stack>
      </Center>
    </Box>
  );
};

const AppointmentPage: React.FC<GeolocatedProps> = () => {
  const [, details] = useAppointmentDetailsMutation();
  let [data, setData] = useState<AppointmentDetailsMutation | undefined>(
    undefined
  );
  useEffect(() => {
    const getData = async () => {
      setData((await details()).data);
    };
    getData();
  }, []);
  if (data == undefined) {
    return <Box></Box>;
  }
  const cnic = data.citizenMe?.cnic;
  const name = data.citizenMe?.info.name;
  const first = data.citizenMe?.firstAppointment;
  const second = data.citizenMe?.secondAppointment;
  if (first) {
    if (first.completed) {
      if (second) {
        if (second.completed) {
          // completely vaccinated
          return <Card cnic={cnic} first={first} second={second} name={name} />;
        } else {
          // second appointment is already scheduled
          return <PendingAppointment appointment={second} />;
        }
      } else {
        // schedule second appointment
        return <ScheduleAppointment cnic={cnic} />;
      }
    } else {
      // first appointment is already scheduled
      return <PendingAppointment appointment={first} />;
    }
  } else {
    // schedule first appointment
    return <ScheduleAppointment cnic={cnic} first />;
  }
};

export default withUrqlClient(createUrqlClient)(AppointmentPage);
