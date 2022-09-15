import { Card, Col, Row, Text } from "@nextui-org/react";

export function Comic ({ img, title, alt, day, month, year }) {
  return (
    <Card css={{ w: "200px", h: "200px" }} isHoverable variant="bordered">
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={img}
          width="100%"
          height="100%"
          objectFit="contain"
          alt={alt}
        />
      </Card.Body>
      <Card.Footer
        className='pt-1 pb-2'
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#000000b4",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text className='m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap' size={14} weight="medium" color="#ffffff">{title}</Text>
            <Text className='m-0' size={10} weight="normal" color="#ffffffa8">{day}/{month}/{year}</Text>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}