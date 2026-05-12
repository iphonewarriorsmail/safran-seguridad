import React from "react";
import { categoryLabels, categoryColors } from "../lib/blog-data";
import { Calendar, ArrowRight } from "lucide-react";
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
      className="group bg-surface border border-border rounded-2xl overflow-hidden card-glow cursor-pointer block"
    >
      <div className="p-6">
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
        <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h4>
        <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1 text-sm font-bold text-accent group-hover:gap-2 transition-all">
          Leer más <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

export default async function Blog() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  if (!posts || posts.length === 0) return null;

  return (
    <section id="blog" className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-accent border border-accent/30 bg-accent/10 mb-4">
            Blog
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Blog de Seguridad{" "}
            <span className="gradient-text">& Tecnología</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Artículos, guías y novedades del mundo de la seguridad electrónica
            para que tomes las mejores decisiones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-surface border border-border px-8 py-4 rounded-xl font-bold hover:bg-surface-hover transition-all card-glow"
          >
            Ver todos los artículos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

