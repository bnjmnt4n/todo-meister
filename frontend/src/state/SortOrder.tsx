import { createContext, useContext, useMemo, useState } from "react";

enum SortOrder {
  CreatedAt = "Date created",
  UpdatedAt = "Date updated",
  DueDate = "Date due",
}

type SortOrderContextValue = {
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
};

const SortOrderContext = createContext<SortOrderContextValue>(
  ({} as any) as SortOrderContextValue
);

function useSortOrder() {
  const context = useContext(SortOrderContext);
  if (!context) {
    throw new Error(`useSortOrder must be used within a SortOrderProvider`);
  }
  return context;
}

function SortOrderProvider(props: { children?: React.ReactNode }) {
  const [sortOrder, setSortOrder] = useState(SortOrder.CreatedAt);
  const value = useMemo(() => ({ sortOrder, setSortOrder }), [sortOrder]);

  return <SortOrderContext.Provider value={value} {...props} />;
}

export { SortOrder, SortOrderProvider, useSortOrder };
