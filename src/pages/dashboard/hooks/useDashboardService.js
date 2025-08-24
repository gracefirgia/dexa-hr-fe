import networkProto from "../../../api/factory";

const LIMIT = 10

const useDashboardService = ({
  id = null
}) => {
  const dashboardService = networkProto;

  const { data, isLoading } = dashboardService.Query({
    endpoint: `/attendances/today`,
    dependencies: ["attendances", id],
    queryConfigs: {
      enabled: !!id
    },
  });

  const { data: summaries, isLoading: isLoadingSummary } = dashboardService.Query({
    endpoint: `/attendances/summary`,
    dependencies: ["attendance-summaries", id],
    queryConfigs: {
      enabled: !!id
    },
  });

  const attendanceMutation = dashboardService.Mutation({
    method: "post",
    onSuccessCallback: (res) => {
      console.log(res);
    },
    onErrorCallback: (err) => console.log(err),
  });

  return {
    todayAttendance: data,
    isLoadingTodayAttendance: isLoading,
    summaries,
    isLoadingSummary,
    attendanceMutation
  }
}

export default useDashboardService;