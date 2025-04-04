import { migrateToSupabase } from "../lib/supabase/migration";

// Run the migration
migrateToSupabase()
  .then((result) => {
    if (result.success) {
      console.log("Migration completed successfully!");
      process.exit(0);
    } else {
      console.error("Migration failed:", result.error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error("Unexpected error during migration:", error);
    process.exit(1);
  });
