import networkProto from "../../../api/factory";

const LIMIT = 10

const useEmployeeService = ({
  onSuccessCallback,
  onErrorCallback
}) => {
  const employeeService = networkProto;

  const { data, isLoading } = employeeService.Query({
    endpoint: `/employees`,
    dependencies: ["list-employees", 1],
    queryConfigs: {
    },
  });

  const postMutation = employeeService.Mutation({
    method: "post",
    onSuccessCallback: onSuccessCallback,
    onErrorCallback: onErrorCallback,
  });

  const patchMutation = employeeService.Mutation({
    method: "patch",
    onSuccessCallback: onSuccessCallback,
    onErrorCallback: onErrorCallback,
  });

  return {
    employees: data?.rows,
    employeesCount: data?.count,
    isLoadingEmployees: isLoading,
    postMutation,
    patchMutation
  }
}

export default useEmployeeService;