import Select from "react-select";

import { SortOrder, useSortSettings } from "../state/SortSettings";

const SORT_ORDER_OPTIONS = Object.values(SortOrder).map((sortOrderName) => ({
  value: sortOrderName,
  label: sortOrderName,
}));

function SortOrderMenu() {
  const { sortOrder, setSortOrder } = useSortSettings();

  const selectedIndex = SORT_ORDER_OPTIONS.findIndex(
    ({ value }) => value === sortOrder
  );

  const handleChange = (option?: typeof SORT_ORDER_OPTIONS[number] | null) => {
    if (option?.value) {
      setSortOrder(option.value);
    }
  };

  return (
    <div>
      Sort order:
      <Select
        value={SORT_ORDER_OPTIONS[selectedIndex]}
        options={SORT_ORDER_OPTIONS}
        onChange={handleChange}
      />
    </div>
  );
}

export default SortOrderMenu;
