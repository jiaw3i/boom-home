import {Helmet} from 'react-helmet';


export type BlogSEOProps = {
    title: string,
    description: string,
}

export type PageSEOProps = {
    title: string,
    description: string,
}

export function PageSEO(props: PageSEOProps) {
    const {title, description} = props;
    return (
        <>
            <Helmet>
                <title>{`${title} | Jackway`}</title>
                <meta name="description" content={description}/>
            </Helmet>
        </>
    )
}

export function BlogSEO(props: BlogSEOProps) {
    const {title, description} = props;
    return (
        <>
            <Helmet>
                <title>{`${title} | Jackway`}</title>
                <meta name="description" content={description}/>
            </Helmet>
        </>
    )
}

