import { Card, Grid, Text } from "@nextui-org/react"
import Image from 'next/image'

export function ComicResult({ img, alt, title, day, month, year }) {
  return (
    <Card>
      <Card.Header>
        <Image
          alt={alt}
          src={img}
          width={85}
          height={85}
          className="object-cover rounded-sm"
        />
        <Grid.Container css={{ pl: "$6" }} className='ml-2'>
          <Grid xs={16}>
            <Text className='mb-2 font-bold w-full overflow-hidden text-ellipsis whitespace-nowrap' h4 css={{ lineHeight: "$xs" }} color="primary">{title}</Text>
          </Grid>
          <Grid xs={16}>
            <Text className='text-xs' css={{ color: "$accents8" }}>{day}/{month}/{year}</Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
    </Card>
  )
}