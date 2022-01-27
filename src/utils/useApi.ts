import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useApi<Data>(resource: 'items' | 'categories') {
  return useSWR<{ data: Data }>(
    `https://fetch-me.vercel.app/api/shopping/${resource}`,
    fetcher
  );
}
