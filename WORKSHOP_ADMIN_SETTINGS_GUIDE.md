# Workshop Admin Settings - Complete Guide

## Overview
You can now edit the workshop form content (title, subtitle, location, dates) from the admin dashboard **without touching any code**!

## ✅ What Was Created

### 1. Database Table
**File:** `create_workshop_settings_table.sql`
- Stores all workshop information in 4 languages
- Title, subtitle, and location for each language
- Start and end dates
- Active/inactive status

### 2. Admin Settings Page
**URL:** `/admin/workshop-settings`
- Edit all workshop details from the browser
- Changes apply immediately to the public form
- No coding required!

### 3. Updated Form
The workshop registration form now:
- ✅ Loads settings from the database
- ✅ Falls back to translation files if database is empty
- ✅ Updates automatically when you change settings

## 🚀 Setup Instructions

### Step 1: Create the Database Table
1. Open your Supabase dashboard
2. Go to SQL Editor
3. Open the file `create_workshop_settings_table.sql`
4. Copy all the SQL code
5. Paste and execute in Supabase

**Note:** This script includes default values (current workshop info), so the form will work immediately!

### Step 2: Access Admin Settings
1. Log in to your admin panel: `/admin`
2. Click **"Workshop Settings"** in the sidebar
3. You'll see all editable fields

## 📝 What You Can Edit

### Workshop Status
- ✅ **Active/Inactive Toggle**: Turn the workshop form on or off

### Workshop Dates
- ✅ **Start Date**: When the workshop begins
- ✅ **End Date**: When the workshop ends

### Content in 4 Languages

#### 🇬🇧 English
- **Title**: Main workshop title
- **Subtitle**: Workshop focus/topic
- **Location**: Date range and location text

#### 🇫🇷 French
- **Titre**: Main workshop title in French
- **Sous-titre**: Workshop focus in French
- **Lieu**: Date range and location in French

#### 🇸🇦 Arabic
- **العنوان**: Main workshop title in Arabic (right-to-left input)
- **العنوان الفرعي**: Workshop focus in Arabic
- **الموقع**: Date range and location in Arabic

#### 🇷🇼 Kinyarwanda
- **Umutwe**: Main workshop title in Kinyarwanda
- **Umutwe Muto**: Workshop focus in Kinyarwanda
- **Aho Biherereye**: Date range and location in Kinyarwanda

## 💡 How to Use

### Editing Workshop Information

1. **Go to:** `http://localhost:3000/admin/workshop-settings`
   (or `https://yoursite.com/admin/workshop-settings` in production)

2. **Make Your Changes:**
   - Update dates using the date pickers
   - Edit titles, subtitles, or locations in any language
   - Toggle the active status if needed

3. **Save:**
   - Click "Save Changes" at the top or bottom
   - Changes are instant!

4. **Verify:**
   - Visit the workshop form: `/en/workshop` (or `/fr/`, `/ar/`, `/rw/`)
   - Your changes should appear immediately

### Example: Changing Workshop Dates

**Current:** September 27 - October 1, 2026

**To Change:**
1. Go to Workshop Settings
2. Update "Start Date" → Select new date
3. Update "End Date" → Select new date
4. Update location text in all 4 languages to reflect new dates:
   - English: `15-20 NOVEMBER 2026, KIGALI-RWANDA`
   - French: `15-20 NOVEMBRE 2026, KIGALI-RWANDA`
   - Arabic: `15-20 نوفمبر 2026، كيغالي-رواندا`
   - Kinyarwanda: `15-20 UGUSHYINGO 2026, KIGALI-RWANDA`
5. Click "Save Changes"

### Example: Temporarily Disabling the Form

If you need to pause registrations:
1. Go to Workshop Settings
2. Uncheck "Workshop form is active"
3. Click "Save Changes"
4. The form will no longer be accessible to users

To reactivate:
1. Check the box again
2. Click "Save Changes"

## 🎨 Benefits

### No Code Required
- ✅ Update workshop info from your browser
- ✅ No need to edit files or deploy code
- ✅ Perfect for non-technical staff

### Multilingual Support
- ✅ Edit all 4 languages in one place
- ✅ Preview exactly how each will appear
- ✅ Arabic text displays right-to-left

### Real-Time Updates
- ✅ Changes apply immediately
- ✅ No deployment needed
- ✅ Users see updates instantly

### Safe & Secure
- ✅ Admin authentication required
- ✅ Database backup available via Supabase
- ✅ Undo by editing again

## 📋 Admin Menu Structure

After setup, your admin sidebar will show:

```
Admin Panel
├── Dashboard
├── CMS
├── Pages
├── Translations
├── Donations
├── Workshop Registrations  ← View submissions
├── Workshop Settings       ← Edit form content (NEW!)
└── Logout
```

## 🔄 How It Works

### Database → Form Flow

1. **User visits workshop form** (`/en/workshop`)
2. **Form fetches settings** from `workshop_settings` table
3. **Display content** based on user's language
4. **If no settings found**, fall back to translation files

### Admin → Database Flow

1. **Admin edits settings** in Workshop Settings page
2. **Click "Save Changes"**
3. **Settings update** in database
4. **All users see updates** immediately

## 🛠️ Troubleshooting

### "No Settings Found" Error
**Problem:** The database table wasn't created or is empty

**Solution:**
1. Run the `create_workshop_settings_table.sql` script
2. It will create the table AND insert default values
3. Refresh the admin settings page

### Changes Not Appearing on Form
**Problem:** Browser cache or data not saved

**Solution:**
1. Hard refresh the form page (Ctrl+Shift+R or Cmd+Shift+R)
2. Check that you clicked "Save Changes" in admin
3. Verify changes in Supabase table directly

### Can't Access Admin Settings
**Problem:** Not logged in or missing menu item

**Solution:**
1. Make sure you're logged into admin (`/admin`)
2. Check that admin layout was updated with the new menu item
3. Try accessing directly: `/admin/workshop-settings`

## 📊 Database Schema

### Table: `workshop_settings`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `title_en` | TEXT | English title |
| `title_fr` | TEXT | French title |
| `title_ar` | TEXT | Arabic title |
| `title_rw` | TEXT | Kinyarwanda title |
| `subtitle_en` | TEXT | English subtitle |
| `subtitle_fr` | TEXT | French subtitle |
| `subtitle_ar` | TEXT | Arabic subtitle |
| `subtitle_rw` | TEXT | Kinyarwanda subtitle |
| `location_en` | TEXT | English location |
| `location_fr` | TEXT | French location |
| `location_ar` | TEXT | Arabic location |
| `location_rw` | TEXT | Kinyarwanda location |
| `start_date` | DATE | Workshop start date |
| `end_date` | DATE | Workshop end date |
| `is_active` | BOOLEAN | Form active status |
| `created_at` | TIMESTAMP | Creation time |
| `updated_at` | TIMESTAMP | Last update time |

## 🎯 Best Practices

1. **Always fill all 4 languages** - Even if you focus on one, having translations ensures all users see content

2. **Test after changes** - Visit the form in each language to verify

3. **Keep location consistent** - Make sure dates match in all language versions

4. **Use the dates fields** - Start/end dates are separate for filtering and display logic

5. **Backup before major changes** - Supabase has automatic backups, but you can export data manually

## 🔮 Future Enhancements

Possible additions you could make:
- Add more editable sections (footer text, success message, etc.)
- Add logo upload functionality
- Add email notification settings
- Add capacity limits for registrations
- Add custom form fields

---

**Status:** ✅ Admin Settings Complete
**Access:** `/admin/workshop-settings`
**Last Updated:** August 30, 2026
