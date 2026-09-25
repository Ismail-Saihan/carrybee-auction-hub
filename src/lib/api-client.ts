import { ApiErrorEnvelope } from '@/types/api';

export class ApiClientError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly error: string,
    public readonly message: string,
    public readonly requestId?: string,
    public readonly path?: string,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

interface RequestOptions extends RequestInit {
  token?: string;
  timeoutMs?: number;
}

const DEFAULT_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { token, timeoutMs = 10000, headers, ...rest } = options;

  const url = endpoint.startsWith('http')
    ? endpoint
    : `${DEFAULT_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  const requestHeaders = new Headers(headers);
  if (!requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }
  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...rest,
      headers: requestHeaders,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData: ApiErrorEnvelope | null = null;
      try {
        errorData = await response.json();
      } catch {
        // Response was not JSON
      }

      const statusCode = response.status;
      const message = Array.isArray(errorData?.message)
        ? errorData.message.join(', ')
        : errorData?.message || response.statusText;
      const error = errorData?.error || 'HttpError';
      const requestId = errorData?.requestId || response.headers.get('x-request-id') || undefined;

      throw new ApiClientError(
        statusCode,
        error,
        message,
        requestId,
        errorData?.path,
      );
    }

    if (response.status === 204) {
      return {} as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof ApiClientError) {
      throw error;
    }
    if ((error as Error).name === 'AbortError') {
      throw new ApiClientError(408, 'RequestTimeout', 'Request timed out.');
    }
    throw new ApiClientError(
      0,
      'NetworkError',
      (error as Error).message || 'Network request failed.',
    );
  }
}
