function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (!v) {
    console.warn(errorMessage); // Warn instead of throwing an error
    return "" as T; // Provide a fallback value
  }
  return v;
}

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-18";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);


export const token = assertValue(
  process.env.NODE_ENV,
  "Missing environment variable:NEXT_PUBLIC_SANITY_AUTH_TOKEN"
);
