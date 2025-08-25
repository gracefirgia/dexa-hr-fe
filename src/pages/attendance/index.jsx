import { Badge, Button } from "@mantine/core";
import Cards from "../../components/card";
import { Edit } from "lucide-react";
import Tables from "../../components/table";
import useAttendanceService from "./hooks/useAttendanceService";
import moment from "moment";
import { ATTENDANCE_STATUS_COLOR } from "../../common/constant";

const AttendancePage = () => {
  const { attendances } = useAttendanceService()

  return (
    <Cards className="w-full h-screen">
      <Tables>
        <Tables.Head>
          <Tables.Head.Row className="text-center">
            <Tables.Head.Row.Item>No</Tables.Head.Row.Item>
            <Tables.Head.Row.Item width="30%">Date</Tables.Head.Row.Item>
            <Tables.Head.Row.Item>Clock In</Tables.Head.Row.Item>
            <Tables.Head.Row.Item>Clock Out</Tables.Head.Row.Item>
            <Tables.Head.Row.Item>Status</Tables.Head.Row.Item>
            <Tables.Head.Row.Item>Action</Tables.Head.Row.Item>
          </Tables.Head.Row>
        </Tables.Head>
        <Tables.Body>
          {
            attendances?.map((attendance, index) => (
              <Tables.Body.Row className="text-center" key={attendance.id}>
                <Tables.Body.Row.Item className="text-center">{index + 1}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item>{moment(attendance.clock_in).format("DD MMM YYYY")}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item>{moment(attendance.clock_in).format("HH:mm:ss")}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item>{attendance.clock_out ? moment(attendance.clock_out).format("HH:mm:ss") : ""}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item className="text-center">
                  <Badge color={ATTENDANCE_STATUS_COLOR[attendance?.status]}>
                    {attendance?.status}
                  </Badge>
                </Tables.Body.Row.Item>
                <Tables.Body.Row.Item className="flex justify-center">
                  <Button className="rounded-full mr-2" color="secondary" variant="outline" size="compact-sm">
                    <Edit size={16} />
                  </Button>
                </Tables.Body.Row.Item>
              </Tables.Body.Row>
            ))
          }
        </Tables.Body>
      </Tables>
    </Cards>
  )
}

export default AttendancePage;