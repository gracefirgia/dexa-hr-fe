import networkProto from "../../../api/factory";

const LIMIT = 10

const useProfileService = ({
  id = null,
}) => {
  const departmentsService = networkProto;

  const { data, isLoading } = departmentsService.Query({
    endpoint: `/employees/${id}`,
    dependencies: ["employees", id],
    queryConfigs: {
      enabled: !!id,
    },
  });

  return {
    employee: data,
    isLoadingEmployee: isLoading
  }
}

export default useProfileService;