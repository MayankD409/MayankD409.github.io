const config = require('./src/config');

module.exports = {
  siteMetadata: {
    title: 'Mayank Deshpande',
    description:
      'Mayank Deshpande is a Robotics Software Engineer with expertise in Computer Vision, Perception and AI. Specializing in autonomous systems, robotics software development, and advanced perception algorithms.',
    siteUrl: 'https://mayankd.me', // No trailing slash allowed!
    image: '/og.png', // Path to your image you placed in the 'static' folder
    twitterUsername: '@Mayank_D04',
    keywords: 'Mayank Deshpande, robotics, software engineer, computer vision, perception, AI, autonomous systems, robotics software developer, machine learning engineer, portfolio',
    author: 'Mayank Deshpande',
    lang: 'en',
    headline: 'Robotics Software Engineer specializing in Computer Vision and AI',
    github: 'https://github.com/MayankD409',
    linkedin: 'https://www.linkedin.com/in/msdeshpande04/',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: ({site}) => site.siteMetadata.siteUrl,
        resolvePages: ({allSitePage: {nodes: allPages}}) => {
          return allPages.map(page => {
            return {
              ...page,
              // Add priority and changefreq for important pages
              priority: page.path === '/' ? 1.0 : 
                      (page.path.includes('/projects/') || page.path.includes('/blog/')) ? 0.8 : 0.5,
              changefreq: page.path === '/' ? 'weekly' : 
                      (page.path.includes('/projects/') || page.path.includes('/blog/')) ? 'monthly' : 'yearly'
            }
          })
        },
        serialize: ({path, priority, changefreq}) => {
          return {
            url: path,
            priority,
            changefreq,
          }
        },
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://mayankd.me',
        sitemap: 'https://mayankd.me/sitemap/sitemap-index.xml',
        policy: [
          { userAgent: '*', allow: '/' },
          { userAgent: '*', disallow: ['/404'] }
        ],
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [
              { userAgent: '*', allow: '/' },
              { userAgent: '*', disallow: ['/404'] }
            ],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Mayank Deshpande - Robotics Software Engineer', 
        short_name: 'MayankD',
        start_url: '/',
        background_color: config.colors.darkNavy,
        theme_color: config.colors.navy,
        display: 'standalone',
        icon: 'src/images/Fistbump.png',
        crossOrigin: `use-credentials`,
        description: 'Mayank Deshpande is a Robotics Software Engineer with expertise in Computer Vision, Perception and AI.',
        lang: 'en',
        categories: ['portfolio', 'technology', 'engineering', 'robotics'],
        shortcuts: [
          {
            name: 'About',
            url: '/#about',
            description: 'Learn more about Mayank Deshpande'
          },
          {
            name: 'Projects',
            url: '/#projects',
            description: 'View Mayank\'s projects'
          },
          {
            name: 'Contact',
            url: '/#contact',
            description: 'Get in touch with Mayank'
          }
        ],
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-external-links
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-images
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 700,
              linkImagesToOriginal: true,
              quality: 90,
              tracedSVG: { color: config.colors.green },
            },
          },
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-code-titles/
            resolve: 'gatsby-remark-code-titles',
          }, // IMPORTANT: this must be ahead of other plugins that use code blocks
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-prismjs
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You need to specify the GA measurement ID from your Google Analytics setup
        trackingIds: [
          'G-19HH1VFS32', // Replace with your Google Analytics measurement ID
        ],
        // This object gets passed directly to the gtag config command
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
          send_page_view: true,
          optimization_id: '',
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
        },
      },
    },
  ],
};
