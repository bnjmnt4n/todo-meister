import { SortOrder, useSortOrder } from "../state/SortOrder";

const SORT_ORDER_NAMES = Object.values(SortOrder);

function SortOrderMenu() {
  const { sortOrder, setSortOrder } = useSortOrder();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOrder(event.target.value as SortOrder);
  };

  return (
    <div>
      Sort by:
      {SORT_ORDER_NAMES.map((sortOrderName) => {
        return (
          <>
            <input
              type="radio"
              name="sortOrder"
              value={sortOrderName}
              id={sortOrderName}
              checked={sortOrderName === sortOrder}
              onChange={handleChange}
            />{" "}
            <label htmlFor={sortOrderName as string}>{sortOrderName}</label>
          </>
        );
      })}
    </div>
  );
}

export default SortOrderMenu;
