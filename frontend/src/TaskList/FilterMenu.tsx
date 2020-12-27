import { Filter, useFilter } from "../state/Filter";

const FILTER_NAMES = Object.values(Filter);

function FilterMenu() {
  const { filter, setFilter } = useFilter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value as Filter);
  };

  return (
    <div>
      Filter:
      {FILTER_NAMES.map((filterName) => {
        return (
          <>
            <input
              type="radio"
              name="filter"
              value={filterName}
              id={filterName}
              checked={filterName === filter}
              onChange={handleChange}
            />{" "}
            <label htmlFor={filterName as string}>{filterName}</label>
          </>
        );
      })}
    </div>
  );
}

export default FilterMenu;
