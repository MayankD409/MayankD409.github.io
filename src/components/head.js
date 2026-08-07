// VISITED AND VERIFIED
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

// https://www.gatsbyjs.com/docs/add-seo-component/

const Head = ({ title, description, image, keywords }) => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            defaultImage: image
            twitterUsername
          }
        }
      }
    `,
  );

  const { defaultTitle, defaultDescription, siteUrl, defaultImage, twitterUsername } =
    site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
    keywords:
      keywords ||
      'Mayank Deshpande, computer vision, AI, robotics, software developer, autonomous systems',
  };

  // Schema.org structured data for a person
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mayank Deshpande',
    url: siteUrl,
    image: `${siteUrl}${defaultImage}`,
    jobTitle: 'Robotics Perception Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Contoro Robotics',
      url: 'https://contoro.com/',
    },
    description: defaultDescription,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Maryland, College Park',
    },
    knowsAbout: [
      'Robotics',
      'Computer Vision',
      '3D Perception',
      'Sensor Fusion',
      'Deep Learning',
      'Multimodal AI',
      'Embodied AI',
      'Python',
      'C++',
    ],
    sameAs: [
      `https://twitter.com/${twitterUsername.replace('@', '')}`,
      'https://github.com/MayankD409',
      'https://www.linkedin.com/in/msdeshpande04/',
      'https://medium.com/@deshpandemayank5',
    ],
  };

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${defaultTitle}`}>
      <html lang="en" />

      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content="Mayank Deshpande" />

      {/* Canonical URL to avoid duplicate content issues */}
      <link rel="canonical" href={seo.url} />

      {/* OpenGraph tags */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Mayank Deshpande" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Google verification */}
      <meta name="google-site-verification" content="DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk" />

      {/* Additional meta tags */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Schema.org structured data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  keywords: PropTypes.string,
};

Head.defaultProps = {
  title: null,
  description: null,
  image: null,
  keywords: null,
};
