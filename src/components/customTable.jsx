import { LIMIT } from "../common/constant";
import Paginations from "./pagination";
import Tables from "./table";

const CustomTables = ({ columns = [], items = [], page = 1, onPageChange, }) => {
  
  return (
    <>
      <Tables>
        <Tables.Head>
          <Tables.Head.Row className="text-center">
            {
              columns?.map(({key, label}, index) => {
                return <Tables.Head.Row.Item key={`${key}-${label}-${index}`}>{label}</Tables.Head.Row.Item>
              })
            }
          </Tables.Head.Row>
        </Tables.Head>
        <Tables.Body>
          {items?.map((row, rowIndex) => (
            <Tables.Body.Row className="text-center" key={row.id || rowIndex}>
              {columns?.map(({ key, render }, colIndex) => (
                <Tables.Body.Row.Item key={`${rowIndex}-${colIndex}`}>
                  {render ? render(row, rowIndex) : row[key] ?? "-"}
                </Tables.Body.Row.Item>
              ))}
            </Tables.Body.Row>
          ))}
        </Tables.Body>
      </Tables>

      <Paginations
        active={page}
        onChange={onPageChange}
        pageSize={LIMIT}
        total={items.length}
      />
    </>
  )
}

export default CustomTables;