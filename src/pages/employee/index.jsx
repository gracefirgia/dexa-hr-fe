import { Badge, Button } from "@mantine/core";
import Cards from "../../components/card";
import Tables from "../../components/table";
import useEmployeeService from "./hooks/useEmployeeService";
import { Edit } from "lucide-react";
import ModalFormEmployee from "./components/modalFormEmployee";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import useRoleService from "../master_data/roles/hooks/useRoleService";
import useDepartmentsService from "../master_data/departments/hooks/useDepartmentsService";
import CustomTables from "../../components/customTable";
import { useState } from "react";

const EmployeePage = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      code: "",
      name: "",
      email: "",
      phone: "",
      department_id: "",
      role_id: "",
      password: "",
      join_date: "",
      terminate_date: "",
      active: true,
      id: ""
    },

    validate: {
      name: isNotEmpty("Name is required"),
      email: isNotEmpty("Email is required"),
      phone: isNotEmpty("Phone is required"),
      department_id: isNotEmpty("Department is required"),
      role_id: isNotEmpty("Role is required"),
    },
  });
  const { employees, employeesCount, postMutation, patchMutation } = useEmployeeService({
    onSuccessCallback: () => {
      form.reset();
      close();
    },
  })

  const { roles } = useRoleService();
  const { departments } = useDepartmentsService({});

  const [opened, { open, close }] = useDisclosure(false);
  const [page, setPage] = useState(1);
  const columns = [
    {
      key: "code",
      label: "Code",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge color={row?.active ? "blue" : "red"}>
          {row?.active ? "ACTIVE" : "INACTIVE"}
        </Badge>
      )
    },
    {
      key: "department",
      label: "Department",
      render: (row) => row?.department?.name
    },
    {
      key: "role",
      label: "Role",
      render: (row) => row?.role?.name
    },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <Button
          className="rounded-full mr-2"
          color="secondary"
          variant="outline"
          size="compact-sm"
          onClick={() => handleUpsertPress(row)}
        >
          <Edit size={16} />
        </Button>
      )
    },
  ]

  const handleUpsertPress = (val = null) => {
    form.setValues({
      department_id: val?.department?.id,
      role_id: val?.role?.id,
      code: val?.employee_code,
      email: val?.email,
      phone: val?.detail?.phone,
      join_date: val?.detail?.join_date,
      terminate_date: val?.detail?.terminate_date,
      name: val?.name,
      ...(val && {active: val.active}),
      id: val?.id
    })
    open()
  }

  const handleSubmitPress = (formValues) => {
    if (!formValues.id) {
      postMutation.mutate({
        endpoint: "/employees",
        data: formValues,
      });
    } else {
      patchMutation.mutate({
        endpoint: `/employees/${formValues.id}`,
        data: formValues,
      });
    }
  };

  return (
    <Cards className="w-full h-screen">
      <Button className="mb-4" color="primary" onClick={() => handleUpsertPress()}>
        Add Employee
      </Button>

      <CustomTables
        columns={columns}
        items={employees}
        count={employeesCount}
        page={page}
        onPageChange={setPage}
      />
      
      <ModalFormEmployee
        opened={opened}
        onClose={close}
        form={form}
        handleSubmit={handleSubmitPress}
        datas={{
          roles,
          departments
        }}
      />
    </Cards>
  )
}

export default EmployeePage;