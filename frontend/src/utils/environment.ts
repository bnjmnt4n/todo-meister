export function get(name: string, defaultValue = "") {
  return process.env[`REACT_APP_${name}`] || defaultValue;
}
