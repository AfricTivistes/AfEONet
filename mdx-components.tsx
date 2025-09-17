import type { MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from your UI library.

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    // Typography est gérée par MdxLayout - seuls les cas spéciaux sont personnalisés ici
    a: ({ href, children, ...props }) => {
      if (!href) {
        console.warn('Link missing href attribute');
        return <span className="text-secondary underline">{children}</span>;
      }
      const isExternal = href.startsWith('http') || href.startsWith('//');
      return (
        <Link 
          href={href} 
          className="text-secondary hover:text-secondary/80 underline transition-colors" 
          {...(isExternal ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
          {...props}
        >
          {children}
        </Link>
      );
    },
    blockquote: ({ children, ...props }) => (
      <blockquote 
        className="border-l-4 border-secondary pl-4 italic text-muted-foreground my-4 bg-secondary/5 py-2" 
        {...props}
      >
        {children}
      </blockquote>
    ),
    // Images natives pour éviter les problèmes avec Next/Image dans MDX
    img: ({ src, alt, ...props }) => (
      <img
        src={src}
        alt={alt || ''}
        className="rounded-lg shadow-sm my-4 max-w-full h-auto"
        {...props}
      />
    ),
    // Composants UI de base
    Button,
    Card,
    CardContent,
    CardHeader, 
    CardTitle,
    Badge,
    
    // Composants personnalisés pour MDX
    HeroSection: ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
      <section className={`bg-primary py-12 text-primary-foreground rounded-lg my-8 ${className}`}>
        <div className="container px-8">
          {children}
        </div>
      </section>
    ),
    
    DimensionGrid: ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 my-8 ${className}`}>
        {children}
      </div>
    ),
    
    DimensionCard: ({ children, title, className = "" }: { children: React.ReactNode; title?: string; className?: string }) => (
      <Card className={`bg-white dark:bg-slate-800 shadow-sm ${className}`}>
        <CardContent className="p-6">
          {title && <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>}
          {children}
        </CardContent>
      </Card>
    ),
    
    CallToAction: ({ children, href, variant = "default", className = "" }: { 
      children: React.ReactNode; 
      href?: string; 
      variant?: "default" | "secondary";
      className?: string;
    }) => (
      <div className={`bg-muted rounded-lg p-12 text-center my-8 ${className}`}>
        <div className="max-w-2xl mx-auto">
          {children}
          {href && (
            <Button 
              asChild 
              size="lg" 
              variant={variant}
              className="mt-8"
            >
              <Link href={href}>En savoir plus</Link>
            </Button>
          )}
        </div>
      </div>
    ),
    
    StatusGrid: ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 my-8 ${className}`}>
        {children}
      </div>
    ),
    
    StatusCard: ({ status, children }: { status: 'open' | 'narrowed' | 'obstructed' | 'repressed' | 'closed'; children: React.ReactNode }) => {
      const statusClasses = {
        open: 'bg-status-open text-white',
        narrowed: 'bg-status-narrowed text-black',
        obstructed: 'bg-status-obstructed text-white',
        repressed: 'bg-status-repressed text-white',
        closed: 'bg-status-closed text-white'
      };
      
      return (
        <div className={`p-4 rounded-md text-center ${statusClasses[status]}`}>
          {children}
        </div>
      );
    },
    
    PartnersGrid: ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 my-8 ${className}`}>
        {children}
      </div>
    ),
    
    PartnerCard: ({ children, icon, title }: { children: React.ReactNode; icon?: React.ReactNode; title?: string }) => (
      <Card className="bg-white dark:bg-slate-800 shadow-sm text-center">
        <CardContent className="p-6">
          {icon && (
            <div className="mx-auto p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              {icon}
            </div>
          )}
          {title && <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>}
          {children}
        </CardContent>
      </Card>
    ),
    
    StatsSection: ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8 ${className}`}>
        {children}
      </div>
    ),
    
    StatCard: ({ value, label, icon, color = "bg-accent-blue" }: { 
      value: string; 
      label: string; 
      icon?: React.ReactNode;
      color?: string;
    }) => (
      <Card className="text-center">
        <CardContent className="p-6">
          <div className={`mx-auto w-12 h-12 ${color} rounded-full flex items-center justify-center mb-4`}>
            {icon}
          </div>
          <div className="text-3xl font-bold text-primary mb-2">{value}</div>
          <div className="text-muted-foreground">{label}</div>
        </CardContent>
      </Card>
    ),

    ...components,
  }
}