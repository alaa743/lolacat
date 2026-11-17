import type { z } from "zod";
import type { RepositoryResult } from "@/types";

export function safeReadStorage<T>(key: string, schema: z.ZodType<T>): RepositoryResult<T | null> {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      return { success: true, data: null };
    }
    const parsed: unknown = JSON.parse(raw);
    const validated = schema.safeParse(parsed);
    if (!validated.success) {
      return {
        success: false,
        error: `Invalid stored data for key "${key}"`,
      };
    }
    return { success: true, data: validated.data };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to read storage";
    return { success: false, error: message };
  }
}

export function safeWriteStorage<T>(key: string, value: T): RepositoryResult<T> {
  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return { success: true, data: value };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to write storage";
    return { success: false, error: message };
  }
}

export function safeRemoveStorage(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage removal errors in restricted environments
  }
}
