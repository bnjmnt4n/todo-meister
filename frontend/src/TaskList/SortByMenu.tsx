import Select from "react-select";

import { SortBy, useSortSettings } from "../state/SortSettings";

const SORT_BY_OPTIONS = Object.values(SortBy).map((sortByName) => ({
  value: sortByName,
  label: sortByName,
}));

function SortByMenu() {
  const { sortBy, setSortBy } = useSortSettings();

  const selectedIndex = SORT_BY_OPTIONS.findIndex(
    ({ value }) => value === sortBy
  );

  const handleChange = (option?: typeof SORT_BY_OPTIONS[number] | null) => {
    if (option?.value) {
      setSortBy(option.value);
    }
  };

  return (
    <div>
      Sort by:
      <Select
        value={SORT_BY_OPTIONS[selectedIndex]}
        options={SORT_BY_OPTIONS}
        onChange={handleChange}
      />
    </div>
  );
}

export default SortByMenu;
