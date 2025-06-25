export function paginate<T>(data: T[], page: number, perPage: number): T[] {
  const start = (page - 1) * perPage;
  return data.slice(start, start + perPage);
}
