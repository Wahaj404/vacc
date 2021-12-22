import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Button,
  Center,
  Stack,
  Image,
  IconButton,
  Flex,
} from "@chakra-ui/react";

const Register = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [, register] = useRegisterMutation();
  return (
    <Center
      height="100vh"
      backgroundSize={"cover"}
      // backgroundRepeat={"fill"}
      bgImage="url('https://i.imgur.com/g6WOOy8.jpg')"
    >
      <Formik
        initialValues={{ cnic: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await register({ options: values });
          if (res.data?.citizenRegister.errors) {
            setErrors(toErrorMap(res.data.citizenRegister.errors));
          } else if (res.data?.citizenRegister.citizen) {
            router.push("/login");
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
              ml={1000}
            >
              <Stack spacing={6}>
                <Image
                  objectFit="fill"
                  src="https://i.imgur.com/aGpe0n4.png"
                  alt="Injection Logo"
                />
                <InputField name="cnic" placeholder="cnic" />
                <Flex dir="row">
                  <InputField
                    name="password"
                    placeholder="password"
                    type={show ? "text" : "password"}
                  />
                  <IconButton
                    height="inherit"
                    aria-label="Show password"
                    bgColor="inherit"
                    icon={show ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShow(!show)}
                  ></IconButton>
                </Flex>
                <Button
                  mt={4}
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Register
                </Button>
              </Stack>
            </Center>
          </Form>
        )}
      </Formik>
    </Center>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
