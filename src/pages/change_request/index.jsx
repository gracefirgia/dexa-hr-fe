import { useState } from "react";
import Cards from "../../components/card";
import CustomTables from "../../components/customTable";
import moment from "moment";
import useChangeRequestService from "./hooks/useChangeRequestService";
import { Eye } from "lucide-react";
import { ATTENDANCE_STATUS_COLOR, CHANGE_REQUEST_STATUS_COLOR } from "../../common/constant";
import { Badge, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import ModalFormEmployeeChangeRequest from "./components/modalFormEmployeeChangeRequest";
import { useDisclosure } from "@mantine/hooks";

const ChangeRequestPage = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      clock_in: "",
      clock_in_to: "",
      clock_out: "",
      clock_out_to: "",
      notes: "",
      status: "",
      id: ""
    },
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [dates, setDates] = useState([moment().startOf("month").format("YYYY-MM-DD"), moment().endOf("month").format("YYYY-MM-DD")]);
  const [page, setPage] = useState(1);
  const columns = [
    {
      key: "code",
      label: "Code",
    },
    {
      key: "employee",
      label: "Name",
      render: (row) => row?.employee?.name
    },
    {
      key: "type",
      label: "Type"
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge color={CHANGE_REQUEST_STATUS_COLOR[row?.status]}>
          {row?.status}
        </Badge>
      )
    },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <Button className="rounded-full mr-2" color="secondary" variant="outline" size="compact-sm" onClick={() => handleViewPress(row)}>
          <Eye size={16} />
        </Button>
      )
    },
  ]

  const { changeRequests } = useChangeRequestService({
    dates,
    page
  })

  const handleViewPress = (values) => {
    form.setValues({
      id: values?.id,
      requested_at: values?.requested_at,
      requested_by: values?.employee?.name,
      clock_in: values?.field_changes?.clock_in,
      clock_in_to: values?.field_changes?.clock_in_to,
      clock_out: values?.field_changes?.clock_out,
      clock_out_to: values?.field_changes?.clock_out_to,
      notes: values?.notes,
      type: values?.type,
      status: values?.status,
      code: values?.code,
    })
    open()
  }

  return (
    <Cards className="w-full h-screen">
      <DatePickerInput
        className="mb-2"
        type="range"
        value={dates}
        onChange={setDates}
      />

      <CustomTables
        columns={columns}
        items={changeRequests}
        page={page}
        onPageChange={setPage}
      />
      <ModalFormEmployeeChangeRequest form={form} opened={opened} onClose={close} handleSubmit={() => {}} />
    </Cards>
  )
}

export default ChangeRequestPage;