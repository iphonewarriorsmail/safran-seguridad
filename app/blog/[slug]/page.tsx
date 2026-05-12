import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { notFound } from "next/navigation";
import { categoryLabels, categoryColors } from "../../lib/blog-data";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";
import { Metadata } from "next";
import { createClient } from "../../utils/supabase/server";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: `${post.title} | Blog Safra Seguridad`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    author: {
      "@type": "Organization",
      name: "Safra Seguridad",
    },
    description: post.excerpt,
    datePublished: post.created_at,
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData).replace(/</g, '\\u003c') }}
          />

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al blog
          </Link>

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  categoryColors[post.category as keyof typeof categoryColors] || "bg-muted text-muted-foreground border-border"
                }`}
              >
                {categoryLabels[post.category as keyof typeof categoryLabels] || post.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-muted mb-8">{post.excerpt}</p>

            {post.image_url && (
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-border mb-12 shadow-2xl">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
              </div>
            )}
          </header>

          <div className="max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={{
                h1: ({ ...props }) => <h1 className="text-4xl md:text-5xl font-black mb-12 mt-20 text-foreground leading-tight" {...props} />,
                h2: ({ ...props }) => <h2 className="text-3xl font-black mb-8 mt-16 text-foreground border-b border-border/50 pb-4" {...props} />,
                h3: ({ ...props }) => <h3 className="text-2xl font-bold mb-6 mt-12 text-foreground" {...props} />,
                p: ({ ...props }) => <p className="text-lg md:text-xl text-muted/90 leading-[2] mb-12 text-justify" {...props} />,
                a: ({ ...props }) => (
                  <a 
                    className="text-accent underline underline-offset-8 decoration-accent/40 hover:decoration-accent font-black transition-all" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    {...props} 
                  />
                ),
                ul: ({ ...props }) => <ul className="list-disc pl-8 mb-12 space-y-4" {...props} />,
                ol: ({ ...props }) => <ol className="list-decimal pl-8 mb-12 space-y-4" {...props} />,
                li: ({ ...props }) => <li className="text-lg text-muted/90 leading-relaxed" {...props} />,
                blockquote: ({ ...props }) => (
                  <blockquote className="border-l-8 border-accent bg-surface/30 py-12 px-12 rounded-2xl italic mb-16 shadow-inner text-xl text-foreground/90 font-medium" {...props} />
                ),
                table: ({ ...props }) => (
                  <div className="my-20 overflow-x-auto rounded-3xl border-2 border-border/50 shadow-2xl bg-surface/20 backdrop-blur-sm">
                    <table className="w-full border-collapse min-w-[600px]" {...props} />
                  </div>
                ),
                thead: ({ ...props }) => <thead className="bg-accent/10" {...props} />,
                th: ({ ...props }) => <th className="p-6 text-left border border-border/50 font-black text-foreground text-sm uppercase tracking-wider" {...props} />,
                td: ({ ...props }) => <td className="p-6 border border-border/50 text-muted/90 text-lg leading-relaxed" {...props} />,
                hr: ({ ...props }) => <hr className="my-24 border-border/30" {...props} />,
                strong: ({ ...props }) => <strong className="font-bold text-foreground" {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

