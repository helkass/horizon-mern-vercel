import {Helmet} from "react-helmet-async";

const SeoHelmetComponent = ({ title, content, href }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={content}/>
            <link rel="canonical" href={href}/>
        </Helmet>
    )
}

export default SeoHelmetComponent;