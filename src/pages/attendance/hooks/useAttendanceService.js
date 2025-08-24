import networkProto from "../../../api/factory";

const LIMIT = 10

const useAttendanceService = () => {
  const attendanceService = networkProto;

  const { data, isLoading } = attendanceService.Query({
    endpoint: "/attendances",
    axiosConfigs: { params: { page: 1, limit: LIMIT } },
    dependencies: ["list-attendances", 1],
  });

  return {
    attendances: data,
    isLoadingGetAttendances: isLoading
  }
}

export default useAttendanceService;