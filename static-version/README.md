# Megahand Website - Static Version for SmartHost

This is a static HTML/CSS/JavaScript version of the Megahand website designed for SmartHost hosting.

## What's Included

### Frontend Files
- `index.html` - Main website page
- `styles.css` - Custom styling 
- `script.js` - JavaScript functionality
- `logo.jpg` - Company logo (you need to add this)

### Backend Files (PHP)
- `api/config.php` - Database configuration
- `api/articles.php` - Articles API endpoint
- `api/locations.php` - Locations API endpoint  
- `api/contact.php` - Contact form handler
- `database.sql` - Database schema and sample data

## Setup Instructions for SmartHost

### 1. Database Setup
1. Log in to your SmartHost cPanel
2. Go to **MySQL Database Wizard**
3. Create a new database (e.g., `megahand_website`)
4. Create a MySQL user and assign to the database
5. Go to **phpMyAdmin**
6. Import the `database.sql` file

### 2. Configure Database Connection
Edit `api/config.php` and update these values:
```php
$db_config = [
    'host' => 'localhost',
    'username' => 'your_cpanel_username_dbname',  // Usually yourname_dbuser
    'password' => 'your_database_password',
    'database' => 'your_cpanel_username_dbname'   // Usually yourname_dbname
];
```

### 3. Upload Files
1. Upload all files to your SmartHost public_html directory
2. Make sure the `api/` folder has proper permissions (755)
3. Upload your logo as `logo.jpg` in the root directory

### 4. Test the Website
- Visit your domain to see the website
- Test contact form functionality
- Check that articles and locations load properly

## Features

### Static Content
- Responsive design for all devices
- Day progress tracker with real-time updates
- Smooth scrolling navigation
- Mobile-friendly menu

### Dynamic Content (PHP)
- Articles management
- Locations display
- Contact form with database storage
- Email notifications for contact messages

### Real-time Features
- Live time display in Azerbaijan timezone
- Day and year progress percentages
- Dynamic theme based on time of day

## Admin Features
The database includes an admin user:
- Username: `admin`
- Password: `admin123`

You can extend this by creating admin pages for content management.

## SmartHost Specific Notes

### PHP Version
Make sure your SmartHost plan supports PHP 7.4 or higher.

### Email Function
The contact form uses PHP's `mail()` function. This should work with SmartHost hosting.

### MySQL Support
SmartHost provides MySQL databases with phpMyAdmin access - perfect for this setup.

### File Permissions
- PHP files: 644
- Directories: 755
- Make sure the `api/` folder is accessible

## Customization

### Adding Content
- Edit articles in the database via phpMyAdmin
- Update locations in the database
- Modify contact information in the HTML

### Styling
- Edit `styles.css` for design changes
- Update colors in the CSS file
- Modify responsive breakpoints as needed

### JavaScript
- `script.js` contains all interactive functionality
- Add new features by extending the existing code
- API calls are handled with fetch() for modern browsers

## Security Notes

1. Change the default admin password after setup
2. Consider adding input validation to PHP files
3. Keep your database credentials secure
4. Regular backups through cPanel are recommended

## Support

This static version provides all the functionality of the original website optimized for traditional hosting providers like SmartHost. The PHP backend handles dynamic content while maintaining fast loading times.