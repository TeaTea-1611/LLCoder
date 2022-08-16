interface TableProps {
  children: React.ReactNode;
  thead?: string[];
  className?: string;
}

function Table({ children, thead, className }: TableProps) {
  return (
    <table
      className={`table-auto min-w-full leading-normal overflow-hidden shadow${
        className ? ` ${className}` : ""
      }`}
    >
      {thead && (
        <thead>
          <tr className="text-left">
            {thead.map((item) => (
              <th
                key={item}
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:bg-dark-color-2 dark:border-dark-border-color"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
      )}
      {children}
    </table>
  );
}

export const Td = ({ children, className }: TableProps) => (
  <td
    className={`px-5 py-2 border-b border-gray-200 bg-white dark:bg-dark-color-3 dark:border-dark-border-color text-sm${
      className ? ` ${className}` : ""
    }`}
  >
    {children}
  </td>
);

export default Table;
