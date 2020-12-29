import { createContext, useContext, useMemo, useState } from "react";

enum SortBy {
  CreatedAt = "Date created",
  UpdatedAt = "Date updated",
  DueDate = "Date due",
}

enum SortOrder {
  Ascending = "Ascending",
  Descending = "Descending",
}

type SortSettingsContextValue = {
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
};

const SortSettingsContext = createContext<SortSettingsContextValue>(
  ({} as any) as SortSettingsContextValue
);

function useSortSettings() {
  const context = useContext(SortSettingsContext);
  if (!context) {
    throw new Error(
      `useSortSettings must be used within a SortSettingsProvider`
    );
  }
  return context;
}

function SortSettingsProvider(props: { children?: React.ReactNode }) {
  const [sortOrder, setSortOrder] = useState(SortOrder.Ascending);
  const [sortBy, setSortBy] = useState(SortBy.CreatedAt);
  const value = useMemo(
    () => ({ sortBy, setSortBy, sortOrder, setSortOrder }),
    [sortBy, sortOrder]
  );

  return <SortSettingsContext.Provider value={value} {...props} />;
}

export { SortBy, SortOrder, SortSettingsProvider, useSortSettings };
