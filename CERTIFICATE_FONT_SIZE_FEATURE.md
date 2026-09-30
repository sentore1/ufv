# Certificate Font Size Feature

## Overview
Added the ability to control font size for participant names on certificates, both individually and in bulk.

## Features Added

### 1. Individual Font Size Control
- Edit individual registration's font size (120px - 280px range)
- Slider control with real-time preview
- Saves font size preference per registration

### 2. Bulk Font Size Update
- Change font size for all certificates at once
- Accessible via "Change Font (All)" button
- Includes live preview and confirmation

### 3. Font Size Range
- **Minimum:** 120px (Small)
- **Default:** 200px (Medium)
- **Maximum:** 280px (Large)
- **Step:** 10px increments

## Database Changes

### New Column Added
Run this SQL migration in your Supabase database:

```sql
-- Add certificate_font_size column to workshop_registrations table
ALTER TABLE workshop_registrations
ADD COLUMN IF NOT EXISTS certificate_font_size INTEGER DEFAULT 200;

-- Add comment to the column
COMMENT ON COLUMN workshop_registrations.certificate_font_size IS 'Font size (in pixels) for participant name on certificate';
```

**File:** `add_certificate_font_size_column.sql`

## Files Modified

### 1. `/app/admin/workshop-registrations/page.tsx`
- Added `certificate_font_size` to `WorkshopRegistration` interface
- Added `fontSize` to `CertificateData` interface
- Added `selectedFontSize` state (individual editing)
- Added `bulkFontSize` state (bulk updating)
- Updated `handleSaveNameAndFont()` to save font size
- Updated `handleBulkFontUpdate()` to update font size for all
- Added font size slider in edit panel
- Added font size slider in bulk update modal
- Updated previews to reflect selected font size
- Updated certificate generation to pass font size

### 2. `/app/components/CertificateRenderer.tsx`
- Added `fontSize` to `CertificateData` interface
- Updated name rendering to use custom font size
- Default to 200px if no font size specified

## User Interface

### Individual Edit Panel
**Font Size Controls:**
- Slider control (120px - 280px)
- Real-time value display
- Labels for Small/Medium/Large
- Live preview showing scaled representation
- Saves along with name and font changes

### Bulk Update Modal
**Font Size Controls:**
- Slider control (120px - 280px)
- Real-time value display
- Labels for Small/Medium/Large
- Live preview at scaled size
- Updates all registrations simultaneously
- Confirmation dialog with font and size details

## How to Use

### Edit Individual Font Size:
1. Go to `/admin/workshop-registrations`
2. Select a registration
3. Click "Edit Name & Font" button
4. Adjust the "Font Size" slider
5. Preview the changes in real-time
6. Click "Save Changes"

### Change Font Size for All:
1. Click "Change Font (All)" button
2. Adjust the "Font Size" slider
3. Preview the font and size
4. Click "Update All Certificates"
5. Confirm the bulk update
6. All registrations will use the new size

## Technical Details

### Font Size Storage
- Stored as INTEGER in database
- Unit: pixels (px)
- Default: 200px
- Range: 120-280px

### Certificate Rendering
- Font size is dynamic based on registration setting
- Falls back to 200px if not set
- Applied to canvas rendering at actual pixel size
- Scales properly for high-resolution certificate output

### Preview Scaling
- Individual edit preview: fontSize / 8
- Bulk update preview: fontSize / 6
- Ensures preview fits in UI without overflow

## Examples

### Small Font (120px)
Good for long names that need to fit in the certificate space.

### Medium Font (200px - Default)
Standard size that works well for most names.

### Large Font (280px)
Makes names more prominent and easier to read.

## Benefits

1. **Flexibility:** Different names can have different sizes
2. **Consistency:** Bulk update ensures uniform appearance
3. **Adaptability:** Adjust for name length and certificate design
4. **Professional:** Fine control over certificate appearance
5. **Easy to Use:** Intuitive slider controls with live preview

## Migration Required

Before using this feature, run the SQL migration:
```bash
# In Supabase SQL Editor, run:
add_certificate_font_size_column.sql
```

This adds the `certificate_font_size` column to the `workshop_registrations` table with a default value of 200px.
