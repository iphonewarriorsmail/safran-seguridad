import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { categoryLabels, categoryColors } from "../lib/blog-data";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "../utils/supabase/server";

async function BlogCard({ post }: { post: any }) {
  const formattedDate = new Date(post.created_at).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-surface border border-border rounded-2xl overflow-hidden card-glow cursor-pointer block h-full flex flex-col"
    >
      {post.image_url ? (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
        </div>
      ) : (
        <div className="h-48 w-full bg-muted/30 flex items-center justify-center">
          <div className="text-muted-foreground/20 font-black text-4xl select-none">SAFRA</div>
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border ${
              categoryColors[post.category as keyof typeof categoryColors] || "bg-muted text-muted-foreground border-border"
            }`}
          >
            {categoryLabels[post.category as keyof typeof categoryLabels] || post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted">
            <Calendar className="w-3 h-3" />
            {formattedDate}
          </span>
        </div>
        <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h4>
        <p className="text-sm text-muted leading-relaxed mb-6 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-bold text-accent group-hover:gap-2 transition-all mt-auto">
          Leer más <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

export default async function BlogListPage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Volver al inicio
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6">
              Nuestro <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-muted max-w-3xl leading-relaxed">
              Explorá todos nuestros artículos sobre seguridad electrónica, 
              consejos prácticos y las últimas tendencias tecnológicas.
            </p>
          </div>

          {/* Grid */}
          {error ? (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-6 rounded-2xl text-center">
              Hubo un error al cargar los artículos. Por favor, reintentá más tarde.
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface border border-border rounded-3xl">
              <p className="text-muted text-lg">Aún no hay artículos publicados.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
