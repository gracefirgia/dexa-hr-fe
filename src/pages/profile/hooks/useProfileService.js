import networkProto from "../../../api/factory";

const useProfileService = ({
  id = null,
  onSuccessCallback,
  onErrorCallback
}) => {
  const useProfileService = networkProto;

  const { data, isLoading } = useProfileService.Query({
    endpoint: `/employees/${id}`,
    dependencies: ["employees", id],
    queryConfigs: {
      enabled: !!id,
    },
  });

  const patchMutation = useProfileService.Mutation({
    method: "patch",
    onSuccessCallback: onSuccessCallback,
    onErrorCallback: onErrorCallback,
  });

  return {
    employee: data,
    isLoadingEmployee: isLoading,
    patchMutation
  }
}

export default useProfileService;