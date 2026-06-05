"use client";

import { Box, Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import HorizontalScrollTrack from "./HorizontalScrollTrack";
import ScrollButtons from "./ScrollButtons";
import { getProductsForContainer } from "./data";
import ProductCardAppDisplay, { ProductCardSkeleton } from "../../product-card/Component";

export interface UnifiedContainerProps {
    containerName?: string;
    shortSubtitle?: string;
    children?: React.ReactNode;
    filterSection?: React.ReactNode;
    viewAllHref?: string;

    layoutType?: "grid" | "horizontal";
    size?: "1" | "2" | "3" | "4";
    headerAlignment?: "start" | "center" | "between";

    // Editor and style props
    fetchData?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
}

export default function UnifiedCardContainer({
    containerName,
    shortSubtitle,
    children,
    filterSection,
    viewAllHref,
    fetchData,
    layoutType = "grid",
    size = "4",
    headerAlignment = "between",
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
}: UnifiedContainerProps) {
    const tenantInfo = useSelector((state: any) => state.editor?.tenantInfo);
    const tenant = tenantInfo?.tenant || "";
    const store = tenantInfo?.store || "";

    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!fetchData) {
            setProducts([]);
            return;
        }

        let isMounted = true;
        setIsLoading(true);

        getProductsForContainer(fetchData, {
            tenant,
            store,
        })
            .then((data) => {
                if (isMounted) {
                    setProducts(data || []);
                }
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [fetchData, tenant, store]);

    console.log(products);
    

    const flexJustify = headerAlignment === "between" ? "between" : headerAlignment;
    const hasProducts = products && products.length > 0;
    const hasChildren = children !== undefined && children !== null && React.Children.count(children) > 0;
    const hasItems = isLoading || hasProducts || hasChildren;

    // Render loading skeletons, fetched products, or static editor children
    const renderedItems = isLoading ? (
        Array.from({ length: 4 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
        ))
    ) : hasProducts ? (
        products.map((prod) => (
            <ProductCardAppDisplay key={prod.id} {...prod} />
        ))
    ) : (
        children
    );

    return (
        <Box
            asChild
            py={{ initial: "4", md: "5" }}
            my="2"
            style={style}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <section className="__app_unified_container">
                <Container size={size}>

                    {/* Header block */}
                    {(containerName || shortSubtitle || filterSection || layoutType === "horizontal") && (
                        <Flex justify={flexJustify} align="end" mb="4" width="100%">
                            <Box>
                                {containerName && (
                                    <Heading as="h2" size={{ initial: "4", md: "5" }} weight="bold" highContrast>
                                        {containerName}
                                    </Heading>
                                )}
                                {shortSubtitle && (
                                    <Text as="p" size="2" color="gray" mt="1">
                                        {shortSubtitle}
                                    </Text>
                                )}
                            </Box>

                            <Flex align="center" gap="3">
                                {filterSection && <Box>{filterSection}</Box>}

                                {/* Client buttons only load under horizontal types */}
                                {layoutType === "horizontal" && hasItems && <ScrollButtons />}
                            </Flex>
                        </Flex>
                    )}

                    {/* Core Content Presenter Grid/Scroll Router */}
                    {hasItems ? (
                        layoutType === "grid" ? (
                            <Grid columns={{ initial: "1", sm: "2", md: "3", lg: "4" }} gap="4" py="2" width="100%">
                                {renderedItems}
                            </Grid>
                        ) : (
                            // Mounting the interactive client container node
                            <HorizontalScrollTrack>
                                {renderedItems}

                                {/* Static anchor link nested inside client flex boundary */}
                                {viewAllHref && (
                                    <Box asChild px="4" py="6" style={{ flexShrink: 0 }}>
                                        <Link
                                            href={viewAllHref}
                                            className="flex flex-col items-center justify-center min-w-[120px] group"
                                            aria-label={`View all content within ${containerName || "this shelf"}`}
                                        >
                                            <Box style={{ background: "var(--gray-3)", padding: "var(--space-3)", borderRadius: "var(--radius-full)" }} className="transition-transform group-hover:scale-110">
                                                <MoveRight size={20} />
                                            </Box>
                                            <Text size="1" weight="medium" mt="2" className="underline" color="gray" highContrast>
                                                View all
                                            </Text>
                                        </Link>
                                    </Box>
                                )}
                            </HorizontalScrollTrack>
                        )
                    ) : (
                        <Flex
                            align="center"
                            justify="center"
                            height="200px"
                            style={{ border: "1px dashed var(--gray-7)", borderRadius: "var(--radius-4)" }}
                        >
                            <Text size="2" color="gray">No items to display, try adjusting your filters!!!</Text>
                        </Flex>
                    )}

                </Container>
            </section>
        </Box>
    );
}