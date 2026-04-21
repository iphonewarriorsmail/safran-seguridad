"use client";
import React, { useState } from "react";
import { blogPosts, categoryLabels, categoryColors } from "../lib/blog-data";
import type { BlogPost } from "../lib/blog-data";
import { Calendar, ArrowRight, X } from "lucide-react";

function BlogCard({ post, onOpen }: { post: BlogPost; onOpen: (p: BlogPost) => void }) {
  return (
    <div
      className="group bg-surface border border-border rounded-2xl overflow-hidden card-glow cursor-pointer"
      onClick={() => onOpen(post)}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border ${
              categoryColors[post.category]
            }`}
          >
            {categoryLabels[post.category]}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted">
            <Calendar className="w-3 h-3" />
            {post.date}
          </span>
        </div>
        <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
          {post.title}
        </h4>
        <p className="text-sm text-muted leading-relaxed mb-4">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1 text-sm font-bold text-accent group-hover:gap-2 transition-all">
          Leer más <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}

function BlogModal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up"
      onClick={onClose}
      style={{ animationDuration: "0.2s" }}
    >
      <div
        className="bg-surface border border-border rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-surface-hover border border-border hover:border-accent transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 text-muted" />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border ${
              categoryColors[post.category]
            }`}
          >
            {categoryLabels[post.category]}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted">
            <Calendar className="w-3 h-3" />
            {post.date}
          </span>
        </div>
        <h2 className="text-2xl font-black text-foreground mb-6">{post.title}</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-muted leading-relaxed mb-4 whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} onOpen={setActivePost} />
            ))}
          </div>
        </div>
      </section>

      {activePost && (
        <BlogModal post={activePost} onClose={() => setActivePost(null)} />
      )}
    </>
  );
}
