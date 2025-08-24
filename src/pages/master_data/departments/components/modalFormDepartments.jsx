import { Button, Grid, Modal, Stack, Switch, TextInput } from "@mantine/core"

const ModalFormDepartments = ({opened, onClose, form, handleSubmit, type = "Create", isLoading = false}) => {
  return (
    <Modal opened={opened} onClose={onClose} title={`${type} Departments`}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          <Grid align="center">
            <Grid.Col span={8}>
              <TextInput
                label="Name"
                placeholder="Name"
                size="sm"
                key={form.key("name")}
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Switch 
                size="md"
                {...form.getInputProps("active", { type: "checkbox" })}
              />
            </Grid.Col>
          </Grid>

          <Button
            variant="filled"
            type="submit"
            color="#891405ff"
            size="md"
            loading={isLoading}
            className="mt-2"
          >
            SAVE
          </Button>
        </Stack>
      </form>
    </Modal>
  )
}

export default ModalFormDepartments