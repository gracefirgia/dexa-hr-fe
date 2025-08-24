import { Outlet } from "react-router-dom";
import { useState } from "react";
import { AppShell, Container, NavLink } from "@mantine/core";
import { useLocation } from "react-router";
import Navbar from "@/components/navbar";
import { NAVBAR_MENUS } from "./constant";
import { useCookies } from "react-cookie";

const Layout = () => {
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [cookie, removeCookie] = useCookies(["user_details"]);
  const userDetails = cookie?.user_details;

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleLogOut = () => {
    removeCookie("user_details");
  };

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{
        width: isSidebarOpen ? 280 : 0,
        hiddenBreakpoint: "sm",
        hidden: !isSidebarOpen,
      }}
      padding={0}
    >
      <AppShell.Header className="border-b-0">
        <Navbar {...{ handleToggleSidebar, isSidebarOpen, userDetails, handleLogOut }} />
      </AppShell.Header>
      <AppShell.Navbar
        className="transition-[width] duration-150 ease-linear overflow-hidden"
        bg="primary"
      >
        {NAVBAR_MENUS.filter((sections) =>
          sections.allowedRoles.includes(userDetails.role)
        ).map((section, index) => (
          <div key={`${section.label}-${index}`} className="mb-4">
            <p className="text-xs font-bold text-gray-400 px-4 mt-4 mb-2">
              {section.label}
            </p>
            <div className="flex flex-col gap-1">
              {section.menus.map(
                ({ label, icon, link, nestedLink = [] }, idx) => (
                  <NavLink
                    key={`${section.label}-${label}-${idx}`}
                    href={link}
                    leftSection={icon}
                    className="px-4"
                    label={<p className="text-white">{label}</p>}
                    active={pathname === link}
                    color="gray"
                    {...(!!nestedLink.length && { childrenOffset: 40 })}
                  >
                    {!!nestedLink.length &&
                      nestedLink.map(({ link, label }) => (
                        <NavLink
                          key={link}
                          active={pathname === link}
                          href={link}
                          label={
                            <p className="text-white" color="gray">
                              {label}
                            </p>
                          }
                        />
                      ))}
                  </NavLink>
                )
              )}
            </div>
          </div>
        ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Container fluid p={8} className="min-h-screen">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
