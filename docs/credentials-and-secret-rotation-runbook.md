# Credentials and Secret Rotation Runbook

## Purpose

This runbook defines the operational process for rotating the two MVP authentication secrets used by OpenclawUI v1.1:

- `ADMIN_PASSWORD`
- `NEXTAUTH_SECRET`

These values protect access to the dashboard and its session integrity. Rotation must be handled as an explicit maintenance task, not as an informal manual change.

## Secrets Covered

### `ADMIN_PASSWORD`

- Used by the credentials-based admin login flow.
- Controls whether an operator can sign in to the dashboard.

### `NEXTAUTH_SECRET`

- Used by NextAuth to sign and validate authentication tokens.
- Protects session integrity for authenticated users.

## Rotation Triggers

Rotate one or both secrets when any of the following happens:

- Scheduled manual hygiene rotation.
- Suspected credential or secret exposure.
- Team membership or admin access changes.
- Environment migration or deployment platform changes.
- Incident response after any auth-related concern.
- Any case where the current secret storage or handling is no longer trusted.

## Ownership and Responsibility

Rotation may only be performed by an operator or maintainer who:

- is authorized to manage the target deployment environment
- has access to the approved environment variable or secret management location
- can safely restart or redeploy the application if required by the platform
- can validate the login flow after the change

The operator is responsible for confirming the target environment before making changes. Do not rotate production secrets from memory or by assumption.

## Pre-Rotation Checklist

Complete this checklist before changing either value:

1. Confirm the target environment: `development`, `preview`, or `production`.
2. Confirm where that environment stores secrets or environment variables.
3. Confirm whether the platform requires a redeploy or restart for env var changes to take effect.
4. Choose a maintenance window if the environment is shared or user impact matters.
5. Generate the new secret value before making any changes.
6. Store the new value only in the approved secret or env management location.
7. Ensure you still have a secure way to recover the previous known-good value if rollback becomes necessary.
8. Understand the user impact:
   - rotating `ADMIN_PASSWORD` changes the login credential immediately after deployment or restart
   - rotating `NEXTAUTH_SECRET` invalidates existing sessions and users will need to sign in again

## Rotation Procedure for `ADMIN_PASSWORD`

1. Generate a new strong password using an approved password generator.
2. Record the new password only in the approved secret or env management system.
3. Update `ADMIN_PASSWORD` in the correct deployment environment.
4. Apply the change using the platform’s normal method:
   - redeploy if the platform applies env vars at build or deploy time
   - restart if the platform reads env vars on process start
5. Open the app login page after the deployment or restart completes.
6. Sign in with the existing admin username and the new `ADMIN_PASSWORD`.
7. Confirm that login succeeds and the protected dashboard loads.
8. If the environment allows safe negative testing, confirm the prior password no longer works.
9. Remove any temporary local notes used during the rotation.

## Rotation Procedure for `NEXTAUTH_SECRET`

1. Generate a new strong secret value using an approved secret generator.
2. Store the new value only in the approved secret or env management system.
3. Update `NEXTAUTH_SECRET` in the correct deployment environment.
4. Apply the change using the platform’s normal method:
   - redeploy if required
   - restart if required
5. Expect active authenticated sessions to be invalidated after the new secret is active.
6. Open the app and confirm that any existing session is treated as expired or requires re-authentication.
7. Sign in again through the normal login flow.
8. Confirm that the new session is created successfully and the protected dashboard loads.

## Expected Impact of Rotating `NEXTAUTH_SECRET`

Rotating `NEXTAUTH_SECRET` invalidates existing auth sessions because previously issued tokens can no longer be verified with the new secret.

Expected operator-facing impact:

- logged-in users may be signed out
- existing sessions may redirect to the login page
- users must sign in again after rotation

This is expected behavior, not an incident, unless users cannot sign in again with valid credentials.

## Post-Rotation Validation Checklist

After each rotation, verify all of the following:

1. The application loads without an obvious deployment failure.
2. The login page loads successfully.
3. Login succeeds with the updated credentials.
4. The protected dashboard route loads after login.
5. Sign-out still works.
6. There is no obvious redirect loop, broken session behavior, or repeated auth failure.
7. If possible on the current platform, confirm the correct environment variables were applied to the intended environment.
8. Review logs carefully for auth-related errors without exposing secret values in copied output.

## Rollback and Recovery

If login breaks after rotation, check the following before rolling back:

1. Confirm the correct environment was updated.
2. Confirm the env var names are exactly correct:
   - `ADMIN_PASSWORD`
   - `NEXTAUTH_SECRET`
3. Confirm the new values were saved completely and without truncation.
4. Confirm the redeploy or restart actually completed.
5. Confirm the app instance now running is the one associated with the updated environment.
6. Re-test the login flow after verifying the deployment state.

If the issue remains unresolved:

1. Restore the prior known-good value only if it is still available through approved secure storage.
2. Redeploy or restart again as required by the platform.
3. Re-test the login flow.
4. If rollback restores access, treat the failed rotation as an operational issue to investigate before trying again.

## Notes and Cautions

- Never commit secrets into the repository.
- Never share or paste secrets in Linear issues, issue comments, pull requests, chat, screenshots, or documentation.
- Never paste raw secret values into logs or troubleshooting notes.
- Store new values only in approved secret or environment management locations.
- Treat screenshots, terminal history, and copied deployment output as potentially sensitive if credentials or secret values may be exposed.
- Do not rotate secrets in the wrong environment by accident. Always verify the target first.
