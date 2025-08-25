import { useForm, isEmail, isNotEmpty } from "@mantine/form";
import networkProto from "../../api/factory";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Stack,
  Button,
  TextInput,
} from "@mantine/core";
import { requestNotificationPermission } from "../../config/firebase";

// john.doe@dexa.com
// password123

const LoginPage = () => {
  const loginService = networkProto;
  const navigate = useNavigate();

  const [_, setCookie] = useCookies(["user_details"]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: isEmail("Invalid email"),
      password: isNotEmpty("Password is required"),
    },
  });

  const saveFcmTokenMutation = loginService.Mutation({
    method: "post",
    onSuccessCallback: (res) => {
      console.log("FCM token saved:", res);
    },
    onErrorCallback: (err) => console.log("Failed to save FCM token:", err),
  });

  const loginMutation = loginService.Mutation({
    method: "post",
    onSuccessCallback: async (res) => {
      const userDetails = res?.data?.data?.user;
      setCookie("user_details", userDetails, {
        path: "/",
        secure: false,
      });
      const token = await requestNotificationPermission();
      handleSaveFcmToken(token);
      navigate("/");
    },
    onErrorCallback: (err) => console.log(err),
  });

  const handleLogin = (formValues) => {
    loginMutation.mutate({
      endpoint: "/auth/login",
      data: {
        email: formValues.email,
        password: formValues.password,
      },
    });
  };

  const handleSaveFcmToken = (token) => {
    saveFcmTokenMutation.mutate({
      endpoint: "/employee-token",
      data: {
        token,
      },
    });
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen gap-5 bg-primary">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-3">
        <img
          src="/logo.webp"
          alt="Your Company"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="text-center text-xl tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="Email"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Password"
              placeholder="Password"
              type="password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />

            <Button
              variant="filled"
              type="submit"
              color="#891405ff"
              size="md"
              loading={loginMutation.isLoading}
              className="mt-2"
            >
              Sign In
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
