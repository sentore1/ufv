# Workshop Registration Form Updates

## Overview
This document outlines the changes made to the workshop registration system to simplify the form and add PDF export functionality with signature capability.

## Changes Made

### 1. Removed Fields from Registration Form

The following fields have been removed from the workshop registration form:

#### Section D - Travel & Accommodation (Previously)
- ❌ **Arrival Date** - Removed
- ❌ **Departure Date** - Removed
- ❌ **Accommodation Required** - Removed
- ❌ **Airport Pickup Required** - Removed
- ✅ **Country of Departure** - Kept

#### Section F - Dietary & Special Needs (Previously)
- ✅ **Dietary Requirements** - Kept
- ❌ **Allergies/Conditions** - Removed
- ❌ **Special Needs** - Removed

#### Section G - Expectations (Previously)
- ❌ **Expectations** (What to gain from workshop) - Removed
- ✅ **Capacity Building Areas** - Kept

#### Section H - Declaration (Previously)
- ❌ **Signature Name** - Removed
- ❌ **Signature Date** - Removed

### 2. New Features Added

#### PDF Export with Signature Space
- Each registration can now be exported as a printable PDF
- PDF includes a **blank signature section** at the bottom
- Signature section contains:
  - Declaration text
  - Empty space for physical signature
  - Date line
  - Signature line
- Print-friendly layout with proper page breaks
- Includes organization logos (UFV, IsDB, SIF)

#### Excel Export (Enhanced)
- CSV export continues to work
- Updated to reflect new simplified field structure
- Renamed button from "Export CSV" to "Export to Excel" for clarity

### 3. Updated Admin Dashboard

#### Stats Section
Removed:
- Accommodation Required count
- Airport Pickup Required count

Updated to show:
- Total Registrations
- Interpretation Required count
- Registered This Month count

#### Registration List View
- Updated tags to show only:
  - 🗣️ Interpretation (if required)
  - 🍽️ Dietary Requirements (if specified)

#### Registration Detail View
Simplified sections:
- Personal Information (unchanged)
- Organization Details (unchanged)
- Contact Information (unchanged)
- **Travel Information** (simplified - only Country of Departure)
- Language & Participation (unchanged)
- **Dietary Requirements** (simplified - only dietary preference)
- **Capacity Building** (only areas of interest)

Added new action button:
- **Export PDF** button (with document icon)

### 4. Database Migration

A SQL migration file has been created: `update_workshop_registrations_table.sql`

This file will:
- Remove the following columns:
  - `arrival_date`
  - `departure_date`
  - `accommodation_required`
  - `airport_pickup_required`
  - `allergies_conditions`
  - `special_needs`
  - `expectations`
  - `signature_name`
  - `signature_date`

**⚠️ IMPORTANT:** Before running this migration:
1. Backup your database
2. Export any data from these fields if needed for historical records
3. Run the migration in your Supabase SQL editor

## Files Modified

### Frontend Files
1. **`app/[locale]/workshop/page.tsx`**
   - Removed unnecessary form fields
   - Updated form state management
   - Simplified form sections

2. **`app/admin/workshop-registrations/page.tsx`**
   - Updated TypeScript interface
   - Added `generatePDF()` function
   - Updated CSV export columns
   - Removed deleted fields from display
   - Updated stats dashboard
   - Added PDF export button

### Database Files
3. **`update_workshop_registrations_table.sql`** (NEW)
   - SQL migration to remove columns

4. **`WORKSHOP_REGISTRATION_UPDATES.md`** (NEW - this file)
   - Documentation of all changes

## How to Use PDF Export

### For Administrators:
1. Log in to the admin dashboard
2. Go to Workshop Registrations
3. Click on a registration to view details
4. Click the **"Export PDF"** button
5. A new window will open with the registration form
6. Click **"Print to PDF"** at the top or bottom
7. Choose "Save as PDF" in the print dialog
8. The PDF will include a blank signature section at the bottom

### For Printing:
- The PDF is optimized for A4 paper
- Print buttons are hidden when actually printing
- Professional layout with proper spacing
- Signature box has adequate space for handwritten signature

## How to Deploy

### Step 1: Database Migration
```sql
-- Run this in Supabase SQL Editor
-- Located in: update_workshop_registrations_table.sql
```

### Step 2: Deploy Frontend
```bash
# The code changes are already made, just deploy
npm run build
# Deploy to your hosting platform
```

### Step 3: Test
1. Test form submission (existing registrations will still work)
2. Test admin dashboard view
3. Test CSV export
4. Test PDF export with signature space

## Benefits of Changes

### For Registrants:
- ✅ Shorter, simpler form
- ✅ Faster registration process
- ✅ Focus on essential information only

### For Administrators:
- ✅ Cleaner dashboard
- ✅ PDF export with signature capability
- ✅ Print-ready registration forms
- ✅ Easier to review essential information
- ✅ Both Excel and PDF export options

### For Workshop Planning:
- ✅ Focus on core requirements
- ✅ Collect only actionable information
- ✅ Signature-ready forms for physical documentation
- ✅ Professional appearance

## Technical Details

### PDF Generation Method
- Uses browser's native `window.print()` API
- No external dependencies required
- Client-side generation (no server needed)
- Print-optimized CSS for clean output
- Works in all modern browsers
- **Logos use absolute URLs** for reliable printing
- **Print color adjustment** enabled for logo visibility

### Logo Implementation
- Three organization logos at top (UFV, IsDB, SIF)
- Absolute URLs ensure loading in popup window
- Print-friendly CSS with color adjustment
- **Important:** Users must enable "Background graphics" in print settings
- See `LOGO_PRINTING_GUIDE.md` for detailed instructions

### Signature Section Design
- Clear declaration text
- Adequate white space for signature
- Date and signature lines
- Professional border and formatting
- Page-break protection

## Maintenance Notes

### If you need to add fields back:
1. Update the form state in `app/[locale]/workshop/page.tsx`
2. Add form fields in the appropriate section
3. Update the TypeScript interface in admin page
4. Update the PDF template in `generatePDF()` function
5. Update the CSV export headers
6. Update the database columns

### Translation Updates Required:
The form still uses translation keys. Existing translations will work, but you may want to:
- Update section titles if they reference removed fields
- Verify all labels are appropriate

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify database migration was successful
3. Ensure all translations exist
4. Test in different browsers for PDF export
5. Verify pop-up blockers aren't blocking PDF window

## Future Enhancements (Optional)

Consider adding:
- [ ] Batch PDF export (export multiple registrations at once)
- [ ] Email PDF directly to registrants
- [ ] Digital signature capture
- [ ] PDF customization options (logo, colors)
- [ ] QR code on PDF for verification
- [ ] Auto-fill date in signature section

---

**Last Updated:** 2026-09-21  
**Version:** 2.0  
**Author:** Workshop Registration System Update
