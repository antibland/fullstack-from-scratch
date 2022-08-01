import { Box, Input, Button, Grid, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, FormEvent, useState } from "react";
import { useSWRConfig } from "swr";
import NextImage from "next/image";
import { auth } from "../lib/mutations";

const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    await auth(mode, { email, password });
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black">
      <Flex
        justifyContent="center"
        paddingBlock="5"
        borderBottom="1px solid white"
      >
        <NextImage src="/logo.svg" width={120} height={60} />
      </Flex>
      <Grid placeContent="center" height="calc(100vh - 101px)">
        <Box padding="50px" bg="gray-900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="email"
              type="email"
              required
              color="white"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              required
              color="white"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                "&:hover": {
                  bg: "green.600",
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Grid>
    </Box>
  );
};

export default AuthForm;
