# Workshop Registration Name & Font Edit Feature

## Overview
Added the ability for admins to edit participant names and choose custom fonts for certificates in the Workshop Registrations admin panel.

## Features Implemented

### 1. Edit Participant Name
- Admin can click "✏️ Edit Name & Font" button in the registration details panel
- Edit the participant's full name that will appear on the certificate
- Changes are saved to the database and reflected immediately

### 2. Choose Certificate Font
- 8 handwritten/script fonts available:
  - Brush Script MT (Default)
  - Lucida Handwriting
  - Segoe Script
  - Edwardian Script ITC
  - Monotype Corsiva
  - Vladimir Script
  - French Script MT
  - Kunstler Script

### 3. Live Font Preview
- See how the name will look in the selected font before saving
- Preview updates in real-time as you type or change fonts

### 4. Certificate Generation with Custom Font
- When generating a certificate, the system uses the selected font
- Font preference is saved per registration
- Defaults to "Brush Script MT" if no font is selected

## Database Changes

### New Column Added
Run this SQL migration in your Supabase database:

```sql
-- Add certificate_font column to workshop_registrations table
ALTER TABLE workshop_registrations
ADD COLUMN IF NOT EXISTS certificate_font VARCHAR(100) DEFAULT 'Brush Script MT';

-- Add comment to the column
COMMENT ON COLUMN workshop_registrations.certificate_font IS 'Font to use for participant name on certificate';
```

**File:** `add_certificate_font_column.sql`

## Files Modified

### 1. `/app/admin/workshop-registrations/page.tsx`
- Added edit mode states (`isEditingName`, `editedName`, `selectedFont`, `savingChanges`)
- Added `certificateFonts` array with 8 font options
- Added `handleSaveNameAndFont()` function to update database
- Added `useEffect` to sync selected registration with edit fields
- Updated UI to show edit panel with name input, font selector, and preview
- Updated certificate generation to pass font to API
- Modified `WorkshopRegistration` interface to include `certificate_font` field

### 2. `/app/components/CertificateRenderer.tsx`
- Updated `CertificateData` interface to include optional `font` field
- Modified name rendering to use custom font from `certificateData.font`
- Fallback to "Brush Script MT" if no font specified

## User Interface

### Registration Details Panel
When a registration is selected:
1. Shows current name and font in the Personal Information section
2. Click "✏️ Edit Name & Font" button to enter edit mode
3. Edit panel appears with:
   - Text input for name
   - Dropdown for font selection
   - Live preview box
   - Save Changes button
   - Cancel button

### Edit Panel Features
- Yellow highlighted background for visibility
- Real-time preview of how name will appear
- Font dropdown with descriptive labels
- Helper text explaining font usage
- Save button (green) and Cancel button (gray)
- Loading state while saving ("Saving...")
- Success alert on save
- Error alert if save fails

## How to Use

### For Admins:
1. Go to `/admin/workshop-registrations`
2. Select a registration from the list
3. In the details panel, click "✏️ Edit Name & Font"
4. Edit the name if needed
5. Choose a font from the dropdown
6. Review the preview
7. Click "💾 Save Changes"
8. Generate certificate with "Generate Certificate" button
9. The certificate will use the selected font

### Certificate Downloads:
- Download PNG button - saves as PNG image
- Download PDF button - saves as PDF document
- Both formats use the custom font

## Technical Notes

### Font Availability
- Fonts are system fonts that should be available on most Windows systems
- If a font is not available, the browser will fall back to the next font in the CSS font stack
- All fonts have fallbacks: `'Selected Font', 'Lucida Handwriting', 'Segoe Script', cursive`

### Database Storage
- Font name is stored as VARCHAR(100)
- Default value is "Brush Script MT"
- Nullable field (optional)

### Certificate Generation Flow
1. Admin selects font for registration
2. Font is saved in `certificate_font` column
3. When generating certificate, font is passed to API
4. API includes font in certificate data
5. CertificateRenderer uses font to render participant name

## Dependencies
- **jsPDF** - For PDF certificate generation (already installed)
- **@types/qrcode** - TypeScript types for QR code (already installed)

## Future Enhancements
Possible improvements:
- Add more font options
- Allow uploading custom fonts
- Batch edit multiple registrations
- Font preview with actual certificate template background
- Undo/redo functionality for edits
- Edit history/audit log
