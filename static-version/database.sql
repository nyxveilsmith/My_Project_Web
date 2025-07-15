-- Megahand Website Database Schema
-- Run this SQL in your SmartHost cPanel phpMyAdmin

-- Create database (if not already created through cPanel)
-- CREATE DATABASE megahand_website;
-- USE megahand_website;

-- Users table for admin access
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    excerpt VARCHAR(500),
    image_url VARCHAR(500),
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    zip_code VARCHAR(10),
    description TEXT,
    phone_number VARCHAR(20),
    instagram_account VARCHAR(50),
    whatsapp_number VARCHAR(20),
    image_url VARCHAR(500),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    map_url VARCHAR(500),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status)
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password, email, role) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'm3gahand@gmail.com', 'admin')
ON DUPLICATE KEY UPDATE username = username;

-- Insert sample articles
INSERT INTO articles (title, content, excerpt, image_url, status) VALUES 
('Yay Kolleksiyası 2025', 'Yeni yay kolleksiyamız artıq mağazalarımızda! Rahat və stil sahibi geyimlər ailəçün...', 'Yeni yay kolleksiyamız artıq mağazalarımızda! Rahat və stil sahibi geyimlər ailəçün...', 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'published'),
('Uşaq Geyimləri Seçimi', 'Uşaqlarınız üçün rahat və keyfiyyətli geyimləri necə seçmək lazımdır? Bizim təcrübəmiz...', 'Uşaqlarınız üçün rahat və keyfiyyətli geyimləri necə seçmək lazımdır?', 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'published'),
('Moda Tendensiyaları', 'Bu ilin ən populyar moda tendensiyaları haqqında məqalə. Avropa modası və yeni stillər...', 'Bu ilin ən populyar moda tendensiyaları haqqında məqalə.', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'published');

-- Insert sample locations
INSERT INTO locations (name, address, zip_code, description, phone_number, instagram_account, whatsapp_number, image_url, latitude, longitude, map_url, status) VALUES 
('Megahand Sumqayit #1', 'Badalbayli Street, Sumqayit 5001', '5001', 'Sumqayitdəki əsas ofisimiz. Ən yeni Avropa geyim kolleksiyaları üçün bizi ziyarət edin.', '+99450 277 07 20', '@megahandsumqayit', '+99450 277 07 20', 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 40.5889, 49.6572, 'https://maps.app.goo.gl/U9ZFGMH8PySBTy5M7', 'active'),
('Megahand Bakı -Q.Qarayev-', 'CW8R+255, Baku', NULL, 'Qara Qarayev metro stansiyası yaxınlığında yerləşən Bakı filialımız.', '+99450 490 35 60', '@megahandsumqayit', '+99450 490 35 60', 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 40.4093, 49.9387, 'https://maps.app.goo.gl/tRPAKnDzA8z9yC1S9', 'active'),
('Megahand-Gəncə', 'M9H9+X33, Ganja', NULL, 'Gəncə filialımız keyfiyyətli Avropa modası təklif edir.', '+99450 453 20 45', '@megahandsumqayit', '+99450 453 20 45', 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 40.6830, 46.3606, 'https://maps.app.goo.gl/V9WJAhCdnEtJAFa77', 'active');