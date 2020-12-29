import Select from "react-select";

import useTags from "../hooks/useTags";
import { useTagFilter } from "../state/TagFilter";
import { Tag } from "../types";

const TAG_TO_OPTION = (tag: Tag) => ({ label: tag.name, value: tag.id });

function TagFilterMenu() {
  const { tags, setTags } = useTagFilter();
  const { data } = useTags();

  const options = data ? data.map(TAG_TO_OPTION) : [];
  const selected = tags.map(TAG_TO_OPTION);

  const handleChange = (newOptions?: Readonly<typeof options> | null) => {
    if (newOptions) {
      setTags(
        newOptions.map((option) => ({
          id: option.value,
          name: option.label,
        })) as Tag[]
      );
    } else {
      setTags([]);
    }
  };

  return (
    <div>
      Filter by tags:
      <Select
        isMulti={true}
        placeholder="Filter by tags"
        onChange={handleChange}
        value={selected}
        options={options}
      />
    </div>
  );
}

export default TagFilterMenu;
