import networkProto from "../../../api/factory";

const LIMIT = 10

const useEmployeeAttendanceService = ({
  dates,
  page = 1,
  limit = LIMIT
}) => {
  const attendanceService = networkProto;

  const { data, isLoading } = attendanceService.Query({
    endpoint: "/attendances/all-employee",
    axiosConfigs: {
      params: {
        start_date: `${dates[0]} 00:00:00`,
        end_date: `${dates[1]} 23:59:59`,
        page,
        limit
      }
    },
    dependencies: ["list-all-employee-attendances", page],
    queryConfigs: {
      enabled: !!dates[1]
    },
  });

  return {
    attendances: data?.rows,
    attendancesCount: data?.count,
    isLoadingGetAttendances: isLoading
  }
}

export default useEmployeeAttendanceService;