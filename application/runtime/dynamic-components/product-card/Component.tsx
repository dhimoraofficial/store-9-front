"use client";

import { Badge, Card, Flex, Heading, Inset, Link as RadixLink, Text } from "@radix-ui/themes";
import Link from "next/link";
import { BiStar } from "react-icons/bi";

import { AppSlugs } from "@/app";
import { formatPrice } from "@/application/utility";
import Image from "next/image";
import { AppProductCard } from "./type";

export function ProductCardSkeleton() {
  return (
    <Card 
      variant="surface"
      style={{
        flexShrink: 0,
        minWidth: "260px",
        maxWidth: "340px",
      }}
    >
      <article className="animate-pulse flex flex-col gap-3">
        <Inset clip="border-box" side="top" pb="current" style={{ position: "relative", overflow: "hidden" }}>
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-800" />
        </Inset>
        <Flex direction="column" gap="2" pt="3">
          <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" style={{ height: "24px" }} />
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" style={{ height: "16px" }} />
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" style={{ height: "16px" }} />
          <Flex justify="between" align="center" mt="auto" pt="2">
            <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-800 rounded" style={{ height: "24px", width: "60px" }} />
            <div className="h-4 w-1/12 bg-gray-200 dark:bg-gray-800 rounded" style={{ height: "16px", width: "20px" }} />
          </Flex>
        </Flex>
      </article>
    </Card>
  );
}

export default function ProductCardAppDisplay(appProductCard: AppProductCard) {
  const cardData = appProductCard?.cardData ?? appProductCard;

  if (!cardData || (!cardData.id && !cardData.title_name)) {
    return <ProductCardSkeleton />;
  }

  const toNumber = (value: string | number | undefined | null) => {
    if (value === undefined || value === null || value === "") return null;
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
  };

  const productID = cardData?.id;
  const imageURL = cardData?.img_src || "/icon.png";
  const imageALT = cardData?.img_alt ?? cardData?.title_name ?? "Product image";
  const title = cardData?.title_name ?? "Untitled product";
  const productURL = productID ? `${AppSlugs.product}/${productID}` : "#";
  const desc = cardData?.shortDesc;
  const averageRating = cardData?.averageRating ?? 0;

  const badges = typeof cardData?.badges === "string" ? [cardData.badges] : cardData?.badges ?? [];
  const rawHighlights = cardData?.highlights;
  const highlights = Array.isArray(rawHighlights) ? rawHighlights : rawHighlights ? Object.values(rawHighlights) : [];

  const priceCurrency = cardData?.currency ?? "NPR";
  const basePrice = toNumber(cardData?.price);
  const discountedPrice = toNumber(cardData?.discountPrice);
  const hasDiscount = discountedPrice !== null;
  const displayNumericPrice = hasDiscount ? discountedPrice : basePrice;
  const displayPrice = displayNumericPrice !== null ? formatPrice(displayNumericPrice, priceCurrency) : "";
  const productPrice = basePrice !== null ? formatPrice(basePrice, priceCurrency) : "";

  return (
    <Card 
      asChild 
      variant="surface"
      style={{
        ...appProductCard?.style,
        flexShrink: 0,
        minWidth: "260px",
        maxWidth: "340px",
      }}
    >
      <article className="group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
        
        {/* Media Block Layout Area */}
        <Inset clip="border-box" side="top" pb="current" style={{ position: "relative", overflow: "hidden" }}>
          <Link href={productURL} aria-label={title} className="block overflow-hidden">
            <img
              src={imageURL}
              alt={imageALT}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-102"
            />
          </Link>

          {!!badges.length && (
            <Flex
              gap="1"
              style={{
                position: "absolute",
                bottom: "var(--space-2)",
                left: "var(--space-2)",
                zIndex: 2,
              }}
            >
              {badges.slice(0, 1).map((badge: string, idx: number) => (
                <Badge key={idx} variant="solid" size="1" style={{ backgroundColor: "var(--accent)", color: "var(--text-inverted)" }}>
                  {badge}
                </Badge>
              ))}
            </Flex>
          )}
        </Inset>

        {/* Informational Presentation Context */}
        <Flex direction="column" gap="2" pt="3">
          <RadixLink asChild color="gray" highContrast>
            <Link href={productURL}>
              <Heading as="h3" size="3" weight="bold" className="line-clamp-2 min-h-[2.5rem]">
                {title}
              </Heading>
            </Link>
          </RadixLink>

          {desc && (
            <Text as="p" size="1" color="gray" className="line-clamp-2 min-h-[2rem]">
              {desc}
            </Text>
          )}

          {/* Descriptive Attributes / Spec List */}
          {!!highlights.length && (
            <Flex direction="column" gap="1" my="1">
              {highlights.slice(0, 2).map((item: string, idx: number) => (
                <Text key={`${item}-${idx}`} as="p" size="1" color="gray" className="line-clamp-1">
                  • {item}
                </Text>
              ))}
            </Flex>
          )}

          {/* Pricing Matrices & Metadata Row */}
          <Flex justify="between" align="center" mt="auto" pt="2">
            <Flex align="baseline" gap="1">
              {displayPrice ? (
                <>
                  <Text size="3" weight="bold" style={{ color: "var(--accent)" }}>
                    {displayPrice}
                  </Text>
                  {hasDiscount && productPrice && (
                    <Text size="1" color="gray" className="line-through">
                      {productPrice}
                    </Text>
                  )}
                </>
              ) : (
                <Text size="2" color="gray" weight="medium">
                  N/A
                </Text>
              )}
            </Flex>

            <Flex align="center" gap="1">
              <Text size="1" weight="bold">
                {averageRating}
              </Text>
              <BiStar size={12} className="text-yellow-500" />
            </Flex>
          </Flex>
        </Flex>
      </article>
    </Card>
  );
}