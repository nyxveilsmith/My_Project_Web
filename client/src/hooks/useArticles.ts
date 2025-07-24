import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type Article, type InsertArticle } from "@shared/schema";

export function useArticles() {
  const queryClient = useQueryClient();

  const articlesQuery = useQuery<Article[]>({
    queryKey: ["/api/articles"],
    queryFn: async () => {
      console.log("Fetching articles...");
      const response = await apiRequest("GET", "/api/articles");
      const data = await response.json();
      console.log("Articles API response:", data);
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const createArticleMutation = useMutation({
    mutationFn: async (newArticle: InsertArticle) => {
      console.log("Creating article:", newArticle);
      const res = await apiRequest("POST", "/api/articles", newArticle);
      return res.json();
    },
    onSuccess: (data) => {
      console.log("Article created successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
    },
    onError: (error) => {
      console.error("Error creating article:", error);
    },
  });

  const updateArticleMutation = useMutation({
    mutationFn: async ({ id, article }: { id: number; article: Partial<InsertArticle> }) => {
      console.log("Updating article:", id, article);
      const res = await apiRequest("PUT", `/api/articles/${id}`, article);
      return res.json();
    },
    onSuccess: (data, variables) => {
      console.log("Article updated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      queryClient.invalidateQueries({ queryKey: [`/api/articles/${variables.id}`] });
    },
    onError: (error) => {
      console.error("Error updating article:", error);
    },
  });

  const deleteArticleMutation = useMutation({
    mutationFn: async (id: number) => {
      console.log("Deleting article:", id);
      await apiRequest("DELETE", `/api/articles/${id}`);
      return id;
    },
    onSuccess: (id) => {
      console.log("Article deleted successfully:", id);
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
    },
    onError: (error) => {
      console.error("Error deleting article:", error);
    },
  });

  return {
    articles: articlesQuery.data || [],
    isLoading: articlesQuery.isLoading,
    isError: articlesQuery.isError,
    error: articlesQuery.error,
    createArticle: createArticleMutation.mutate,
    isCreating: createArticleMutation.isPending,
    updateArticle: updateArticleMutation.mutate,
    isUpdating: updateArticleMutation.isPending,
    deleteArticle: deleteArticleMutation.mutate,
    isDeleting: deleteArticleMutation.isPending,
  };
}

export function useArticle(id: number | null) {
  const enabled = id !== null;
  
  const articleQuery = useQuery<Article>({
    queryKey: [`/api/articles/${id}`],
    queryFn: async () => {
      if (!id) throw new Error("Article ID is required");
      console.log("Fetching article:", id);
      const response = await apiRequest("GET", `/api/articles/${id}`);
      const data = await response.json();
      console.log("Article API response:", data);
      return data;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    article: articleQuery.data,
    isLoading: articleQuery.isLoading,
    isError: articleQuery.isError,
    error: articleQuery.error,
  };
}
