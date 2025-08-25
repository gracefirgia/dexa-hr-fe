import { Button, Divider, Grid, Modal, Stack, Text, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { ChevronsRight } from "lucide-react"
import moment from "moment"

const ModalFormEmployeeChangeRequest = ({opened, onClose, form, handleSubmit, isLoading = false }) => {
  const values = form.getValues()

  return (
    <Modal opened={opened} onClose={onClose} title={`CR: ${values?.code}`}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          <Text>Request Type: {values?.type}</Text>
          <Text>Request Date: {moment(values?.requested_at).format("DD MMM YYYY HH:mm:ss")}</Text>
          <Text>Request By: {values?.requested_by}</Text>
          <Text>Notes: {values?.notes}</Text>

          <Divider my="sm" variant="dashed" />
          <Text>Field Changes:</Text>
          <Text size="sm">Attendance Date: {values?.attendance_date}</Text>

          <Text size="xs">Clock In</Text>
          <Grid>
            <Grid.Col span={5}>
              <Text>{values?.clock_in ? moment(values?.clock_in).format("HH:mm:ss") : "-"}</Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <ChevronsRight />
            </Grid.Col>
            <Grid.Col span={5}>
              <Text>{values?.clock_in_to}</Text>
            </Grid.Col>
          </Grid>

          <Text size="xs">Clock Out</Text>
          <Grid>
            <Grid.Col span={5}>
              <Text>{values?.clock_out ? moment(values?.clock_out).format("HH:mm:ss") : "-"}</Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <ChevronsRight />
            </Grid.Col>
            <Grid.Col span={5}>
              <Text>{values?.clock_out_to}</Text>
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <Button
                variant="outline"
                type="submit"
                color="red"
                size="md"
                loading={isLoading}
                className="mt-2"
                fullWidth
              >
                REJECT
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                variant="outline"
                type="submit"
                color="green"
                size="md"
                loading={isLoading}
                className="mt-2"
                fullWidth
              >
                APPROVE
              </Button>
            </Grid.Col>
          </Grid>
        </Stack>
      </form>
    </Modal>
  )
}

export default ModalFormEmployeeChangeRequest