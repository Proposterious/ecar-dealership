import Image from 'next/image'
import car from '../../../public/car-logo.png'

interface Props {
    w: any
    h: any
    o: any
    s: any
}

const Logo: React.FC<Props> = ({w, h, o, s}) => {
    if (w || h === 'none') {
        return ( 
            <>
                <Image src={car}
                objectFit={o}
                style={s}
                alt={'default logo'} />
            </>
         );
    }
    else {
        return (
            <>
                <Image src={car}
                width={w} height={h}
                alt={'default logo'} />
            </>
        )
    }
}

export default Logo;