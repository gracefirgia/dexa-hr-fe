import { Edit } from "lucide-react";
import Cards from "../../../components/card";
import { Badge, Button } from "@mantine/core";
import useDepartmentsService from "./hooks/useDepartmentsService";
import ModalFormDepartments from "./components/modalFormDepartments";
import { useDisclosure } from "@mantine/hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import CustomTables from "../../../components/customTable";

const DepartmentPage = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      active: true,
      id: ""
    },

    validate: {
      name: isNotEmpty("Name is required"),
    },
  });
  const { departments, departmentsCount, postMutation, patchMutation } = useDepartmentsService({
    onSuccessCallback: () => {
      form.reset();
      close();
    },
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [type, setType] = useState("Create")
  const [page, setPage] = useState(1);
  const columns = [
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
      key: "action",
      label: "Action",
      render: (row) => (
        <Button
          className="rounded-full mr-2"
          color="secondary"
          variant="outline"
          size="compact-sm"
          onClick={() => handleUpsertPress("Change", row)}
        >
          <Edit size={16} />
        </Button>
      )
    },
  ]

  const handleUpsertPress = (types, val = null) => {
    setType(types)

    form.setValues({
      name: val?.name,
      active: val?.active,
      id: val?.id
    })
    open()
  }

  const handleSubmitPress = (formValues) => {
    if (type === "Create") {
      postMutation.mutate({
        endpoint: "/departments",
        data: {
          name: formValues.name,
          active: formValues.active
        },
      });
    } else {
      patchMutation.mutate({
        endpoint: `/departments/${formValues.id}`,
        data: {
          name: formValues.name,
          active: formValues.active
        },
      });
    }
  };

  return (
    <Cards className="w-full h-screen">
      <Button className="mb-4" color="primary" onClick={() => handleUpsertPress("Create")}>
        Add Department
      </Button>

      <CustomTables
        columns={columns}
        items={departments}
        count={departmentsCount}
        page={page}
        onPageChange={setPage}
      />
      <ModalFormDepartments
        opened={opened}
        onClose={close}
        form={form}
        type={type}
        handleSubmit={handleSubmitPress}
      />
    </Cards>
  )
}

export default DepartmentPage;