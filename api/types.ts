export async function requestFetch<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  const response = await fetch(url, config);
  return await response.json();
}
