// src/api/client.ts
import axios from "axios";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL =
  Platform.OS === "web"
    ? "https://corsproxy.io/?https://httpbin.org"
    : process.env.EXPO_PUBLIC_API_URL ?? "https://httpbin.org";

const AUTH_TOKEN_KEY = "auth_token";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

function requestId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  }
  return SecureStore.getItemAsync(key);
}

async function setItem(key: string, value: string): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
    return;
  }
  return SecureStore.setItemAsync(key, value);
}

async function deleteItem(key: string): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.removeItem(key);
    return;
  }
  return SecureStore.deleteItemAsync(key);
}

apiClient.interceptors.request.use(async (config) => {
  config.headers["X-Request-ID"] = requestId();

  const token = await getItem(AUTH_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function setAuthToken(token: string) {
  await setItem(AUTH_TOKEN_KEY, token);
}

export async function getAuthToken() {
  return getItem(AUTH_TOKEN_KEY);
}

export async function removeAuthToken() {
  await deleteItem(AUTH_TOKEN_KEY);
}
