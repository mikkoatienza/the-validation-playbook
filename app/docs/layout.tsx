import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { ProgressProvider } from "@/lib/progress";
import { SidebarSeparator, SidebarItem } from "./sidebar-components";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ProgressProvider>
      <DocsLayout
        tree={source.getPageTree()}
        nav={{
          title: (
            <span className="font-semibold tracking-tight">
              The Validation Playbook
            </span>
          ),
        }}
        sidebar={{
          defaultOpenLevel: 1,
          components: {
            Separator: SidebarSeparator,
            Item: SidebarItem,
          },
        }}
      >
        {children}
      </DocsLayout>
    </ProgressProvider>
  );
}
