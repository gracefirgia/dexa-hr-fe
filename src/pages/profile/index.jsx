import { Avatar, ActionIcon, Button, TextInput, Tabs, PasswordInput, Grid } from "@mantine/core";
import Cards from "../../components/card";
import { CameraIcon } from "lucide-react";
import { useEffect } from "react";
import useProfileService from "./hooks/useProfileService";
import { useCookies } from "react-cookie";
import { isNotEmpty, useForm } from "@mantine/form";
import UserInfoProfile from "./components/userInfo";
import UserSettingProfile from "./components/userSetting";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const [cookie, removeCookie] = useCookies(["user_details"]);
  const userDetails = cookie?.user_details;
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      phone: "",
      code: "",
      department_id: "",
      role_id: "",
      join_date: "",
      terminate_date: "",
      id: "",
    },

    validate: {
      phone: isNotEmpty("Phone is required"),
    },
  });

  const handleLogOut = () => {
    removeCookie("user_details");
  };

  const { employee, patchMutation } = useProfileService({ 
    id: userDetails?.id,
    onSuccessCallback: () => {
      Swal.fire("Saved!", "", "success");
    }
  })

  // TODO: move to onSuccess callback still error
  useEffect(() => {
    form.setValues({
      code: employee?.employee_code,
      name: employee?.name,
      email: employee?.email,
      phone: employee?.detail?.phone,
      department_id: employee?.department?.id,
      role_id: employee?.role?.id,
      join_date: employee?.detail?.join_date,
      terminate_date: employee?.detail?.terminate_date,
      id: employee?.id
    })
  }, [employee])

  const handleSubmitPress = (formValues) => {
    Swal.fire({
      title: "Do you want to save password changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        patchMutation.mutate({
          endpoint: `/employees/${formValues.id}`,
          data: formValues,
        },
        {
          onSuccess: () => {
            Swal.fire("Saved!", "", "success");
          }
        }
      );
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Cards className="w-full md:w-1/3 h-[50vh]">
        <UserAvatar />
        <div className="flex flex-col items-center mt-2">
          <p className="text-lg font-semibold">{employee?.name}</p>
          <p>{employee?.department?.name}</p>
          <div className="rounded-full py-1 px-2 bg-blue-400">
            <p className="text-xs text-white">Active Employee</p>
          </div>
        </div>
      </Cards>

      <Tabs defaultValue="general" className="w-full md:w-2/3 h-screen">
        <Tabs.List className="mb-2">
          <Tabs.Tab value="general" >
            General Information
          </Tabs.Tab>
          <Tabs.Tab value="settings" >
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general">
          <Cards className="">
            <UserInfoProfile form={form} handleSubmitPress={handleSubmitPress} />
          </Cards>
        </Tabs.Panel>

        <Tabs.Panel value="settings">
          <Cards className="">
            <UserSettingProfile patchMutation={patchMutation} handleLogOut={handleLogOut} />
          </Cards>
        </Tabs.Panel>
      </Tabs>
    </div>
  );

}

export default ProfilePage;

const UserAvatar = () => {
  return (
    <div className="w-50 h-50 flex flex-col justify-center">
      {/* Avatar */}
      <Avatar
        src="@/assets/default.jpg"
        alt="User Avatar"
        size={96}
        radius="xl"
        className="border-2 border-gray-300 justify-self-center self-center"
      />

      {/* Camera Icon */}
      <ActionIcon
        className=" bg-white border border-gray-300 shadow-md hover:bg-gray-100 mt-1"
        size="sm"
        radius="xl"
        color="gray"
      >
        <CameraIcon size={16} />
      </ActionIcon>
    </div>
  );
};