import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://jhtdricfkcxiojmjllwp.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpodGRyaWNma2N4aW9qbWpsbHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMDAxOTQsImV4cCI6MjA5NDc3NjE5NH0.m6q4zqIF9fBngM9cMFNIKlfDfhPS5mOMa17pOPVjE5c";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);