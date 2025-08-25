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
  const { employees, postMutation, patchMutation } = useEmployeeService({
    onSuccessCallback: () => {
      form.reset();
      close();
    },
  })

  const { roles } = useRoleService();
  const { departments } = useDepartmentsService({});

  const [opened, { open, close }] = useDisclosure(false);

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

      <Tables>
        <Tables.Head>
          <Tables.Head.Row className="text-center">
            <Tables.Head.Row.Item width={5}>No</Tables.Head.Row.Item>
            <Tables.Head.Row.Item width="10%">Code</Tables.Head.Row.Item>
            <Tables.Head.Row.Item width="20%">Department</Tables.Head.Row.Item>
            <Tables.Head.Row.Item width="30%">Name</Tables.Head.Row.Item>
            <Tables.Head.Row.Item>Status</Tables.Head.Row.Item>
            <Tables.Head.Row.Item>Action</Tables.Head.Row.Item>
          </Tables.Head.Row>
        </Tables.Head>
        <Tables.Body>
          {
            employees?.map((employee, index) => (
              <Tables.Body.Row className="text-center" key={employee.id}>
                <Tables.Body.Row.Item className="text-center">{index + 1}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item>{employee.employee_code}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item>{employee.department?.name}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item>{employee.name}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item className="text-center">
                  <Badge color={employee?.active ? "blue" : "red"}>
                    {employee?.active ? "ACTIVE" : "INACTIVE"}
                  </Badge>
                </Tables.Body.Row.Item>
                <Tables.Body.Row.Item className="flex justify-center">
                  <Button
                    className="rounded-full mr-2"
                    color="secondary"
                    variant="outline"
                    size="compact-sm"
                    onClick={() => handleUpsertPress(employee)}
                  >
                    <Edit size={16} />
                  </Button>
                </Tables.Body.Row.Item>
              </Tables.Body.Row>
            ))
          }
        </Tables.Body>
      </Tables>
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