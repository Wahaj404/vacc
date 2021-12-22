import { InputField } from "../components/InputField";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import {
    Button,
    Center,
    Image,
    Stack
    } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";

const Verify = () => {
  const [, verify] = useVerifyMutation();
  return (
    <Center
      height="100vh"
      backgroundSize={"cover"}
      bgImage="url('https://i.imgur.com/g6WOOy8.jpg')"
    >
      <Formik
        initialValues={{ id: "" }}
        onSubmit={async ({ id }, { setErrors }) => {
          const res = await verify({ id: parseInt(id) });
          if (res.data?.verify.errors) {
            setErrors(toErrorMap(res.data.verify.errors));
          } else {
            const citizen = res.data?.verify.citizen;
            setProps({
              cnic: citizen?.cnic,
              name: citizen?.info?.name,
              first: citizen?.firstAppointment,
              second: citizen?.secondAppointment,
            });
          }
          return res;
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

export default withUrqlClient(createUrqlClient)(Verify);
