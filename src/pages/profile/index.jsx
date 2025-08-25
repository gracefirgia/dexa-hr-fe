import { Avatar, ActionIcon, Tabs } from "@mantine/core";
import Cards from "../../components/card";
import { CameraIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import useProfileService from "./hooks/useProfileService";
import { useCookies } from "react-cookie";
import { isNotEmpty, useForm } from "@mantine/form";
import UserInfoProfile from "./components/userInfo";
import UserSettingProfile from "./components/userSetting";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const fileInputRef = useRef(null);
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
  const [cookie] = useCookies(["user_details"]);

  const userDetails = cookie?.user_details;

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
      if (result.isConfirmed) {
        patchMutation.mutate({
          endpoint: `/employees/${formValues.id}`,
          data: formValues,
        },
      );
      }
    });
  };

  const handleClickCamera = () => {
    fileInputRef.current.click(); // trigger hidden file input
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // validate type
    if (!["image/jpeg", "image/png", "image/gif"].includes(selectedFile.type)) {
      Swal.fire("Invalid file", "Only JPG, PNG, or GIF allowed!", "error");
      return;
    }

    // validate size (2MB)
    if (selectedFile.size > 2 * 1024 * 1024) {
      Swal.fire("File too large", "Max file size is 2MB", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await patchMutation.mutateAsync({
        endpoint: `/employee-details/profile-picture`,
        data: formData,
        axiosConfigs: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
      Swal.fire("Uploaded!", "", "success");
    } catch (err) {
      Swal.fire("Error", "Upload failed", "error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Cards className="w-full md:w-1/3 h-[50vh]">
        <UserAvatar
          handleFileChange={handleFileChange}
          fileInputRef={fileInputRef}
          handleClickCamera={handleClickCamera}
          filename={employee?.detail?.photo}
        />
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
            <UserSettingProfile patchMutation={patchMutation} />
          </Cards>
        </Tabs.Panel>
      </Tabs>
    </div>
  );

}

export default ProfilePage;

const UserAvatar = ({ handleFileChange, fileInputRef, handleClickCamera, filename = null }) => {
  return (
    <div className="w-50 h-50 flex flex-col justify-center">
      {/* Avatar */}
      <Avatar
        src={
          filename
            ? `http://localhost:3000/uploads/employee_profile/${filename}`
            : "@/assets/default.jpg"
        }
        alt="User Avatar"
        size={96}
        radius="xl"
        className="border-2 border-gray-300 justify-self-center self-center"
      />

      {/* Camera Icon */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <ActionIcon
        className=" bg-white border border-gray-300 shadow-md hover:bg-gray-100 mt-1"
        size="sm"
        radius="xl"
        color="gray"
        onClick={handleClickCamera}
      >
        <CameraIcon size={16} />
      </ActionIcon>
    </div>
  );
};