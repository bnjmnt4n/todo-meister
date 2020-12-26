import { get as getEnvironmentVariable } from "./environment";

const DEFAULT_BACKEND_API = "http://localhost:8000";

function getApiLocation(url: string) {
  const BACKEND_API = getEnvironmentVariable(
    "BACKEND_API",
    DEFAULT_BACKEND_API
  );

  return `${BACKEND_API}/${url}`;
}

export default getApiLocation;
