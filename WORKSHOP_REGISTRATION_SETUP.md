# Workshop Registration System - Setup Complete

## Overview
A complete workshop registration system has been created for the "Regional Capacity Building Project for Local NGOs dealing with Muslim Communities in Africa" workshop (January 25-31, 2026, Kigali-Rwanda).

## Files Created

### 1. Database Schema
**File:** `create_workshop_registrations_table.sql`
- Creates the `workshop_registrations` table with all form fields
- Includes proper indexing for performance
- Row Level Security policies configured
- Auto-updating timestamp triggers

**To set up the database:**
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `create_workshop_registrations_table.sql`
4. Execute the SQL script

### 2. Public Registration Form
**File:** `app/[locale]/workshop/page.tsx`
- Complete multi-section registration form matching the physical form exactly
- All 8 sections included:
  - Section A: Personal Information
  - Section B: Organization Details
  - Section C: Contact Information
  - Section D: Travel & Accommodation
  - Section E: Language & Participation
  - Section F: Dietary & Special Needs
  - Section G: Expectations
  - Section H: Declaration
- Form validation and required fields
- Success message after submission
- Responsive design for mobile and desktop

**Access URL:** `https://yoursite.com/en/workshop` (or `/fr/workshop`, `/ar/workshop`, `/rw/workshop`)

### 3. Admin Dashboard
**File:** `app/admin/workshop-registrations/page.tsx`
- View all workshop registrations in real-time
- Detailed view of each registration
- Search and filter functionality
- Export to CSV for spreadsheet analysis
- Statistics dashboard showing:
  - Total registrations
  - Accommodation requirements
  - Airport pickup needs
  - Interpretation requests
- Delete registrations functionality

**Access:** Through admin panel at `/admin/workshop-registrations`

### 4. Admin Navigation Updated
**File:** `app/admin/layout.tsx`
- Added "Workshop Registrations" link to admin sidebar menu
- Easy access from any admin page

## Features

### Public Form Features:
✅ Multi-step form with 8 sections
✅ Checkbox arrays for multiple selections (languages, capacity building areas)
✅ Radio buttons for single selections (gender, dietary requirements)
✅ Date pickers for birth date, travel dates, signature date
✅ Text areas for detailed responses
✅ Form validation (required fields marked with *)
✅ Success screen after submission
✅ Mobile responsive design
✅ Professional layout matching the physical form design

### Admin Dashboard Features:
✅ Real-time registration viewing
✅ Search by name, email, or organization
✅ Filter by organization type
✅ Statistics cards with key metrics
✅ Export all data to CSV
✅ Detailed view with all information organized by section
✅ Visual indicators for special requirements (accommodation, pickup, interpretation)
✅ Delete functionality with confirmation
✅ Responsive two-column layout (list + details)
✅ Color-coded badges for quick identification

## Database Schema Details

The `workshop_registrations` table includes:

**Personal Information:**
- full_name, gender, date_of_birth, nationality, country_of_residence, passport_number

**Organization:**
- organization_name, organization_type, position_title, years_experience

**Contact:**
- email, phone, emergency_contact

**Travel:**
- country_of_departure, arrival_date, departure_date, accommodation_required, airport_pickup_required

**Language:**
- preferred_languages (array), interpretation_required

**Dietary/Special:**
- dietary_requirements, allergies_conditions, special_needs

**Expectations:**
- expectations, capacity_building_areas (array)

**Declaration:**
- signature_name, signature_date

**Metadata:**
- id, created_at, updated_at

## Next Steps

1. **Create the database table:**
   - Run the SQL script in Supabase SQL Editor

2. **Test the registration form:**
   - Visit `/en/workshop` on your website
   - Fill out and submit a test registration

3. **Access the admin dashboard:**
   - Log in to your admin panel at `/admin`
   - Click "Workshop Registrations" in the sidebar
   - View the test registration

4. **Export data:**
   - Use the "Export CSV" button to download all registrations
   - Open in Excel or Google Sheets for analysis

## CSV Export Fields

When you export, you'll get a CSV file with all fields including:
- All personal information
- Organization details
- Contact information
- Travel arrangements
- Language preferences
- Dietary requirements
- Special needs
- Expectations
- Capacity building areas
- Registration timestamp

## Security Notes

- Public users can ONLY insert registrations (no viewing others' data)
- Admin panel requires authentication (localStorage check)
- Row Level Security enabled on the table
- All form inputs are validated before submission

## Customization

To customize the form:
1. Edit `app/[locale]/workshop/page.tsx` for form changes
2. Edit `app/admin/workshop-registrations/page.tsx` for dashboard changes
3. Update the SQL schema if adding new fields

## Support

All registrations are stored in Supabase and can be:
- Viewed in real-time through the admin dashboard
- Exported to CSV for offline analysis
- Queried directly through Supabase dashboard
- Backed up using Supabase backup features

---

**Status:** ✅ Ready for Production
**Last Updated:** 2026-08-30
