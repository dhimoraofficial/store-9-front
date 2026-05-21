export * from './type';

import AButton from './Button';
import ABox from './Box';
import AText from './Text';
import AImage from './Image';
import AIcon from './Icon';
import AInput from './Input';
import ALink from './Link';
import ASearchQuery from './search/SearchQuery';
import { BaseTypes } from './type';

export const AppComponents: Record<BaseTypes, any> = {
    button: AButton,
    box: ABox,
    text: AText,
    image: AImage,
    icon: AIcon,
    input: AInput,
    link: ALink,

    // dynamic custom compoentns
    search_query: ASearchQuery
};
