import { db } from "./db";
import { storage } from "./storage";
import { users, articles, locations } from "../shared/schema";
import { eq } from "drizzle-orm";

// Function to seed the database with initial data if empty
export async function seedDatabase() {
  try {
    console.log("Checking if database needs seeding...");

    // Check if users table is empty
    const userCount = await db.select().from(users);
    const hasUsers = userCount.length > 0;

    if (!hasUsers) {
      console.log("Seeding admin user...");
      await storage.createUser({
        username: "AdminMega",
        password: "121224MM"
      });
      console.log("Admin user seeded successfully");
    }

    // Check if articles table is empty
    const articleCount = await db.select().from(articles);
    const hasArticles = articleCount.length > 0;

    if (!hasArticles) {
      console.log("Seeding articles...");

      // Seed articles
      await storage.createArticle({
        title: "Yeni Mövsüm Kolleksiyası",
        summary: "2024-cü ilin yaz-yay kolleksiyasında ən son dəb tendensiyaları və rəng kombinasiyaları ilə tanış olun...",
        content: "Yeni mövsüm kolleksiyamızda təqdim olunan geyimlər müasir üslubla klassik elementləri özündə birləşdirir. Kolleksiyada parlaq rənglər, rahat parçalar və innovativ dizaynlar üstünlük təşkil edir.",
        imageUrl: "https://images.unsplash.com/photo-1581090700227-8e3b68af7c63?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        status: "published"
      });

      await storage.createArticle({
        title: "İdman Geyimləri Seçimi",
        summary: "İdman üçün doğru geyim seçimi performansınızı artıra bilər...",
        content: "İdman geyimlərində nəfes alan parçalar, rahat kəsimlər və mövsümə uyğunluq əsas götürülməlidir. Məqalədə müxtəlif idman növləri üçün ən uyğun geyim seçimləri haqqında məlumat verəcəyik.",
