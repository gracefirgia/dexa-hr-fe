import { Pagination } from "@mantine/core"
import { LIMIT } from "../common/constant"

const Paginations = ({total = 0, active = 1, pageSize = LIMIT, onChange }) => {
  const totalPages = Math.ceil(total / pageSize)
  return (
    <Pagination
      value={active}
      className="mt-2"
      total={totalPages}
      onChange={onChange}
    />
  )
}

export default Paginations;