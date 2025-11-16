import { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { loadBlock } from '@/utils/blockRegistry';
import Layout from '@/components/Layout';
import Layout2 from '@/components/Layout/Layout2';
import Layout3 from '@/components/Layout/Layout3';

const layoutComponents = {
  'Layout': Layout,
  'Layout2': Layout2,
  'Layout3': Layout3
};

export default function DynamicPage() {
  const { slug } = useParams();
  const { isAuthenticated, isAdmin, isSuperAdmin } = useAuth();
  const [page, setPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [loadedBlocks, setLoadedBlocks] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPageData();
  }, [slug]);

  const fetchPageData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch page
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (pageError) throw pageError;

      if (!pageData) {
        setError('404');
        return;
      }

      // Check if draft and user not authorized
      if (pageData.status === 'draft') {
        const canView = isAuthenticated && (isAdmin() || isSuperAdmin());
        if (!canView) {
          setError('404');
          return;
        }
      }

      // Check if archived
      if (pageData.status === 'archived') {
        setError('404');
        return;
      }

      setPage(pageData);

      // Fetch sections
      const { data: sectionsData, error: sectionsError } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_id', pageData.id)
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (sectionsError) throw sectionsError;

      setSections(sectionsData || []);

      // Load all block components
      if (sectionsData && sectionsData.length > 0) {
        const blockPromises = sectionsData.map(async (section) => {
          const Component = await loadBlock(section.block_type);
          return { id: section.id, Component };
        });

        const loadedComponents = await Promise.all(blockPromises);
        const blocksMap = {};
        loadedComponents.forEach(({ id, Component }) => {
          blocksMap[id] = Component;
        });

        setLoadedBlocks(blocksMap);
      }

    } catch (err) {
      console.error('Error fetching page:', err);
      setError('500');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="dynamic-page-loading">
        <div className="container">
          <div className="spinner-large"></div>
          <p>Loading page...</p>
        </div>
      </div>
    );
  }

  // Error states
  if (error === '404') {
    return <Navigate to="/error" replace />;
  }

  if (error === '500') {
    return (
      <div className="dynamic-page-error">
        <div className="container">
          <h2>Something went wrong</h2>
          <p>Unable to load this page. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Get layout component
  const LayoutComponent = layoutComponents[page.layout] || Layout;

  return (
    <>
      <Helmet>
        <title>{page.title} | Devmart</title>
        {page.meta_description && (
          <meta name="description" content={page.meta_description} />
        )}
        {page.meta_keywords && (
          <meta name="keywords" content={page.meta_keywords} />
        )}
        {page.seo_image && (
          <>
            <meta property="og:image" content={page.seo_image} />
            <meta property="og:title" content={page.title} />
            {page.meta_description && (
              <meta property="og:description" content={page.meta_description} />
            )}
          </>
        )}
        <link rel="canonical" href={`${window.location.origin}/${slug}`} />
      </Helmet>

      <LayoutComponent>
        {sections.length > 0 ? (
          <Suspense fallback={<div className="section-loading">Loading section...</div>}>
            {sections.map((section) => {
              const BlockComponent = loadedBlocks[section.id];
              
              if (!BlockComponent) {
                console.warn(`Component not loaded for section ${section.id}`);
                return null;
              }

              return (
                <BlockComponent
                  key={section.id}
                  {...section.block_props}
                />
              );
            })}
          </Suspense>
        ) : (
          <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
            <h2>No content available</h2>
            <p>This page doesn't have any content yet.</p>
          </div>
        )}

        {page.status === 'draft' && (isAdmin() || isSuperAdmin()) && (
          <div className="draft-indicator">
            <p>⚠️ This page is in DRAFT mode (only visible to admins)</p>
          </div>
        )}
      </LayoutComponent>
    </>
  );
}
