import { Card } from "@mantine/core"

const Cards = (props) => {
  const { children } = props
  
  return <Card {...props} shadow="sm" padding="lg" radius="md" withBorder>
    {children}
  </Card>
}

export default Cards