import { Avatar, ActionIcon, Button, TextInput } from "@mantine/core";
import Cards from "../../components/card";
import { CameraIcon } from "lucide-react";
import React from "react";

const ProfilePage = () => {
  const [isRequestChange, setIsRequestChange] = React.useState(false);

  const handleChangePress = () => {
    setIsRequestChange((prevState) => !prevState);
  };

  const UserInfo = () => {
    return (
      <>
        <Button onClick={handleChangePress}>Change</Button>

        <div className="mt-3">
          <TextInput
            className="mb-2"
            label="Fullname"
            value={"John Doe"}
            readOnly={!isRequestChange}
          />
          <TextInput
            className="mb-2"
            label="Phone Number"
            value={"john.doe@dexa.com"}
            readOnly={!isRequestChange}
          />
          <TextInput
            className="mb-2"
            label="Email"
            value={"john.doe@dexa.com"}
            readOnly={!isRequestChange}
          />
        </div>
      </>
    )
  }
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Cards className="w-full md:w-1/3 h-[50vh]">
        <UserAvatar />
        <div className="flex flex-col items-center mt-2">
          <p className="text-lg font-semibold">John Doe</p>
          <p>Software Engineer</p>
          <div className="rounded-full py-1 px-2 bg-blue-400">
            <p className="text-xs text-white">Active Employee</p>
          </div>
        </div>
      </Cards>
      <Cards className="w-full md:w-2/3 h-screen">
        <UserInfo />
      </Cards>
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