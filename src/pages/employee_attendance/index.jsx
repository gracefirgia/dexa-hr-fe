import moment from "moment";
import Cards from "../../components/card";
import { ATTENDANCE_STATUS_COLOR, LIMIT } from "../../common/constant";
import Tables from "../../components/table";
import { Badge } from "@mantine/core";
import useEmployeeAttendanceService from "./hooks/useAttendanceService";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import Paginations from "../../components/pagination";

const EmployeeAttendancePage = () => {
  const [dates, setDates] = useState([moment().startOf("month").format("YYYY-MM-DD"), moment().endOf("month").format("YYYY-MM-DD")]);
  const [page, setPage] = useState(1);
  const { attendances, attendancesCount } = useEmployeeAttendanceService({
    dates,
    page
  })

  return (
    <Cards className="w-full h-screen">
      <DatePickerInput
        className="mb-2"
        type="range"
        value={dates}
        onChange={setDates}
      />
      <Tables>
        <Tables.Head>
          <Tables.Head.Row className="text-center">
            <Tables.Head.Row.Item>No</Tables.Head.Row.Item>
            <Tables.Head.Row.Item width="30%">Name</Tables.Head.Row.Item>
            <Tables.Head.Row.Item width="30%">Date</Tables.Head.Row.Item>
            <Tables.Head.Row.Item>Clock In</Tables.Head.Row.Item>
            <Tables.Head.Row.Item>Clock Out</Tables.Head.Row.Item>
            <Tables.Head.Row.Item>Status</Tables.Head.Row.Item>
          </Tables.Head.Row>
        </Tables.Head>
        <Tables.Body>
          {
            attendances?.map((attendance, index) => (
              <Tables.Body.Row className="text-center" key={attendance.id}>
                <Tables.Body.Row.Item className="text-center">{index + 1}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item>{attendance?.employee?.name}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item>{moment(attendance.clock_in).format("DD MMM YYYY")}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item>{moment(attendance.clock_in).format("HH:mm:ss")}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item>{attendance.clock_out ? moment(attendance.clock_out).format("HH:mm:ss") : ""}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item className="text-center">
                  <Badge color={ATTENDANCE_STATUS_COLOR[attendance?.status]}>
                    {attendance?.status}
                  </Badge>
                </Tables.Body.Row.Item>
              </Tables.Body.Row>
            ))
          }
        </Tables.Body>
      </Tables>
      <Paginations active={page} onChange={setPage} pageSize={LIMIT} total={attendancesCount} />
    </Cards>
  )
}

export default EmployeeAttendancePage;