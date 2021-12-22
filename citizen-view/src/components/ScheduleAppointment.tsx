import { NavBar } from "./NavBar/NavBar";
import { isServer } from "../utils/isServer";
import { distance } from "../utils/location";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Router, useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { geolocated, GeolocatedProps } from "react-geolocated";
import {
  useCreateFirstAppointmentMutation,
  useCreateSecondAppointmentMutation,
  useVaccinationCentersQuery,
  VaccinationCentersQuery,
} from "../generated/graphql";
import {
  Box,
  Button,
  Center,
  List,
  ListItem,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

interface StepperFuncs {
  nextStep?: () => void;
  setStep?: (step: number) => void;
  activeStep?: number;

  center?: string;
  setCenter?: Dispatch<SetStateAction<string>>;

  vaccine?: string;
  setVaccine?: Dispatch<SetStateAction<string>>;

  data?: VaccinationCentersQuery;
}

const SelectCenter: React.FC<GeolocatedProps & StepperFuncs> = ({
  coords,
  nextStep,
  setCenter,
  data,
}) => {
  const dist = distance.bind(
    null,
    coords?.latitude || 24.8569,
    coords?.longitude || 67.2647
  );
  const centers = data?.vaccinationCenters;
  return (
    <Center>
      <List width="inherit" m={12} w="50vh">
        {centers
          ?.sort(
            (a, b) =>
              dist(a.location.latitude, a.location.longitude) -
              dist(b.location.latitude, b.location.longitude)
          )
          .map((center) => (
            <ListItem key={center.name} m={4} width="inherit">
              <Stack>
                <Button
                  _hover={{ bg: "blue.400" }}
                  color="whiteAlpha.900"
                  bgColor="blue.500"
                  borderRadius="none"
                  onClick={() => {
                    setCenter && setCenter(center.name);
                    nextStep && nextStep();
                  }}
                >
                  {center.name}
                </Button>
                <Text>
                  {dist(
                    center.location.latitude,
                    center.location.longitude
                  ).toFixed(2)}{" "}
                  km
                </Text>
              </Stack>
            </ListItem>
          ))}
      </List>
    </Center>
  );
};

const SelectVaccine: React.FC<StepperFuncs> = ({
  nextStep,
  data,
  center: centerName,
  setVaccine,
}) => {
  const centers = data?.vaccinationCenters;
  const vaccines = centers?.find((c) => c.name === centerName)?.vaccines;
  return (
    <Center>
      <List width="inherit" m={12} w="50vh">
        {vaccines
          ?.filter((v) => v.doseCount > 0)
          .map((v) => (
            <ListItem key={v.name} m={4} width="inherit">
              <Stack>
                <Button
                  _hover={{ bg: "blue.400" }}
                  color="whiteAlpha.900"
                  bgColor="blue.500"
                  borderRadius="none"
                  onClick={() => {
                    setVaccine && setVaccine(v.name);
                    nextStep && nextStep();
                  }}
                >
                  {v.name}
                </Button>
              </Stack>
            </ListItem>
          ))}
      </List>
    </Center>
  );
};

const toText = (text: string) => <Text color="black">{text}</Text>;

interface Props {
  first?: boolean;
  cnic?: string;
}

const ScheduleAppointmentInternal: React.FC<GeolocatedProps & Props> = ({
  coords,
  first,
  cnic,
}) => {
  const [{ data }] = useVaccinationCentersQuery({ pause: isServer() });
  const { nextStep, setStep, activeStep } = useSteps({
    initialStep: 0,
  });
  const stepClick = (clickedOn: number) => {
    if (clickedOn < activeStep) {
      setStep(clickedOn);
    }
  };
  const [center, setCenter] = useState("");
  const [vaccine, setVaccine] = useState("");
  const [date, setDate] = useState(new Date());
  const router = useRouter();
  const [, createAppointment] = first
    ? useCreateFirstAppointmentMutation()
    : useCreateSecondAppointmentMutation();
  // const [, createAppointment] = useCreateFirstAppointmentMutation();
  const toast = useToast();

  return (
    <Box width="inherit" color="black">
      <NavBar />
      {/* <Center width="inherit"> */}
      <Steps
        m={4}
        activeStep={activeStep}
        orientation="vertical"
        onClickStep={stepClick}
      >
        <Step label={toText("Choose a vaccination center")} key="center">
          <SelectCenter
            coords={coords}
            nextStep={nextStep}
            setCenter={setCenter}
            data={data}
          />
        </Step>
        <Step label={toText("Choose vaccine")} key="vaccine">
          <SelectVaccine
            nextStep={nextStep}
            center={center}
            setVaccine={setVaccine}
            data={data}
          />
        </Step>
        <Step label={toText("Choose date")} key="date">
          <Center>
            <Stack spacing={8}>
              <DatePicker value={date} onChange={setDate} />
              <Button
                _hover={{ bg: "blue.400" }}
                w="100%"
                bgColor="blue.500"
                color="whiteAlpha.900"
                onClick={async () => {
                  if (date < new Date()) {
                    toast({
                      title: "Appointment in the past!",
                      description: "Try selecting a date in the future",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                    return;
                  }
                  const res = await createAppointment({
                    options: {
                      centerName: center,
                      cnic: cnic || "",
                      time: date,
                      vaccineName: vaccine,
                    },
                  });
                  const data = res?.data as any;
                  console.log("data: ", data);
                  if (
                    data.createFirstAppointment?.errors ||
                    data.createSecondAppointment?.errors
                  ) {
                    toast({
                      title: "Vaccination center overbooked",
                      description: "Try selecting a different date",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                  } else {
                    toast({
                      title: "Appointment successfully scheduled",
                      description: "Refresh to see your appointment details",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    });
                  }
                  console.log("res: ");
                  // router.push("./landing");
                }}
              >
                Get Vaccinated Now!
              </Button>
            </Stack>
          </Center>
        </Step>
      </Steps>
      {/* </Center> */}
    </Box>
  );
};

export const ScheduleAppointment = geolocated()(ScheduleAppointmentInternal);
