import { Button, Grid, TextInput } from "@mantine/core"
import { useState } from "react";

const UserInfoProfile = (props) => {
  const {
    form,
    handleSubmitPress
  } = props

  const [isRequestChange, setIsRequestChange] = useState(false);

  const handleChangePress = () => {
    setIsRequestChange((prevState) => !prevState);
  };

  return (
    <>
      {!isRequestChange &&
        <Button
          onClick={() => handleChangePress()}
        >
          Change
        </Button>
      }

      <form onSubmit={form.onSubmit((values) => handleSubmitPress(values))}>
        <div className="mt-3">
          <TextInput
            className="mb-2"
            label="Fullname"
            description={isRequestChange && "Contact HR teams to change fullname."}
            disabled
            key={form.key("name")}
            {...form.getInputProps("name")}
          />

          <TextInput
            className="mb-2"
            label="Email"
            description={isRequestChange && "Contact HR teams to change email."}
            disabled
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          <TextInput
            className="mb-2"
            label="Phone Number"
            disabled={!isRequestChange}
            key={form.key("phone")}
            {...form.getInputProps("phone")}
          />

          {isRequestChange &&
            <Grid className="mt-3">
              <Grid.Col span={6}>
                <Button
                  color="red"
                  onClick={() => handleChangePress()}
                  className="mb-2"
                  fullWidth
                  variant="outline"
                  type="button"
                >
                  Cancel
                </Button>
              </Grid.Col>
              <Grid.Col span={6}>
                <Button
                  color="green"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </Grid.Col>
            </Grid>
          }
        </div>
      </form>
    </>
  )
}

export default UserInfoProfile