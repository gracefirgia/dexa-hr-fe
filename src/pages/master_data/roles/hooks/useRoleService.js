import networkProto from "../../../../api/factory";

const LIMIT = 10

const useRoleService = () => {
  const departmentsService = networkProto;

  const { data, isLoading } = departmentsService.Query({
    endpoint: "/roles",
    axiosConfigs: { params: { page: 1, limit: LIMIT } },
    dependencies: ["list-roles", 1],
  });

  return {
    roles: data?.rows,
    rolesCount: data?.count,
    isLoadingGetRoles: isLoading
  }
}

export default useRoleService;