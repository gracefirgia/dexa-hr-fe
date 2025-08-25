import networkProto from "../../../api/factory";
import { LIMIT } from "../../../common/constant";

const useAttendanceService = ({
  dates,
  page = 1,
  limit = LIMIT
}) => {
  const attendanceService = networkProto;

  const { data, isLoading } = attendanceService.Query({
    endpoint: "/attendances",
    axiosConfigs: { 
      params: {
        start_date: `${dates[0]} 00:00:00`,
        end_date: `${dates[1]} 23:59:59`,
        page,
        limit
      } 
    },
    dependencies: ["list-attendances", page],
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

export default useAttendanceService;