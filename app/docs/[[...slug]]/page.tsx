import { source } from "@/lib/source";
import { getStageInfo } from "@/lib/page-utils";
import { getEnhancedMDXComponents } from "@/components/mdx-enhanced";
import { ScrollProgress, PageMeta } from "@/components/docs-components";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

function getNeighbours(slug?: string[]) {
  const pages = source.getPages();
  const currentPath = slug ? `/docs/${slug.join("/")}` : "/docs";
  const idx = pages.findIndex((p) => p.url === currentPath);

  return {
    prev: idx > 0 ? pages[idx - 1] : null,
    next: idx < pages.length - 1 ? pages[idx + 1] : null,
  };
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const stageInfo = getStageInfo(params.slug);
  const tocCount = page.data.toc?.length || 0;
  const readTimeDisplay = Math.max(3, Math.round(tocCount * 0.8));
  const neighbours = getNeighbours(params.slug);

  const accentColor = stageInfo
    ? `hsl(${stageInfo.stageColor})`
    : "hsl(var(--accent-warm))";

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} footer={{ enabled: false }}>
      {stageInfo && <ScrollProgress color={accentColor} />}

      <div
        className="docs-page-header"
        style={
          stageInfo
            ? ({
                "--stage-accent-color": accentColor,
                borderLeftColor: accentColor,
              } as React.CSSProperties)
            : undefined
        }
      >
        <DocsTitle>
          <span className="docs-title">{page.data.title}</span>
        </DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
      </div>

      {stageInfo && (
        <PageMeta
          label={stageInfo.pageLabel}
          readTime={readTimeDisplay}
          progress={stageInfo.globalModuleNumber}
          totalSteps={stageInfo.totalModules}
          color={accentColor}
        />
      )}

      <DocsBody>
        <MDX components={getEnhancedMDXComponents()} />
      </DocsBody>

      {/* Enhanced bottom navigation */}
      <nav className="mt-12 grid gap-4 border-t border-fd-border pt-8 sm:grid-cols-2">
        {neighbours.prev ? (
          <Link
            href={neighbours.prev.url}
            className="group flex flex-col rounded-xl border border-fd-border p-4 transition-all hover:-translate-y-0.5 hover:border-fd-foreground/20 hover:shadow-sm"
          >
            <span className="text-xs text-fd-muted-foreground">Previous</span>
            <span className="mt-1 text-sm font-semibold group-hover:text-fd-foreground">
              {neighbours.prev.data.title}
            </span>
            {neighbours.prev.data.description && (
              <span className="mt-1 line-clamp-2 text-xs text-fd-muted-foreground">
                {neighbours.prev.data.description}
              </span>
            )}
          </Link>
        ) : (
          <div />
        )}
        {neighbours.next && (
          <Link
            href={neighbours.next.url}
            className="group flex flex-col rounded-xl border p-4 text-right transition-all hover:-translate-y-0.5 hover:shadow-sm"
            style={{
              borderColor: stageInfo
                ? `${accentColor.replace(")", " / 0.3)")}`
                : undefined,
            }}
          >
            <span className="text-xs text-fd-muted-foreground">Next</span>
            <span
              className="mt-1 text-sm font-semibold"
              style={stageInfo ? { color: accentColor } : undefined}
            >
              {neighbours.next.data.title}
            </span>
            {neighbours.next.data.description && (
              <span className="mt-1 line-clamp-2 text-xs text-fd-muted-foreground">
                {neighbours.next.data.description}
              </span>
            )}
          </Link>
        )}
      </nav>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
