// schema.builder.ts

import {
    OrganizationSchema,
    ProductSchema,
    OfferSchema,
    BreadcrumbSchema,
    WebSiteSchema,
    ReviewSchema,
    AggregateRatingSchema,
    FAQPageSchema
} from "./type";

export class JsonLDBuilder {
    static organization(params: {
        name: string;
        url: string;
        logo?: string;
    }): OrganizationSchema {
        return {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: params.name,
            url: params.url,
            logo: params.logo ? { "@type": "ImageObject", url: params.logo } : undefined
        };
    }

    static offer(params: {
        url: string;
        price: number;
        currency: string;
        availability: OfferSchema["availability"];
        sellerName: string;
    }): OfferSchema {
        return {
            "@type": "Offer",
            url: params.url,
            priceCurrency: params.currency,
            price: Number(params?.price)?.toFixed(2),
            availability: params.availability,
            seller: {
                "@type": "Organization",
                name: params.sellerName
            }
        };
    }

    static aggregateRating(params: {
        ratingValue: number;
        reviewCount: number;
    }): AggregateRatingSchema {
        return {
            "@type": "AggregateRating",
            ratingValue: params.ratingValue.toString(),
            reviewCount: params.reviewCount.toString()
        };
    }

    static review(params: {
        authorName: string;
        ratingValue: number;
        reviewBody: string;
    }): ReviewSchema {
        return {
            "@type": "Review",
            author: {
                "@type": "Person",
                name: params.authorName
            },
            reviewRating: {
                "@type": "Rating",
                ratingValue: params.ratingValue.toString()
            },
            reviewBody: params.reviewBody
        };
    }

    static product(params: {
        name: string;
        images: string[];
        description: string;
        sku?: string;
        brandName?: string;
        offers: OfferSchema | OfferSchema[];
        aggregateRating?: AggregateRatingSchema;
        reviews?: ReviewSchema[];
    }): ProductSchema {
        return {
            "@context": "https://schema.org",
            "@type": "Product",
            name: params.name,
            image: params.images,
            description: params.description,
            sku: params.sku,
            brand: params.brandName
                ? { "@type": "Brand", name: params.brandName }
                : undefined,
            offers: params.offers,
            aggregateRating: params.aggregateRating,
            review: params.reviews
        };
    }

    static breadcrumb(items: { name: string; url: string }[]): BreadcrumbSchema {
        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                item: item.url
            }))
        };
    }

    static website(params: {
        name: string;
        url: string;
        searchUrl?: string;
    }): WebSiteSchema {
        return {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: params.name,
            url: params.url,
            potentialAction: params.searchUrl
                ? {
                    "@type": "SearchAction",
                    target: `${params.searchUrl}?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
                : undefined
        };
    }

    static faqPage(faqs: { question: string; answer: string }[]): FAQPageSchema {
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(faq => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer
                }
            }))
        };
    }
}