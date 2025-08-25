import { useState } from "react";
import Cards from "../../../components/card";
import useRoleService from "./hooks/useRoleService";
import CustomTables from "../../../components/customTable";

const RolePage = () => {
  const { roles, rolesCount } = useRoleService();
  const [page, setPage] = useState(1);
  const columns = [
    {
      key: "name",
      label: "Name",
    },
  ]

  return (
    <Cards className="w-full h-screen">
      <CustomTables
        columns={columns}
        items={roles}
        count={rolesCount}
        page={page}
        onPageChange={setPage}
      />
    </Cards>
  )
}

export default RolePage;