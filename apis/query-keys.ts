export const keys = (
  url: string,
  type: 'get' | 'post' | 'patch' | 'delete',
) => {
  return {
    main: () => [url, { type }] as const,
    lists: () => [...keys(url, type).main(), 'list'] as const, //for invalidate
    list: (filters: string) =>
      [...keys(url, type).lists(), { filters }] as const,
    details: () => [...keys(url, type).main(), 'detail'] as const, // invalidate
    detail: (id: string) => [...keys(url, type).details(), id] as const,
  };
};
