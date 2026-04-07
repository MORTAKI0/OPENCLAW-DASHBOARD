import "server-only";

type AppEnv = "development" | "preview" | "production" | string;

type RequiredEnvKey =
  | "APP_ENV"
  | "NEXTAUTH_SECRET"
  | "ADMIN_USERNAME"
  | "ADMIN_PASSWORD"
  | "OPENCLAW_PUBLIC_URL"
  | "OPENCLAW_INTERNAL_URL";

function readRequiredEnv(key: RequiredEnvKey): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export function getAppEnv(): AppEnv {
  return readRequiredEnv("APP_ENV");
}

export function getAdminCredentials(): {
  username: string;
  password: string;
} {
  return {
    username: readRequiredEnv("ADMIN_USERNAME"),
    password: readRequiredEnv("ADMIN_PASSWORD"),
  };
}

export function getOpenClawUrls(): {
  publicUrl: string;
  internalUrl: string;
} {
  return {
    publicUrl: readRequiredEnv("OPENCLAW_PUBLIC_URL"),
    internalUrl: readRequiredEnv("OPENCLAW_INTERNAL_URL"),
  };
}

export function verifyAdminCredentials(
  username: string,
  password: string,
): boolean {
  const admin = getAdminCredentials();

  return username === admin.username && password === admin.password;
}
