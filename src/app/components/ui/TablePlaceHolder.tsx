export const TablePlaceHolder = () => {
  const columns = [
    "Tracking ID",
    "Product Name",
    "Customer",
    "Date",
    "Amount",
    "Payment Mode",
    "Status",
    "Actions",
  ];

  return (
    <>
      {Array.from({ length: 10 }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((_, colIndex) => (
            <td
              key={colIndex}
              className='px-4 py-2'
            >
              <div className='h-4 w-full mt-4'>
                <div className='h-8 w-full bg-neutral-200 animate-pulse rounded-md dark:bg-neutral-700'></div>
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
