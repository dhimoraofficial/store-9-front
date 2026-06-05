import React from 'react';
import { Container } from '@radix-ui/themes';

type ContainerSize = '1' | '2' | '3' | '4';

export default function SimpleContainerComponent({
    size = '3',
}: {
    size?: ContainerSize;
}) {
    return (
        <Container size={size}>
            {/* Component content renders here */}
        </Container>
    );
}