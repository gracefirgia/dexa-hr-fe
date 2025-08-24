import { Flex, Badge, Button, Group, Text, Grid } from "@mantine/core";
import Cards from "../../components/card";
import { useEffect, useMemo, useState } from "react";
import useDashboardService from "./hooks/useDashboardService";
import { useCookies } from "react-cookie";
import moment from "moment";
import { ClockPlus, Grid2X2, Grid2X2Check, Grid2X2Plus, Grid2x2X } from "lucide-react";

const DashboardPage = () => {
  const [cookie] = useCookies(["user_details"]);
  const userDetails = cookie?.user_details;
  const { todayAttendance, summaries, attendanceMutation } = useDashboardService({ id: userDetails?.id })
  const alreadyClockIn = !!todayAttendance?.clock_in
  const alreadyClockOut = !!todayAttendance?.clock_out
  const icons = useMemo(() => ({
    total: <Grid2X2 size={18} className="text-blue-400" />,
    late: <Grid2x2X size={18} className="text-red-400" />,
    over: <Grid2X2Check size={18} className="text-green-400" />,
    under: <Grid2X2Plus size={18} className="text-yellow-400" />,
  }), []);

  const handleRecordAttendance = () => {
    attendanceMutation.mutate({
      endpoint: "/attendances",
      data: {
        ...(todayAttendance && { id: todayAttendance?.id }),
        ...(todayAttendance && { clockIn: todayAttendance?.clock_in })
      },
    });
  };

  return (
    <>
      <Cards>
        <LiveClock name={userDetails?.name} />
        <Grid>
          <Grid.Col span={6}>
            <Flex direction="column">
              <Text size="sm">Clock-in:</Text>
              <Text size="lg">{formatTimeMoment(todayAttendance?.clock_in)}</Text>
            </Flex>
          </Grid.Col>
          <Grid.Col span={6}>
            <Flex direction="column">
              <Text size="sm">Clock-out:</Text>
              <Text size="lg">{formatTimeMoment(todayAttendance?.clock_out)}</Text>
            </Flex>
          </Grid.Col>
        </Grid>

        <Button
          color={todayAttendance ? "red" : "blue"}
          fullWidth mt="md" radius="md"
          disabled={alreadyClockIn && alreadyClockOut}
          onClick={handleRecordAttendance}
        >
          Clock {todayAttendance ? "Out" : "In"}
        </Button>

      </Cards>

      <Cards className="mt-2">
        <AttendanceSummary
          data={summaries}
          icons={icons} 
        />
      </Cards>
    </>
  )
}

export default DashboardPage;

const formatTimeMoment = (time) => {
  if (!time) return "-"
  return moment(time).format("HH:mm:ss")
}

const formatTime = (date) => date.toLocaleTimeString("en-US", {
  hour12: false,
  timeZone: "Asia/Jakarta",
});

const formatDate = (date) => date.toLocaleDateString("en-US", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  timeZone: "Asia/Jakarta",
});

const AttendanceSummaryItem = ({ type, count, icon }) => {
  return (
    <Grid.Col span={3} className="bg-slate-100 rounded-lg">
      <Flex align="center">
        <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-2`}>
          {icon}
        </div>
        <Flex direction="column">
          <Text fw={700}>{count} Days</Text>
          <Text size="xs">{type} Attendances</Text>
        </Flex>
      </Flex>
    </Grid.Col>
  )
}

const AttendanceSummary = ({ data, icons }) => {
  console.log({data})
  return (
    <Grid>
      <AttendanceSummaryItem type="Total" count={data?.total} icon={icons.total} />
      <AttendanceSummaryItem type="Late" count={data?.late} icon={icons.late} />
      <AttendanceSummaryItem type="Overtime" count={data?.over} icon={icons.over}/>
      <AttendanceSummaryItem type="Undertime" count={data?.under} icon={icons.under}/>
    </Grid>
  )
}

const LiveClock = ({ name }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Group justify="space-between" mt="md" mb="xs">
      <Flex direction="column">
        <p className="text-lg font-semibold">Hi, {name}!</p>
        <Text size="sm" c="dimmed">
          It's {formatDate(time)}
        </Text>
      </Flex>
      <Badge color="pink" size="lg">{formatTime(time)}</Badge>
    </Group>
  );
};
