# LEED GA History, Time and Domain Update

Upload all files to matching paths in the GitHub repository and overwrite existing files.

Features:
- Select one or multiple history attempts with checkboxes and delete only selected attempts.
- Deleted history list is saved immediately to Supabase.
- Display elapsed exam time in History. Existing attempts use their saved `elapsed` value when available.
- Domain Breakdown and domain filter order: Overview, IP, LT, SS, WE, EA, MR, EQ, PR.
- Includes the previous account-isolation, logout cleanup, submit-progress deletion, and cloud-sync fixes.

No `data` files and no SQL changes are included.
