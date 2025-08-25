import moment from "moment";
import Cards from "../../components/card";
import { ATTENDANCE_STATUS_COLOR } from "../../common/constant";
import { Badge } from "@mantine/core";
import useEmployeeAttendanceService from "./hooks/useAttendanceService";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import CustomTables from "../../components/customTable";

const EmployeeAttendancePage = () => {
  const [dates, setDates] = useState([moment().startOf("month").format("YYYY-MM-DD"), moment().endOf("month").format("YYYY-MM-DD")]);
  const [page, setPage] = useState(1);
  const { attendances, attendancesCount } = useEmployeeAttendanceService({
    dates,
    page
  })
  const columns = [
    { 
      key: "name", 
      label: "Name",
      render: (row) => row.employee?.name ?? "-"
     },
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
        count={attendancesCount}
        page={page}
        onPageChange={setPage}
      />
    </Cards>
  )
}

export default EmployeeAttendancePage;