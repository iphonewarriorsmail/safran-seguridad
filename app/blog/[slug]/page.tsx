import { notFound } from "next/navigation";
import { blogPosts, categoryLabels, categoryColors } from "../../lib/blog-data";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppButton from "../../components/WhatsAppButton";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

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
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    notFound();
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    author: {
      "@type": "Organization",
      name: "Safra Seguridad",
    },
    description: post.excerpt,
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          />

          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  categoryColors[post.category]
                }`}
              >
                {categoryLabels[post.category]}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-muted">{post.excerpt}</p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-accent hover:prose-a:text-accent/80">
            {post.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("**") && paragraph.includes("**")) {
                // simple markdown bold parsing for the text
                const boldMatch = paragraph.match(/\*\*(.*?)\*\*(.*)/);
                if (boldMatch) {
                  return (
                    <p key={i} className="text-muted leading-relaxed mb-6 whitespace-pre-line">
                      <strong className="text-foreground">{boldMatch[1]}</strong>
                      {boldMatch[2]}
                    </p>
                  );
                }
              }
              return (
                <p key={i} className="text-muted leading-relaxed mb-6 whitespace-pre-line">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
