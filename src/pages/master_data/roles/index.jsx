import Cards from "../../../components/card";
import Tables from "../../../components/table";
import useRoleService from "./hooks/useRoleService";

const RolePage = () => {
  const { roles } = useRoleService();

  return (
    <Cards className="w-full h-screen">
      <Tables>
        <Tables.Head>
          <Tables.Head.Row className="text-center">
            <Tables.Head.Row.Item width={5}>No</Tables.Head.Row.Item>
            <Tables.Head.Row.Item width="30%">Name</Tables.Head.Row.Item>
          </Tables.Head.Row>
        </Tables.Head>
        <Tables.Body>
          {
            roles?.map((role, index) => (
              <Tables.Body.Row className="text-center" key={role.id}>
                <Tables.Body.Row.Item className="text-center" width={10}>{index + 1}</Tables.Body.Row.Item>
                <Tables.Body.Row.Item>{role.name}</Tables.Body.Row.Item>
              </Tables.Body.Row>
            ))
          }
        </Tables.Body>
      </Tables>
    </Cards>
  )
}

export default RolePage;