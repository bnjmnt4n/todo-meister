import { createContext, useContext, useMemo, useState } from "react";

import { Tag } from "../types";

type TagFilterContextValue = {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
};

const TagFilterContext = createContext<TagFilterContextValue>(
  ({} as any) as TagFilterContextValue
);

function useTagFilter() {
  const context = useContext(TagFilterContext);
  if (!context) {
    throw new Error(`useTagFilter must be used within a FilterProvider`);
  }
  return context;
}

function TagFilterProvider(props: { children?: React.ReactNode }) {
  const [tags, setTags] = useState<Tag[]>([]);
  const value = useMemo(() => ({ tags, setTags }), [tags]);

  return <TagFilterContext.Provider value={value} {...props} />;
}

export { TagFilterProvider, useTagFilter };
