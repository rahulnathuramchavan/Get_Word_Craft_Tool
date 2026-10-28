import React from 'react';
import { Helmet } from 'react-helmet';

// Social + canonical tags only. The page's own <Helmet> must keep a literal
// <title> and <meta name="description">, because the llms.txt build step reads
// those two tags straight out of the page file's source.
// Default Open Graph image URL and metadata.
const DEFAULT_OG_IMAGE = 'https://getwordcraft.com/og-image.png';
const DEFAULT_OG_IMAGE_ALT = 'WordCraft Tool — Find Better Words, Solve Puzzles Faster';

const Seo = ({
    title,
    description,
    image = DEFAULT_OG_IMAGE,
    imageAlt = DEFAULT_OG_IMAGE_ALT,
    url,
    siteName,
    type = 'website',
}) => {
    const canonical = url || (typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://getwordcraft.com');

    return (
        <Helmet>
            <meta property="og:url" content={canonical} />
            <meta property="og:type" content={type} />
            {siteName && <meta property="og:site_name" content={siteName} />}
            {title && <meta property="og:title" content={title} />}
            {description && <meta property="og:description" content={description} />}
            {image && <meta property="og:image" content={image} />}
            {image && <meta property="og:image:width" content="1200" />}
            {image && <meta property="og:image:height" content="630" />}
            {image && <meta property="og:image:alt" content={imageAlt} />}
            <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
            {title && <meta name="twitter:title" content={title} />}
            {description && <meta name="twitter:description" content={description} />}
            {image && <meta name="twitter:image" content={image} />}
            {image && <meta name="twitter:image:alt" content={imageAlt} />}
        </Helmet>
    );
};

export default Seo;

export { Seo };
