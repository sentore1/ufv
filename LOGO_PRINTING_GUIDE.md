# Logo Printing Guide for Workshop Registration PDFs

## Ensuring Logos Appear in Printed PDFs

When you export a registration to PDF, the document includes **three organization logos** at the top:
- **UFV** (Umbrella for Vulnerable)
- **IsDB** (Islamic Development Bank)
- **SIF** (Secure Interfaith France)

### Why Logos Matter
✅ Professional appearance  
✅ Official documentation  
✅ Brand recognition  
✅ Credibility and authenticity  

---

## How to Ensure Logos Print Correctly

### Step 1: Export the PDF
1. Go to Admin Dashboard → Workshop Registrations
2. Click on a registration
3. Click **"Export PDF"** button
4. New window opens with the registration

### Step 2: Enable Background Graphics (IMPORTANT!)

#### For Google Chrome / Microsoft Edge:
1. Click **"Print to PDF"** button or press `Ctrl+P`
2. In the print dialog, click **"More settings"**
3. Look for **"Background graphics"** checkbox
4. ✅ **CHECK this box** to enable logos
5. Click "Save" or "Print"

```
Print Dialog
├── Destination: Save as PDF
├── Pages: All
├── Layout: Portrait
├── Color: Color (recommended)
├── More settings ▼
│   ├── Paper size: A4
│   ├── Margins: Default
│   └── ☑️ Background graphics  ← ENABLE THIS!
└── [Save] button
```

#### For Mozilla Firefox:
1. Press `Ctrl+P` or click "Print to PDF"
2. In the print preview, look for **"Print Backgrounds"**
3. ✅ **CHECK this box**
4. Click "Print" → "Save as PDF"

#### For Safari (Mac):
1. Press `Cmd+P`
2. Click "Show Details"
3. Check **"Print backgrounds"**
4. Click "PDF" → "Save as PDF"

---

## Visual Checklist

### ✅ Correct Setup (Logos Will Print)
```
┌─────────────────────────────────────┐
│        Print Dialog Settings        │
├─────────────────────────────────────┤
│ Destination: Save as PDF            │
│ Color:      ● Color (recommended)   │
│ Settings:                           │
│   ☑️ Background graphics  ← ON      │
│   ☑️ Print backgrounds    ← ON      │
└─────────────────────────────────────┘

Result: 
┌─────────────────────────────────────┐
│   [UFV Logo] [IsDB Logo] [SIF Logo] │ ← Logos appear!
│                                     │
│   Workshop Registration Form        │
└─────────────────────────────────────┘
```

### ❌ Incorrect Setup (Logos Won't Print)
```
┌─────────────────────────────────────┐
│        Print Dialog Settings        │
├─────────────────────────────────────┤
│ Destination: Save as PDF            │
│ Color:      ○ Black and white       │
│ Settings:                           │
│   ☐ Background graphics  ← OFF      │
│   ☐ Print backgrounds    ← OFF      │
└─────────────────────────────────────┘

Result: 
┌─────────────────────────────────────┐
│   [          Empty Space          ] │ ← No logos!
│                                     │
│   Workshop Registration Form        │
└─────────────────────────────────────┘
```

---

## Recommended Print Settings

### For Best Quality PDFs:
| Setting | Recommended Value | Why |
|---------|------------------|-----|
| **Destination** | Save as PDF | Creates digital file |
| **Color** | Color | Logos appear in color |
| **Background graphics** | ✅ Enabled | Shows logos and colors |
| **Paper size** | A4 or Letter | Standard document size |
| **Margins** | Default | Proper spacing |
| **Scale** | 100% or Fit to page | Correct proportions |
| **Orientation** | Portrait | Vertical layout |

### Color vs Black & White:
- **Color (Recommended):**
  - Logos appear in full color
  - Professional appearance
  - Better visual impact
  - Slightly larger file size

- **Black & White:**
  - Logos appear in grayscale
  - Still recognizable
  - Smaller file size
  - May lose some detail

---

## Testing Your PDF

### Before Finalizing:
1. **Preview the PDF** in the print dialog
2. **Check the header** - logos should be visible
3. **Scroll through** all sections
4. **Verify signature space** is clear
5. If logos don't appear → check "Background graphics"

### Quick Test:
```
1. Export PDF
   ↓
2. Look at preview - Do you see three logos?
   ↓
   YES → Good! Click Save
   ↓
   NO → Enable "Background graphics" → Try again
```

---

## Troubleshooting

### Problem 1: Logos Don't Appear at All
**Cause:** Background graphics disabled  
**Solution:** 
1. Cancel current print
2. Press `Ctrl+P` again
3. Enable "Background graphics"
4. Print again

### Problem 2: Logos Are Cut Off
**Cause:** Wrong scale or margins  
**Solution:**
1. Set scale to "Fit to page" or "100%"
2. Use default margins
3. Check orientation is Portrait

### Problem 3: Logos Are Blurry
**Cause:** Low quality or wrong scale  
**Solution:**
1. Use 100% scale (not zoomed)
2. Ensure "Background graphics" is enabled
3. Try saving at higher quality settings

### Problem 4: Logos Print in Black & White
**Cause:** Color setting is disabled  
**Solution:**
1. In print dialog, select "Color" option
2. Ensure not set to "Black and white"
3. Print again

---

## Logo Specifications

### Current Logo Files:
- **UFV Logo:** `/public/partners/UFV.png`
- **IsDB Logo:** `/public/partners/isDB.JPG`
- **SIF Logo:** `/public/partners/SIF.png`

### Display Settings:
- Height: 60px
- Max Width: 150px
- Format: PNG/JPG
- Position: Centered at top
- Spacing: 40px gap between logos

### Technical Implementation:
- ✅ Absolute URLs (work in popup window)
- ✅ Print-friendly CSS
- ✅ Proper color adjustment for print
- ✅ Page-break protection
- ✅ Cross-origin support

---

## Browser-Specific Instructions

### Google Chrome
```
Ctrl+P → More settings ▼ → ☑️ Background graphics → Save
```
**Note:** Chrome has best PDF generation support

### Microsoft Edge
```
Ctrl+P → More settings ▼ → ☑️ Background graphics → Save
```
**Note:** Same print engine as Chrome

### Mozilla Firefox
```
Ctrl+P → ☑️ Print backgrounds → Print → Save as PDF
```
**Note:** Setting may be in different location

### Safari (macOS)
```
Cmd+P → Show Details → ☑️ Print backgrounds → PDF → Save as PDF
```
**Note:** macOS native print dialog

---

## For IT Administrators

### If logos consistently don't appear:
1. **Check file permissions** on `/public/partners/` folder
2. **Verify image files exist:**
   - UFV.png
   - isDB.JPG
   - SIF.png
3. **Test image URLs** directly in browser:
   - `https://yourdomain.com/partners/UFV.png`
   - `https://yourdomain.com/partners/isDB.JPG`
   - `https://yourdomain.com/partners/SIF.png`
4. **Check browser console** for errors when generating PDF

### Server Configuration:
- Ensure static files are served with proper CORS headers
- Image files should be accessible without authentication
- Proper MIME types configured for PNG and JPG

---

## Alternative: Save with Logos Embedded

If you need to ensure logos always appear:

### Option 1: Use Print to PDF (Not Save as PDF)
Some PDF printers embed images better than browser's "Save as PDF"

### Option 2: Screenshot to PDF
1. Generate PDF preview
2. Take full-page screenshot
3. Convert screenshot to PDF
(Not recommended - lower quality)

### Option 3: Use Professional PDF Software
Adobe Acrobat or similar tools can merge the printed PDF with high-quality images

---

## Quick Reference Card

```
┌──────────────────────────────────────────────┐
│      HOW TO PRINT WITH LOGOS                 │
├──────────────────────────────────────────────┤
│                                              │
│  1. Click "Export PDF" button                │
│  2. Press Ctrl+P (or Cmd+P on Mac)          │
│  3. Click "More settings"                    │
│  4. ☑️ Enable "Background graphics"          │
│  5. Select "Color" option                    │
│  6. Click "Save"                             │
│                                              │
│  ✅ Your PDF will include all three logos!   │
│                                              │
└──────────────────────────────────────────────┘
```

---

## Summary

### Must Do:
- ✅ Enable "Background graphics" / "Print backgrounds"
- ✅ Use "Color" print option
- ✅ Check preview before saving

### Should Do:
- ✅ Use standard paper size (A4 or Letter)
- ✅ Keep 100% scale
- ✅ Use portrait orientation

### Nice to Have:
- ✅ Test in Chrome/Edge for best results
- ✅ Save with descriptive filename
- ✅ Keep digital backup

**Remember:** The "Background graphics" checkbox is the key to seeing logos! 🔑

---

**Need more help?** Check the main documentation:
- `PDF_EXPORT_GUIDE.md` - Complete PDF export guide
- `WORKSHOP_REGISTRATION_UPDATES.md` - Technical documentation
- `IMPLEMENTATION_CHECKLIST.md` - Deployment checklist
