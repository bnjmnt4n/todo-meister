import { createContext, useContext, useMemo, useState } from "react";

enum Filter {
  All = "All",
  Completed = "Completed",
  Uncompleted = "Uncompleted",
}

type FilterContextValue = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

const FilterContext = createContext<FilterContextValue>(
  ({} as any) as FilterContextValue
);

function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(`useFilter must be used within a FilterProvider`);
  }
  return context;
}

function FilterProvider(props: { children?: React.ReactNode }) {
  const [filter, setFilter] = useState(Filter.All);
  const value = useMemo(() => ({ filter, setFilter }), [filter]);

  return <FilterContext.Provider value={value} {...props} />;
}

export { Filter, FilterProvider, useFilter };
