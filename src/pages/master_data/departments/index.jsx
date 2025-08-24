import { Edit } from "lucide-react";
import Cards from "../../../components/card";
import Tables from "../../../components/table";
import { Button } from "@mantine/core";
import Pills from "../../../components/pills";
import useDepartmentsService from "./hooks/useDepartmentsService";
import ModalFormDepartments from "./components/modalFormDepartments";
import { useDisclosure } from "@mantine/hooks";

const DepartmentPage = () => {
  const { departments } = useDepartmentsService();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Cards className="w-full h-screen">

      <Button className="mb-4" color="primary" onClick={open}>
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
                  <Pills label="Active" />
                </Tables.Body.Row.Item>
                <Tables.Body.Row.Item className="flex justify-center">
                  <Button className="rounded-full mr-2" color="secondary" variant="outline">
                    <Edit size={16} />
                  </Button>
                </Tables.Body.Row.Item>
              </Tables.Body.Row>
            ))
          }
        </Tables.Body>
      </Tables>
      <ModalFormDepartments opened={opened} onClose={close} />
    </Cards>
  )
}

export default DepartmentPage;