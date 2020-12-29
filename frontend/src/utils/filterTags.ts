import { intersection } from "lodash-es";

import { Tag, Task } from "../types";

function filterTags(tasks: Task[], tags: Tag[]) {
  if (!tags.length) {
    return tasks;
  }

  const tagIds = tags.map((tag) => tag.id);
  return tasks.filter((task) => {
    const taskTagIds = task.tags.map((tag) => tag.id);

    // Include the task if there is an overlap between the tag filter and the task's tags.
    return !!intersection(tagIds, taskTagIds).length;
  });
}

export default filterTags;
