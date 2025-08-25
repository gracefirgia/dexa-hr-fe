import { Flex, Burger, Menu, Button } from "@mantine/core";
import { ChevronDownIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { handleToggleSidebar, isSidebarOpen, userDetails, handleLogOut } = props;
  const isAdmin = userDetails?.role === "SUPERADMIN" || userDetails?.role === "ADMINHR"

  const renderLeftContent = () => (
    <Flex align="center" gap="sm">
      <Burger opened={isSidebarOpen} onClick={handleToggleSidebar} size="sm" color="white" />
      <img src="/logo.webp" alt="Logo" className="hidden md:block max-w-36 h-auto" />
      <span className="hidden md:inline text-lg font-medium text-nowrap text-ellipsis text-white">Attendance Tracker {isAdmin ? "- Admin" : ""}</span>
    </Flex>
  );

  const renderRightContent = () => (
    <Menu width={190}>
      <Menu.Target>
        <Button
          variant="default"
          bg="inherit"
          className="border-none"
          leftSection={<UserIcon color="white" size={16} />}
          rightSection={<ChevronDownIcon color="white" size={16} />}
        >
          <p className="text-white">{userDetails.email}</p>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<SettingsIcon size={16} />}
          onClick={() => navigate("/profile")}
        >
          Profile
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<LogOutIcon size={16} />} onClick={handleLogOut}>
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  return (
    <nav className="bg-primary px-4 py-2 flex justify-between items-center">
      {renderLeftContent()}
      {renderRightContent()}
    </nav>
  );
};

export default Navbar;