import bannerStyle from "./banner.module.css"

export default function Banner() {
    return (
        <figure className={bannerStyle.container}>
            {/*<img*/}
            {/*    className={bannerStyle.picture}*/}
            {/*    src={splash}*/}
            {/*    alt="Текс акции"*/}
            {/*/>*/}
            <figcaption className={bannerStyle.caption}>
                Текст акции
            </figcaption>
        </figure>
    )
}