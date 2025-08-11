// Utility to check if a value is a non-empty string
export function hasStringValue(val: unknown): val is string {
  return val != null && val !== '';
}
