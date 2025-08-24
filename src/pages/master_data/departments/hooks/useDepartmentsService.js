import networkProto from "../../../../api/factory";

const LIMIT = 10

const useDepartmentsService = ({
  onSuccessCallback,
  onErrorCallback
}) => {
  const departmentsService = networkProto;

  const { data, isLoading } = departmentsService.Query({
    endpoint: "/departments",
    axiosConfigs: { params: { page: 1, limit: LIMIT } },
    dependencies: ["list-departments", 1],
  });

  const postMutation = departmentsService.Mutation({
    method: "post",
    onSuccessCallback: onSuccessCallback,
    onErrorCallback: onErrorCallback,
  });

  const patchMutation = departmentsService.Mutation({
    method: "patch",
    onSuccessCallback: onSuccessCallback,
    onErrorCallback: onErrorCallback,
  });

  return {
    departments: data,
    isLoadingGetDepartments: isLoading,
    postMutation,
    patchMutation
  }
}

export default useDepartmentsService;