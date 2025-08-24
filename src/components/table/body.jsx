import { useMantineTheme } from "@mantine/core";
const Body = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const BodyRow = ({ children, ...rest }) => {
  const theme = useMantineTheme();
  const neutral = theme.colors.neutral;
  const isDark = theme.colorScheme === "dark";

  return (
    <tr
      {...rest}
      style={{
        backgroundColor: isDark ? neutral[4] : neutral[0],
        borderBottom: `1px solid ${isDark ? neutral[2] : neutral[1]}`,
      }}
    >
      {children}
    </tr>
  );
};

const BodyRowItem = ({ children, className = "", ...rest }) => {
  const theme = useMantineTheme();
  const neutral = theme.colors.neutral;
  const isDark = theme.colorScheme === "dark";

  return (
    <td
      {...rest}
      scope="row"
      style={{
        color: isDark ? neutral[0] : neutral[3],
      }}
      className={`px-6 py-4 font-medium whitespace-nowrap ${className}`}
    >
      {children}
    </td>
  );
};


Body.Row = BodyRow;
Body.Row.Item = BodyRowItem;

export default Body;
