# Cloud Sync Fix v2

Upload these files to the repository root and overwrite existing files.

Changed files:
- `assets/js/app.js`
- `assets/js/cloud-sync.js`
- `index.html`
- `service-worker.js`

Fixes:
- Submitted attempts are kept in history and their progress row is deleted locally and from Supabase.
- Only unsubmitted attempts remain in the resume list.
- Logout clears LEED local data and reloads a blank signed-out view.
- Login clears old local data and downloads only the current user data from Supabase.
- No history merge across accounts.
- Delete progress removes the matching cloud row.
- Manual Sync reloads the current account from cloud.

Do not overwrite the `data` folder with this patch.
