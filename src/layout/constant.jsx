import { Database, Flag, Grid2X2Check, HouseIcon, PenLine, Users } from "lucide-react";

export const NAVBAR_MENUS = [
  {
    label: "GENERAL",
    allowedRoles: ["SUPERADMIN", "EMPLOYEE", "HR", "ADMINHR"],
    menus: [
      {
        icon: <HouseIcon size={16} color="white" />,
        label: "Home",
        link: "/",
      },
      {
        icon: <Grid2X2Check size={16} color="white" />,
        label: "Attendance",
        link: "/attendance",
      },
    ]
  },
  {
    label: "ADMINISTRATOR",
    allowedRoles: ["SUPERADMIN", "HR"],
    menus: [
      {
        icon: <Database size={16} color="white" />,
        label: "Master Data",
        link: "/master-data",
        nestedLink: [
          {
            label: "Departments",
            link: "/master-data/departments",
          },
          {
            label: "Roles",
            link: "/master-data/roles",
          },
        ]
      },
      {
        icon: <Users size={16} color="white" />,
        label: "Employee",
        link: "/employee",
      },
      {
        icon: <Flag size={16} color="white" />,
        label: "Employee Attendance",
        link: "/employee-attendance",
      },
      {
        icon: <PenLine size={16} color="white" />,
        label: "Employee Change Request",
        link: "/employee-change-request",
      },
    ]
  }
]