import { Flex, Badge, Button, Group, Text } from "@mantine/core";
import Cards from "../../components/card";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Cards>
      <Group justify="space-between" mt="md" mb="xs">
        <Flex direction="column">
          <p className="text-lg font-semibold">Good morning, John!</p>
          <Text size="sm" c="dimmed">
            It's {formatDate(time)}
          </Text>
        </Flex>
        <Badge color="pink" size="lg">{formatTime(time)}</Badge>
      </Group>


      <Button color="blue" fullWidth mt="md" radius="md">
        Clock In
      </Button>
    </Cards>
  )
}

export default DashboardPage;

const formatTime = (date) => date.toLocaleTimeString("en-US", {
  hour12: false,
  timeZone: "Asia/Jakarta",
});

const formatDate = (date) => date.toLocaleDateString("en-US", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  timeZone: "Asia/Jakarta",
});