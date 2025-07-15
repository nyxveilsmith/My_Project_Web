<?php
require_once 'config.php';

$pdo = getDbConnection();

try {
    // Get all published articles
    $stmt = $pdo->prepare("
        SELECT 
            id,
            title,
            SUBSTR(content, 1, 150) as excerpt,
            image_url,
            created_at,
            updated_at
        FROM articles 
        WHERE status = 'published' 
        ORDER BY created_at DESC
    ");
    $stmt->execute();
    $articles = $stmt->fetchAll();
    
    // Add default image if none exists
    foreach ($articles as &$article) {
        if (empty($article['image_url'])) {
            $article['image_url'] = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
        }
    }
    
    sendResponse($articles);
    
} catch (PDOException $e) {
    error_log("Error fetching articles: " . $e->getMessage());
    handleError("Failed to fetch articles");
}
?>