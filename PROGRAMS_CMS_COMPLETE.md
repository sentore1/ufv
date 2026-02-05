# Programs Section - CMS Migration Complete

## What Was Added

The **ProgramAccordion** section is now fully CMS-controlled with multilingual support and image management.

## Database Migration

**File:** `add_programs_section.sql`

Run this SQL file in your Supabase database:

```bash
# Execute in Supabase SQL Editor
```

## Sections Added (7 entries)

1. **programs_header** - Section title and subtitle
2. **program_social_protection** - Social Protection Programs
3. **program_emergency_relief** - Emergency Relief Programs
4. **program_education** - Education Programs
5. **program_faith_based** - Faith-Based Programs
6. **program_women_youth** - Women & Youth Empowerment Programs
7. **program_family_protection** - Family Protection & Divorce Prevention Programs

## Features

### ✅ Full CRUD Operations
- **Add** new programs
- **Edit** existing programs (title, description, image)
- **Delete** custom programs
- **Image upload** for each program

### ✅ Multilingual Support
All content in 4 languages:
- English (en)
- French (fr)
- Kinyarwanda (rw)
- Arabic (ar)

### ✅ Image Management
- Upload images via file input
- Paste image URLs
- Preview images before saving
- Each program has its own image

## Admin Panel

**URL:** `/admin/content` → **Programs** tab

### How to Use:

1. **Edit Existing Programs:**
   - Select the Programs tab
   - Edit title, description, and image for each program
   - Click "Save Changes"

2. **Add New Program:**
   - Click "+ Add New Program"
   - Fill in title and description in all languages
   - Upload or paste image URL
   - Click "Save Changes"

3. **Delete Custom Program:**
   - Only custom programs can be deleted (not the default 6)
   - Click "Delete" button
   - Confirm deletion

## Component Updated

**File:** `app/components/ProgramAccordion.tsx`

- Now fetches programs from database
- Displays programs dynamically
- Auto-detects icons based on program key
- Supports unlimited programs

## Default Programs Included

1. Social Protection Programs
2. Emergency Relief Programs
3. Education Programs
4. Faith-Based Programs
5. Women & Youth Empowerment Programs
6. Family Protection & Divorce Prevention Programs

All with default images and multilingual content.
