import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://eikrwwhbliuyrvikcwev.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpa3J3d2hibGl1eXJ2aWtjd2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwOTM4MjUsImV4cCI6MjAzNzY2OTgyNX0._R1vzUsbXCBmzz_mAyFbQlZZTZn-kJF-Tnf3uDhROmY"

export const supabase = createClient(supabaseUrl, supabaseKey);