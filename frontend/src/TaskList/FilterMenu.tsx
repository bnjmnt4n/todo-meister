import { Filter, useFilter } from "../state/Filter";
import Select from "react-select";

const FILTER_OPTIONS = Object.values(Filter).map((filterName) => ({
  value: filterName,
  label: filterName,
}));

function FilterMenu() {
  const { filter, setFilter } = useFilter();

  const selectedIndex = FILTER_OPTIONS.findIndex(
    ({ value }) => value === filter
  );

  const handleChange = (option?: typeof FILTER_OPTIONS[number] | null) => {
    if (option?.value) {
      setFilter(option.value);
    }
  };

  return (
    <div>
      Filter:
      <Select
        value={FILTER_OPTIONS[selectedIndex]}
        options={FILTER_OPTIONS}
        onChange={handleChange}
      />
    </div>
  );
}

export default FilterMenu;
