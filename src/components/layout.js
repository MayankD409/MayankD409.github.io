// VISITED AND VERIFIED
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Loader, Nav, Social, Email, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';
import { Helmet } from 'react-helmet';

// https://medium.com/@chrisfitkin/how-to-smooth-scroll-links-in-gatsby-3dc445299558
if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]');
}

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children, location }) => {
  const isHome = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, [isLoading]);

  return (
    <>
      <Head />
      
      {/* Additional site-wide metadata */}
      <Helmet>
        <meta name="author" content="Mayank Deshpande" />
        <meta name="generator" content="Gatsby" />
        <meta property="og:site_name" content="Mayank Deshpande" />
        <link rel="author" href="https://mayankd.me" />
        <link rel="schema.dcterms" href="https://purl.org/dc/terms/" />
        <meta name="dcterms.creator" content="Mayank Deshpande" />
        <meta name="dcterms.title" content="Mayank Deshpande - Software Engineer" />
        <meta name="dcterms.subject" content="Robotics, Software Engineer, Computer Vision, AI, Mayank Deshpande Portfolio" />
        <meta name="dcterms.language" content="en" />
        <meta name="geo.region" content="US" />
      </Helmet>

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>

          {isLoading && isHome && <Loader finishLoading={() => setIsLoading(false)} />}

          {/*
            Rendered unconditionally so the static HTML actually contains the page.
            Gating this behind the loader meant public/index.html shipped nothing but
            the loader div, leaving the homepage with no crawlable body text.
            The key flip remounts the tree when the loader finishes, which replays the
            staggered entrance animations exactly as before.
          */}
          <StyledContent key={isLoading && isHome ? 'loading' : 'loaded'}>
            <Nav isHome={isHome} />
            <Social isHome={isHome} />
            <Email isHome={isHome} />

            <div id="content">
              {children}
              <Footer />
            </div>
          </StyledContent>
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
