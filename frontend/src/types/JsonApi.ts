/**
 * A simple wrapper type for JSON API responses.
 * TODO: see if there are any utility libraries which provide these types.
 */
export type JsonApi<T> = {
  data: Array<{ id: string; attributes: T }>;
};
