import networkProto from "../../../api/factory";
import { LIMIT } from "../../../common/constant";

const useChangeRequestService = ({
  dates = [],
  page = 1,
  limit = LIMIT,
  onSuccessCallback,
  onErrorCallback
}) => {
  const changeRequestService = networkProto;

  const { data, isLoading } = changeRequestService.Query({
    endpoint: "/data-change-requests",
    axiosConfigs: { 
      params: {
        start_date: `${dates[0]} 00:00:00`,
        end_date: `${dates[1]} 23:59:59`,
        page,
        limit
      } 
    },
    dependencies: ["list-change-requests", page],
    queryConfigs: {
      enabled: !!dates[1]
    },
  });

  const postMutation = changeRequestService.Mutation({
    method: "post",
    onSuccessCallback: onSuccessCallback,
    onErrorCallback: onErrorCallback,
  });

  return {
    changeRequests: data,
    isLoadingGetChangeRequests: isLoading,
    postMutation
  }
}

export default useChangeRequestService;