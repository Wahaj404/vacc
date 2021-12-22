import { InputField } from "../components/InputField";
import { useProcessAppointmentMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import {
  Button,
  Center,
  Image,
  Stack,
  useToast
  } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";

const Landing: React.FC<{}> = () => {
  const toast = useToast();
  const [, process] = useProcessAppointmentMutation();
  return (
    <Center
      height="100vh"
      backgroundSize={"cover"}
      bgImage="url('https://i.imgur.com/g6WOOy8.jpg')"
    >
      <Formik
        initialValues={{ cnic: "", id: "" }}
        onSubmit={async ({ cnic, id }, { setErrors }) => {
          const res = await process({ cnic, id: parseInt(id) });
          console.log(res);
          if (res.data?.processAppointment.errors) {
            setErrors(toErrorMap(res.data.processAppointment.errors));
          } else if (res.data?.processAppointment.appointment) {
            const appointment = res.data?.processAppointment.appointment;
            if (appointment?.completed) {
              toast({
                title: "Success",
                description: "Appointment processed",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }
          }
          return;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Center
              bgColor="rgba(255, 255, 255, 0.7)"
              height="60vh"
              width="50vh"
              ml={100}
            >
              <Stack spacing={6}>
                <Image
                  objectFit="fill"
                  src="https://i.imgur.com/aGpe0n4.png"
                  alt="Injection Logo"
                />
                <InputField name="cnic" placeholder="cnic" />
                <InputField name="id" placeholder="appointment id" />
                <Button
                  mt={4}
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Verify
                </Button>
              </Stack>
            </Center>
          </Form>
        )}
      </Formik>
    </Center>
  );
};

export default withUrqlClient(createUrqlClient)(Landing);
