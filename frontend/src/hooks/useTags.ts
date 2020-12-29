import { useQuery } from "react-query";

import { Tag } from "../types";
import getApiLocation from "../utils/getApiLocation";

function useTags() {
  return useQuery<Tag[]>("tags", () =>
    fetch(getApiLocation("/tags")).then((res) => res.json())
  );
}

export default useTags;
