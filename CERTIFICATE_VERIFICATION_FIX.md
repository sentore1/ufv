# Certificate Verification Fix Guide

## Issue
Certificate verification showing "Certificate not found or invalid" when scanning QR code.

## Root Cause
The `certificate_number` field might not exist in the database yet, or the certificate wasn't saved properly.

## Steps to Fix

### 1. Run SQL Migration (IMPORTANT!)
Make sure you've run the certificate system SQL script:

```sql
-- Run this in Supabase SQL Editor
-- File: add_certificate_system.sql
```

This creates:
- `certificate_number` column
- `certificate_generated_at` column
- `attended` column
- `generate_certificate_number()` function

### 2. Verify Database Schema
Check if the columns exist:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'workshop_registrations' 
AND column_name IN ('certificate_number', 'certificate_generated_at', 'attended');
```

Expected result: Should show 3 rows with these columns.

### 3. Test Certificate Generation
1. Go to `/admin/workshop-registrations`
2. Select a participant
3. Click "Generate Certificate"
4. Check browser console for any errors
5. Verify the certificate number appears in the UI

### 4. Check if Certificate Number is Saved
After generating a certificate, run this query:

```sql
SELECT id, full_name, certificate_number, certificate_generated_at 
FROM workshop_registrations 
WHERE certificate_number IS NOT NULL;
```

If no results, the certificate number isn't being saved.

### 5. Verify RPC Function
Check if the function exists:

```sql
SELECT generate_certificate_number();
```

Should return something like: `UFV-2026-0001`

### 6. Test Verification Manually
After generating a certificate with number `UFV-2026-0001`, visit:
```
http://localhost:3000/verify-certificate?code=UFV-2026-0001
```

Check browser console for detailed error messages.

## Common Issues

### Issue 1: Column doesn't exist
**Error:** `column "certificate_number" does not exist`

**Fix:** Run `add_certificate_system.sql` migration

### Issue 2: Function doesn't exist
**Error:** `function generate_certificate_number() does not exist`

**Fix:** 
```sql
CREATE OR REPLACE FUNCTION generate_certificate_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
  year_part TEXT;
  sequence_num INTEGER;
BEGIN
  year_part := TO_CHAR(NOW(), 'YYYY');
  
  SELECT COUNT(*) + 1 INTO sequence_num
  FROM workshop_registrations
  WHERE certificate_number LIKE 'UFV-' || year_part || '-%';
  
  new_number := 'UFV-' || year_part || '-' || LPAD(sequence_num::TEXT, 4, '0');
  
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;
```

### Issue 3: Permission denied
**Error:** `permission denied for table workshop_registrations`

**Fix:** Check RLS policies - the verification page uses public access

### Issue 4: Certificate saved but verification fails
**Fix:** Check the exact certificate number in database matches QR code:
```sql
SELECT certificate_number FROM workshop_registrations LIMIT 5;
```

Compare with what the QR code contains.

## Testing Checklist

- [ ] SQL migration `add_certificate_system.sql` is run
- [ ] Columns exist: `certificate_number`, `certificate_generated_at`, `attended`
- [ ] Function `generate_certificate_number()` works
- [ ] Generate a test certificate
- [ ] Certificate number appears in admin UI
- [ ] Certificate number saved in database
- [ ] QR code scans to correct URL
- [ ] Verification page loads without errors
- [ ] Certificate details display correctly

## Updated Features

### QR Code Changes
- **Size:** Increased from 200px to 280px
- **Position:** Moved 500px from right edge (was 400px)
- **Color:** Green (#518c71)

### Director Signature Line
- **Position:** 100px above director name
- **Width:** 500px
- **Color:** Black (#000000)

### Verification Page
- Better error handling with console logging
- Uses `.maybeSingle()` instead of `.single()` to avoid errors

## Need More Help?

1. Check browser console for errors
2. Check Supabase logs for database errors
3. Verify RLS policies allow public read on `workshop_registrations`
4. Make sure you're using the same database in dev and production
