import Body from "./body";
import Head from "./head";
import Spinners from "../spinner";

const Tables = ({ children, ...rest }) => {
  return (
    <div {...rest} className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {children}
      </table>
    </div>
  )
}

const LoadingRow = () => {
  return (
    <tbody>
    <tr
    >
      <td>
        <Spinners />
      </td>
    </tr>
    </tbody>
  );
}

Tables.Head = Head;
Tables.Body = Body;

export default Tables;