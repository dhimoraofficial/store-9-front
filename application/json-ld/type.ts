export type Context = "https://schema.org";

export interface OrganizationSchema {
    "@context": Context;
    "@type": "Organization";
    name: string;
    url: string;
    logo?: {
        "@type": "ImageObject";
        url: string;
    };
}

export interface OfferSchema {
    "@type": "Offer";
    url: string;
    priceCurrency: string;
    price: string;
    availability: | "https://schema.org/InStock" | "https://schema.org/OutOfStock" | "https://schema.org/PreOrder";
    itemCondition?: | "https://schema.org/NewCondition" | "https://schema.org/UsedCondition";
    seller: {
        "@type": "Organization";
        name: string;
    };
}

export interface AggregateRatingSchema {
    "@type": "AggregateRating";
    ratingValue: string;
    reviewCount: string;
}

export interface ReviewSchema {
    "@type": "Review";
    author: {
        "@type": "Person";
        name: string;
    };
    reviewRating: {
        "@type": "Rating";
        ratingValue: string;
    };
    reviewBody: string;
}

export interface ProductSchema {
    "@context": Context;
    "@type": "Product";
    name: string;
    image: string[];
    description: string;
    sku?: string;
    brand?: {
        "@type": "Brand";
        name: string;
    };
    offers: OfferSchema | OfferSchema[];
    aggregateRating?: AggregateRatingSchema;
    review?: ReviewSchema[];
}

export interface BreadcrumbItem {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
}

export interface BreadcrumbSchema {
    "@context": Context;
    "@type": "BreadcrumbList";
    itemListElement: BreadcrumbItem[];
}

export interface FAQPageSchema {
    "@context": Context;
    "@type": "FAQPage";
    mainEntity: {
        "@type": "Question";
        name: string;
        acceptedAnswer: {
            "@type": "Answer";
            text: string;
        };
    }[];
}

export interface WebSiteSchema {
    "@context": Context;
    "@type": "WebSite";
    name: string;
    url: string;
    potentialAction?: {
        "@type": "SearchAction";
        target: string;
        "query-input": string;
    };
}