import { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { loadBlock } from '@/utils/blockRegistry';
import Spacing from '@/components/Spacing';
import { seedHomepageSpacing } from '@/utils/seedSpacing';

export default function DynamicPage() {
  const { slug } = useParams();
  const { isAuthenticated, isAdmin, isSuperAdmin } = useAuth();
  const [page, setPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [loadedBlocks, setLoadedBlocks] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPageData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Use 'home' slug for root route
      const pageSlug = slug || 'home';

      // Fetch page
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', pageSlug)
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
  }, [slug, isAuthenticated, isAdmin, isSuperAdmin]);

  useEffect(() => {
    fetchPageData();
    
    // One-time spacing seed - run once then remove this block
    if (slug === undefined || slug === 'home') {
      seedHomepageSpacing().catch(console.error);
    }
  }, [fetchPageData, slug]);

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

      {sections.length > 0 ? (
        <Suspense fallback={<div className="section-loading">Loading section...</div>}>
          {sections.map((section, index) => {
            const BlockComponent = loadedBlocks[section.id];
            
            if (!BlockComponent) {
              console.warn(`Component not loaded for section ${section.id}`);
              return null;
            }

            const needsSpacing = section.spacing_after_lg > 0 || section.spacing_after_md > 0;
            
            // Special handling for CTA block - needs container wrapper
            const isCTABlock = section.block_type === 'CTA1_ImageBackground';
            
            // Render block with optional container
            let blockContent;
            if (isCTABlock) {
              blockContent = (
                <section>
                  <div className="container">
                    <BlockComponent {...section.block_props} />
                  </div>
                </section>
              );
            } else if (section.has_container) {
              blockContent = (
                <div className="container">
                  <BlockComponent {...section.block_props} />
                </div>
              );
            } else {
              blockContent = <BlockComponent {...section.block_props} />;
            }

            // Wrap in section tag if wrapper class exists (but not for CTA which already has section)
            const wrappedContent = section.section_wrapper_class && !isCTABlock ? (
              <section className={section.section_wrapper_class}>
                {blockContent}
              </section>
            ) : (
              blockContent
            );

            return (
              <div key={section.id}>
                {wrappedContent}
                {needsSpacing && (
                  <Spacing 
                    lg={section.spacing_after_lg} 
                    md={section.spacing_after_md} 
                  />
                )}
              </div>
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
    </>
  );
}
