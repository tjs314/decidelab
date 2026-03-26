const SUPABASE_URL = 'https://gjzxxryjoxibndbcrjwu.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdqenh4cnlqb3hpYm5kYmNyand1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMTk0MjMsImV4cCI6MjA4OTY5NTQyM30.lJNrWzFezn5u3R9QdUOAG2fIkg7XjrOyFRwcUsfz44I';

export async function submitSurvey(suggestion: string, resultType: string | null) {
  return fetch(SUPABASE_URL + '/rest/v1/survey_suggestions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON,
      'Authorization': 'Bearer ' + SUPABASE_ANON,
    },
    body: JSON.stringify({ suggestion, result_type: resultType }),
  });
}
