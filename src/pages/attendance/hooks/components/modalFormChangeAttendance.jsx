import { Button, Grid, Modal, Stack, Text, Textarea } from "@mantine/core"
import { TimePicker } from "@mantine/dates"
import moment from "moment"

const ModalFormChangeAttendance = ({opened, onClose, form, handleSubmit, isLoading = false}) => {
  const values = form?.getValues()

  return (
    <Modal opened={opened} onClose={onClose} title="Request Change Attendance">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          <Text>Date: {moment(values?.clock_in).format("DD MMM YYYY")}</Text>

          <Grid>
            <Grid.Col span={6}>
              <Text>Clock In: {moment(values?.clock_in).format("HH:mm:ss")}</Text>
              <TimePicker
                required
                withSeconds
                label="Clock In Request"             
                key={form.key("clock_in_to")}
                {...form.getInputProps("clock_in_to")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>Clock Out: {values?.clock_out ? moment(values?.clock_in).format("HH:mm:ss") : "-"}</Text>
              <TimePicker
                required
                withSeconds
                label="Clock Out Request"
                key={form.key("clock_out_to")}
                {...form.getInputProps("clock_out_to")}
              />
            </Grid.Col>
          </Grid>

          <Textarea
            required
            label="Request Notes"
            placeholder="Input Notes"
            key={form.key("notes")}
            {...form.getInputProps("notes")}
          />

          <Button
            variant="filled"
            type="submit"
            color="#891405ff"
            size="md"
            loading={isLoading}
            className="mt-2"
          >
            SEND REQUEST
          </Button>
        </Stack>
      </form>
    </Modal>
  )
}

export default ModalFormChangeAttendance