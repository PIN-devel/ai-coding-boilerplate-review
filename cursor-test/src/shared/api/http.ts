export async function http<T>(input: string | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(`요청이 실패했습니다 (${response.status})`);
  }

  return (await response.json()) as T;
}
