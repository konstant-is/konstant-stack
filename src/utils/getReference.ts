export function getReference<T>(ref: T | string | null | undefined) {
  if (typeof ref === "string") {
    return null;
  }

  return ref as T;
}
