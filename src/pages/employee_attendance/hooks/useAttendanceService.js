import networkProto from "../../../api/factory";

const LIMIT = 10

const useEmployeeAttendanceService = () => {
  const attendanceService = networkProto;

  const { data, isLoading } = attendanceService.Query({
    endpoint: "/attendances/all-employee",
    axiosConfigs: { params: { page: 1, limit: LIMIT } },
    dependencies: ["list-all-employee-attendances", 1],
  });

  return {
    attendances: data,
    isLoadingGetAttendances: isLoading
  }
}

export default useEmployeeAttendanceService;