# Workshop Certificate System - Complete Guide

## Overview
A comprehensive certificate generation and verification system for workshop participants with personalized certificates, QR code verification, and director signature management.

## Features Implemented

### 1. Database Schema ✅
**File:** `add_certificate_system.sql`

- Added `certificate_number` field to workshop_registrations (unique, indexed)
- Added `certificate_generated_at` timestamp field
- Added `attended` boolean field
- Created `certificate_directors` table for managing director signatures
- Created `generate_certificate_number()` function (format: UFV-YYYY-####)
- Includes sample directors data

**To Setup:** Run the SQL script in your Supabase SQL editor.

### 2. Certificate Directors Management ✅
**File:** `app/admin/certificate-directors/page.tsx`

Admin dashboard page to manage directors who sign certificates:
- Add/Edit/Delete directors
- Set director name and role/title
- Choose signature position (Left, Center, Right)
- Set display order
- Activate/Deactivate directors
- Visual preview of certificate layout

**Access:** Navigate to `/admin/certificate-directors` in admin dashboard

### 3. Certificate Generation API ✅
**Files:** 
- `app/api/generate-certificate/route.ts` (API endpoint)
- `app/components/CertificateRenderer.tsx` (Client-side renderer)

**Features:**
- Generates unique certificate numbers automatically
- Creates QR codes with verification URLs
- Fetches active directors from database
- Renders certificate on HTML5 Canvas with:
  - Certificate template PNG as background
  - Participant name (centered, large font)
  - QR code (bottom right with certificate number)
  - Director signatures at bottom (positioned by their settings)
  - Professional typography and styling

**How it works:**
1. Admin clicks "Generate Certificate" for a participant
2. API generates certificate number and QR code
3. Client-side canvas renders certificate using template
4. Certificate can be downloaded as PNG

### 4. Certificate Verification Page ✅
**File:** `app/verify-certificate/page.tsx`

Public page for certificate verification:
- Accepts certificate code from QR scan
- Verifies against database
- Shows participant details:
  - Full name
  - Certificate number
  - Organization name
  - Workshop title
  - Issue date
- Visual confirmation (green checkmark for valid, red X for invalid)
- Professional, printable design

**Access:** Users scan QR code or visit `/verify-certificate?code=UFV-YYYY-####`

### 5. Admin Certificate Management ✅
**File:** `app/admin/workshop-registrations/page.tsx` (updated)

Enhanced admin registrations page with:
- "Generate Certificate" button for each participant
- Certificate status indicators (green badge for certified participants)
- Certificate modal with preview
- Download certificate as PNG
- Test verification link
- Stat card showing total certificates issued
- Shows certificate number and generation date

## How to Use

### Initial Setup

1. **Run Database Migration:**
   ```sql
   -- In Supabase SQL Editor, run:
   -- e:\uvf\add_certificate_system.sql
   ```

2. **Install Dependencies:**
   ```bash
   npm install qrcode
   ```

3. **Add Certificate Template:**
   - Place your certificate template PNG at: `public/certificate/Certificate Template.png`
   - Recommended size: 3508 x 2480 pixels (A4 landscape at 300 DPI)
   - The template should have space for:
     - Participant name (center)
     - Director signatures (bottom, three positions)
     - QR code (bottom right)

### Managing Directors

1. Navigate to Admin Dashboard → **Certificate Directors**
2. Click **"Add New Director"**
3. Enter director details:
   - Full Name (e.g., "Dr. John Smith")
   - Role/Title (e.g., "Executive Director")
   - Signature Position: Left (1), Center (2), or Right (3)
   - Display Order (if multiple directors in same position)
   - Active status (only active directors appear on certificates)
4. Click **"Add Director"**

**Tips:**
- You can have multiple directors in each position
- Use display order to control stacking if multiple directors share a position
- Deactivate directors without deleting them
- Directors appear on certificates in the order you set

### Generating Certificates

1. Navigate to Admin Dashboard → **Workshop Registrations**
2. Click on a participant to view details
3. Click **"Generate Certificate"** button
4. Certificate modal opens showing:
   - Preview of the certificate
   - Download button (saves as PNG)
   - Test verification link
5. Click **"Download Certificate (PNG)"** to save
6. Certificate is automatically linked to the participant

**Certificate Features:**
- Unique certificate number (UFV-2026-0001, UFV-2026-0002, etc.)
- Participant name in large font
- QR code for verification
- All active director signatures
- Professional layout on your template

### Verifying Certificates

**For Certificate Holders:**
1. Scan QR code on certificate with smartphone
2. Browser opens verification page
3. See certificate details and validation status

**For Manual Verification:**
1. Visit: `https://yoursite.com/verify-certificate?code=UFV-2026-0001`
2. Replace the code with certificate number
3. View verification results

**What's Verified:**
- Certificate number exists in database
- Participant name matches
- Organization details
- Workshop information
- Issue date

## File Structure

```
e:\uvf\
├── add_certificate_system.sql                    # Database migration
├── app\
│   ├── admin\
│   │   ├── certificate-directors\
│   │   │   └── page.tsx                         # Director management UI
│   │   ├── layout.tsx                           # Added navigation link
│   │   └── workshop-registrations\
│   │       └── page.tsx                         # Certificate generation UI
│   ├── api\
│   │   └── generate-certificate\
│   │       └── route.ts                         # Certificate API
│   ├── components\
│   │   └── CertificateRenderer.tsx              # Canvas renderer
│   └── verify-certificate\
│       └── page.tsx                             # Public verification
└── public\
    └── certificate\
        └── Certificate Template.png             # Certificate background
```

## Technical Details

### Certificate Number Format
- **Pattern:** `UFV-YYYY-####`
- **Example:** `UFV-2026-0001`
- **Components:**
  - UFV: Organization prefix
  - YYYY: Year of issue
  - ####: Sequential number (padded to 4 digits)

### QR Code
- **Format:** URL to verification page
- **Example:** `https://yoursite.com/verify-certificate?code=UFV-2026-0001`
- **Size:** 200x200 pixels on certificate
- **Error Correction:** Default level

### Canvas Rendering
- **Resolution:** 3508 x 2480 pixels (A4 landscape, 300 DPI)
- **Format:** PNG image
- **Fonts:** Arial (system font, works cross-platform)
- **Colors:**
  - Text: Black (#000000)
  - Accent: Green (#16a34a)

### Director Signature Positions
1. **Left Position (1):** Bottom left area
2. **Center Position (2):** Bottom center
3. **Right Position (3):** Bottom right (avoids QR code)

Each position shows:
- Signature line (horizontal black line)
- Director name (bold, 42px)
- Director role (regular, 38px)

## Customization Guide

### Changing Certificate Template
Replace `public/certificate/Certificate Template.png` with your design.

**Important positioning in `CertificateRenderer.tsx`:**
```typescript
// Participant name position
ctx.fillText(name, canvas.width / 2, canvas.height / 2 + 50);

// QR code position
const qrX = canvas.width - qrSize - 200;  // 200px from right
const qrY = canvas.height - qrSize - 150; // 150px from bottom

// Director signatures position
const signatureY = canvas.height - 280;   // 280px from bottom
```

### Changing Certificate Number Format
Edit `add_certificate_system.sql`:
```sql
-- Change prefix from UFV to your organization code
new_number := 'YOUR-PREFIX-' || year_part || '-' || LPAD(sequence_num::TEXT, 4, '0');
```

### Changing Fonts or Colors
Edit `app/components/CertificateRenderer.tsx`:
```typescript
// Font
ctx.font = "bold 120px Arial"; // Change font family and size

// Color
ctx.fillStyle = "#000000"; // Change text color

// Line color
ctx.strokeStyle = "#16a34a"; // Change accent color
```

## Troubleshooting

### Certificate Not Generating
- Check database connection in Supabase
- Verify SQL migration ran successfully
- Check browser console for errors
- Ensure template image exists at correct path

### QR Code Not Scanning
- Verify URL is accessible publicly
- Check certificate number format is correct
- Ensure QR code is visible (not too small)

### Directors Not Showing
- Check directors are marked as "Active"
- Verify signature position is set (1, 2, or 3)
- Refresh the page to reload director data

### Template Image Not Loading
- Verify file path: `public/certificate/Certificate Template.png`
- Check file name matches exactly (case-sensitive)
- Ensure image is PNG format
- Check image size (not too large, under 10MB)

### Certificate Download Not Working
- Wait for certificate to fully render
- Check browser allows downloads
- Try different browser if issues persist

## Security Notes

1. **Certificate Numbers:** Unique and sequential, no duplicates possible
2. **Verification:** Public page, anyone can verify with certificate number
3. **Database:** Uses Supabase RLS policies for access control
4. **Admin Access:** Protected by admin authentication
5. **QR Codes:** Contain only certificate number, no sensitive data

## Future Enhancements (Optional)

- [ ] Bulk certificate generation for all participants
- [ ] Email certificates to participants automatically
- [ ] Multi-language certificate templates
- [ ] Digital signatures for directors
- [ ] Certificate revocation system
- [ ] PDF export option (in addition to PNG)
- [ ] Certificate analytics dashboard
- [ ] Batch printing interface

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review browser console for errors
3. Verify all files are in correct locations
4. Ensure database migration completed successfully

---

**System Version:** 1.0  
**Last Updated:** September 21, 2026  
**Status:** Production Ready ✅
