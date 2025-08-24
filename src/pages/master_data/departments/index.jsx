import { Edit } from "lucide-react";
import Cards from "../../../components/card";
import Tables from "../../../components/table";
import { Badge, Button } from "@mantine/core";
import useDepartmentsService from "./hooks/useDepartmentsService";
import ModalFormDepartments from "./components/modalFormDepartments";
import { useDisclosure } from "@mantine/hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";

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
  const { departments, postMutation, patchMutation } = useDepartmentsService({
    onSuccessCallback: () => {
      form.reset();
      close();
    },
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [type, setType] = useState("Create")

  const handleUpsertPress = (types, val = null) => {
    setType(types)

    if (types === "Change") {
      form.setValues({
        name: val.name,
        active: val.active,
        id: val.id
      })
    }
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

      <Tables>
        <Tables.Head>
          <Tables.Head.Row className="text-center">
            <Tables.Head.Row.Item width={5}>No</Tables.Head.Row.Item>
            <Tables.Head.Row.Item width="30%">Name</Tables.Head.Row.Item>
            <Tables.Head.Row.Item>Status</Tables.Head.Row.Item>
            <Tables.Head.Row.Item>Action</Tables.Head.Row.Item>
          </Tables.Head.Row>
        </Tables.Head>
        <Tables.Body>
          {
            departments?.map((department, index) => (
              <Tables.Body.Row className="text-center" key={department.id}>
                <Tables.Body.Row.Item className="text-center">{index + 1}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item>{department.name}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item className="text-center">
                  <Badge color={department?.active ? "blue" : "red"}>
                    {department?.active ? "ACTIVE" : "INACTIVE"}
                  </Badge>
                </Tables.Body.Row.Item>
                <Tables.Body.Row.Item className="flex justify-center">
                  <Button
                    className="rounded-full mr-2"
                    color="secondary"
                    variant="outline"
                    size="compact-sm"
                    onClick={() => handleUpsertPress("Change", department)}
                  >
                    <Edit size={16} />
                  </Button>
                </Tables.Body.Row.Item>
              </Tables.Body.Row>
            ))
          }
        </Tables.Body>
      </Tables>
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