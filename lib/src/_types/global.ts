export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject;
export type JSONObject = { [member: string]: JSONValue };
