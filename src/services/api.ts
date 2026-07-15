export const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function mockApi<T>(data: T): Promise<T> {
  await delay(500);

  // Deep clone so components can't accidentally mutate the "database"
  return structuredClone(data);
}