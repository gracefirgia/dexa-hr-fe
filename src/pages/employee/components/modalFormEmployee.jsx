import { Button, Grid, Modal, PasswordInput, Select, Stack, Switch, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"

const ModalFormEmployee = ({opened, onClose, form, handleSubmit, isLoading = false, datas = {}}) => {
  const isHasID = form.getValues().id
  const type = !isHasID ? "Create" : "Change"

  return (
    <Modal opened={opened} onClose={onClose} title={`${type} Employee`}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          <TextInput
            required
            label="Name"
            placeholder="Name"
            size="sm"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                required
                label="Email"
                placeholder="Email"
                size="sm"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                required
                label="Phone"
                placeholder="Phone"
                size="sm"
                key={form.key("phone")}
                {...form.getInputProps("phone")}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <Select
                required
                label="Department"
                placeholder="Pick value"
                data={mapLabelValueItems(datas?.departments)}
                key={form.key("department_id")}
                {...form.getInputProps("department_id")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                required
                label="Role"
                placeholder="Pick value"
                data={mapLabelValueItems(datas?.roles)}
                key={form.key("role_id")}
                {...form.getInputProps("role_id")}
              />
            </Grid.Col>
          </Grid>

          <PasswordInput
            label="Password"
            description="Default: Password123"
            placeholder="Password"
            visible={false}
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          <Grid>
            <Grid.Col span={6}>
              <DatePickerInput
                label="Join Date"
                allowDeselect
                key={form.key("join_date")}
                {...form.getInputProps("join_date")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DatePickerInput
                label="Terminate Date"
                allowDeselect
                key={form.key("terminate_date")}
                {...form.getInputProps("terminate_date")}
              />
            </Grid.Col>
          </Grid>

          <Switch
            size="md"
            {...form.getInputProps("active", { type: "checkbox" })}
          />

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

export default ModalFormEmployee

const mapLabelValueItems = (items = []) => items?.map((item) => {
  return {
    value: String(item.id),
    label: item.name
  }
})