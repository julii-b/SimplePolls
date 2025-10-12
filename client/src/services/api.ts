import config from '../config/config';

/**
 * Wraper for fetch() function
 * - Adds Content-Type header
 * - Sends user's Bearer token
 * - Stores new user tokens from the result in local storage
 * 
 * @template T - Exprected response type
 * @param { string } endpoint - The API endpoint, e.g. '/example'
 * @param { RequestInit } init - Optional fetch configuration 
 * @returns { Promise<T> } The parsed JSON response
 */
export async function customFetch<T>(endpoint: string, init:RequestInit = {}): Promise<T> {
  const userToken: string | null = localStorage.getItem('user_token');
  init.headers = {
    'Content-Type': 'application/json',
    ...(userToken && { Authorization: `Bearer ${userToken}` }),
    ...init.headers,
  };

  const res: Response = await fetch(config.apiUrl+endpoint, init);

  const newToken: string | null = res.headers.get('X-New-Token');
  if (newToken) localStorage.setItem('user_token', newToken);
  

  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
}

/**
 * Performs an http GET request to the backend API
 * 
 * @template T - Expected response type
 * @param { string } endpoint - The API endpoint, e.g. '/example'
 * @returns { Promise<T> } The parsed JSON response
 */
export async function get<T>(endpoint: string): Promise<T> {
  return customFetch<T>(endpoint);
}

/**
 * Performs an http POST request to the backend API
 * 
 * @template T - Expected response type
 * @param { string } endpoint - The API endpoint, e.g. '/example'
 * @param { any } body - The http body
 * @returns { Promise<T> } The parsed JSON response
 */
export async function post<T>(endpoint: string, body: any): Promise<T> {
  const init = {
    method: 'POST',
    body: JSON.stringify(body),
  }
  return customFetch<T>(endpoint, init);
}

/**
 * Performs an http PATCH request to the backend API
 * 
 * @template T - Expected response type
 * @param { string } endpoint - The API endpoint, e.g. '/example'
 * @param { any } body - The http body
 * @returns { Promise<T> } The parsed JSON response
 */
export async function patch<T>(endpoint: string, body: any): Promise<T> {
  const init = {
    method: 'PATCH',
    body: JSON.stringify(body),
  }
  return customFetch<T>(endpoint, init);
}

/**
 * Performs an http DELETE request to the backend API
 * 
 * @template T - Expected response type
 * @param { string } endpoint - The API endpoint, e.g. '/example'
 * @returns { Promise<T> } The parsed JSON response
 */
export async function del<T>(endpoint: string): Promise<T> {
  const init = {
    method: 'DELETE',
  }
  return customFetch<T>(endpoint, init);
}