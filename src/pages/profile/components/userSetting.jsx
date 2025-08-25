import { Button, PasswordInput } from "@mantine/core"
import { useState } from "react";
import Swal from "sweetalert2";

const UserSettingProfile = (props) => {
  const {
    patchMutation,
  } = props

  const [value, setValue] = useState("")

  const handleChangePress = () => Swal.fire({
    title: "Do you want to save password changes?",
    showCancelButton: true,
    confirmButtonText: "Save",
  }).then((result) => {
    if (result.isConfirmed) {
      patchMutation.mutate({
        endpoint: `/auth/change-password`,
        data: {
          password: value
        },
      });
    }
  });

  return (
    <>
      <PasswordInput
        label="Password"
        placeholder="Password"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <Button
        className="mt-3"
        color="green"
        type="button"
        onClick={() => handleChangePress()}
      >
        Change
      </Button>
    </>
  )
}

export default UserSettingProfile