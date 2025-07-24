
import { useEffect } from "react";
import { useArticles } from "@/hooks/useArticles";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";

export default function Interesting() {
  const { articles, isLoading, isError } = useArticles();

  useEffect(() => {
    console.log("Articles data:", articles);
    console.log("Is loading:", isLoading);
    console.log("Is error:", isError);
  }, [articles, isLoading, isError]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Məqalələr yüklənir...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Məqalələr yüklənərkən xəta baş verdi</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
          >
            Yenidən cəhd et
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Maraqlı Məqalələr
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Sizə maraqlı gələ biləcək və ilhamlı edə biləcək ən son məqalələrimiz ilə tanış olun.
          </p>
          <Button className="mt-8 bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
            Bütün Məqalələr
          </Button>
        </div>
      </div>

      {/* Articles Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Mağazalarımız
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bizə tapınaq asandir. Şəhərin müxtəlif yerlərindən yazılışqın mağazalarımıza baş çəkin.
          </p>
        </div>

        {articles && articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              Hələ məqalə yoxdur
            </h3>
            <p className="text-gray-500">
              Yaxın zamanda maraqlı məqalələr əlavə ediləcək
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
