import { Button, Divider, Grid, Modal, Stack, Text } from "@mantine/core"
import { ChevronsRight } from "lucide-react"
import moment from "moment"

const ModalFormEmployeeChangeRequest = ({opened, onClose, form, handleSubmit, isLoading = false }) => {
  const values = form.getValues()

  return (
    <Modal opened={opened} onClose={onClose} title={`CR: ${values?.code}`}>
      <form>
        <Stack>
          <Text>Request Type: {values?.type}</Text>
          <Text>Request Date: {moment(values?.requested_at).format("DD MMM YYYY HH:mm:ss")}</Text>
          <Text>Request By: {values?.requested_by}</Text>
          <Text>Notes: {values?.notes}</Text>

          <Divider my="sm" variant="dashed" />
          <Text>Field Changes:</Text>
          <Text size="sm">Attendance Date: {moment(values?.date).format("DD MMM YYYY")}</Text>

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
                color="red"
                size="md"
                loading={isLoading}
                className="mt-2"
                fullWidth
                onClick={() => handleSubmit({ ...values, status: "REJECTED" })}
                disabled={values?.status !== "PENDING"}
              >
                REJECT
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                variant="outline"
                color="green"
                size="md"
                loading={isLoading}
                className="mt-2"
                fullWidth
                onClick={() => handleSubmit({ ...values, status: "APPROVED" })}
                disabled={values?.status !== "PENDING"}
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