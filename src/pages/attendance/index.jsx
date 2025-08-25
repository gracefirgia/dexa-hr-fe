import { Badge, Button } from "@mantine/core";
import Cards from "../../components/card";
import { Edit } from "lucide-react";
import useAttendanceService from "./hooks/useAttendanceService";
import moment from "moment";
import { ATTENDANCE_STATUS_COLOR } from "../../common/constant";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import CustomTables from "../../components/customTable";

const AttendancePage = () => {
  const [dates, setDates] = useState([moment().startOf("month").format("YYYY-MM-DD"), moment().endOf("month").format("YYYY-MM-DD")]);
  const [page, setPage] = useState(1);

  const { attendances } = useAttendanceService({
    dates,
    page
  })

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
        moment(row?.clock_out).format("HH:mm:ss")
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
      render: () => (
        <Button className="rounded-full mr-2" color="secondary" variant="outline" size="compact-sm">
          <Edit size={16} />
        </Button>
      )
    },
  ]

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
        items={attendances}
        page={page}
        onPageChange={setPage}
      />
    </Cards>
  )
}

export default AttendancePage;