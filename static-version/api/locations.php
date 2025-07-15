<?php
require_once 'config.php';

$pdo = getDbConnection();

try {
    // Get all active locations
    $stmt = $pdo->prepare("
        SELECT 
            id,
            name,
            address,
            zip_code,
            description,
            phone_number,
            instagram_account,
            whatsapp_number,
            image_url,
            latitude,
            longitude,
            map_url,
            status
        FROM locations 
        WHERE status = 'active' 
        ORDER BY name
    ");
    $stmt->execute();
    $locations = $stmt->fetchAll();
    
    // Add default image if none exists and format data
    foreach ($locations as &$location) {
        if (empty($location['image_url'])) {
            $location['image_url'] = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
        }
        
        // Generate map URL if coordinates exist but no map URL
        if (empty($location['map_url']) && !empty($location['latitude']) && !empty($location['longitude'])) {
            $location['map_url'] = "https://maps.google.com/?q={$location['latitude']},{$location['longitude']}";
        }
    }
    
    sendResponse($locations);
    
} catch (PDOException $e) {
    error_log("Error fetching locations: " . $e->getMessage());
    handleError("Failed to fetch locations");
}
?>