import networkProto from "../../../../api/factory";

const LIMIT = 10

const useDepartmentsService = () => {
  const departmentsService = networkProto;

  const { data, isLoading } = departmentsService.Query({
    endpoint: "/departments",
    axiosConfigs: { params: { page: 1, limit: LIMIT } },
    dependencies: ["list-departments", 1],
  });

  return {
    departments: data,
    isLoadingGetDepartments: isLoading
  }
}

export default useDepartmentsService;