import { Badge, Button } from "@mantine/core";
import Cards from "../../components/card";
import { Edit } from "lucide-react";
import useAttendanceService from "./hooks/useAttendanceService";
import moment from "moment";
import { ATTENDANCE_STATUS_COLOR, REQUEST_TYPE } from "../../common/constant";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import CustomTables from "../../components/customTable";
import useChangeRequestService from "../change_request/hooks/useChangeRequestService";
import ModalFormChangeAttendance from "./components/modalFormChangeAttendance";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const AttendancePage = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      date: "",
      clock_in: "",
      clock_in_to: "",
      clock_out: "",
      clock_out_to: "",
      notes: "",
      id: ""
    },
    validate: {
      notes: isNotEmpty("Notes is required"),
    },
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [dates, setDates] = useState([moment().startOf("month").format("YYYY-MM-DD"), moment().endOf("month").format("YYYY-MM-DD")]);
  const [page, setPage] = useState(1);
  const columns = [
    {
      key: "date",
      label: "Date",
      render: (row) => (
        moment(row?.clock_in).format("DD MMM YYYY")
      )
    },
    {
      key: "clock_in",
      label: "Clock In",
      render: (row) => (
        moment(row?.clock_in).format("HH:mm:ss")
      )
    },
    {
      key: "clock_out",
      label: "Clock Out",
      render: (row) => (
        row?.clock_out ? moment(row?.clock_out).format("HH:mm:ss") : "-"
      )
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge color={ATTENDANCE_STATUS_COLOR[row?.status]}>
          {row?.status}
        </Badge>
      )
    },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <Button className="rounded-full mr-2" color="secondary" variant="outline" size="compact-sm" onClick={() => handleChangePress(row)}>
          <Edit size={16} />
        </Button>
      )
    },
  ]

  const { attendances } = useAttendanceService({
    dates,
    page
  })

  const { postMutation } = useChangeRequestService({
    onSuccessCallback: (res) => {
      Swal.fire("Request sent!", `Code: ${res?.data?.data?.code}`, "success").then(() => {
        close();
        form.reset();
      });
    },
    onErrorCallback: (err) => {
      Swal.fire("Failed!", err?.response?.data?.error, "error")
    }
  })

  const handleChangePress = (values) => {
    const date = values?.clock_in ? dayjs(values.clock_in).toDate() : undefined;
    form.setValues({
      id: values?.id,
      clock_in: values?.clock_in,
      clock_out: values?.clock_out,
      date,
      notes: "",
    })
    open()
  }

  const handleSubmitPress = (formValues) => {
    const changes = JSON.stringify({
      date: formValues.date,
      clock_in: formValues.clock_in,
      clock_in_to: formValues.clock_in_to,
      clock_out: formValues.clock_out,
      clock_out_to: formValues.clock_out_to,
      id: formValues.id,
    })
    postMutation.mutate({
      endpoint: "/data-change-requests",
      data: {
        type: REQUEST_TYPE.ATTENDANCE,
        notes: formValues.notes,
        field_changes: changes,
      },
    });
  };

  return (
    <Cards className="w-full h-screen">
      <Button className="mb-2" onClick={() => handleChangePress()}>
        Manually Clock In
      </Button>
      <DatePickerInput
        className="mb-2"
        type="range"
        value={dates}
        onChange={setDates}
      />
      
      <CustomTables
        columns={columns}
        items={attendances}
        page={page}
        onPageChange={setPage}
      />

      <ModalFormChangeAttendance form={form} opened={opened} onClose={close} handleSubmit={handleSubmitPress} />
    </Cards>
  )
}

export default AttendancePage;