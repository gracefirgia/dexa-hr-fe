const Head = ({ children, ...rest }) => {
  return <thead {...rest}>{children}</thead>;
};

const HeadRow = ({ children, className = "", ...rest }) => {
  return <tr {...rest} className={`bg-red-50 ${className}`}>{children}</tr>;
};

const HeadRowItem = ({ children, className = "", ...rest }) => {
  return (
    <th scope="col" className={`px-6 py-3 text-gray-600 ${className}`} {...rest}>
      {children}
    </th>
  );
};

Head.Row = HeadRow;
Head.Row.Item = HeadRowItem;

export default Head;
