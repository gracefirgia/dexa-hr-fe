import { Modal } from "@mantine/core"

const ModalFormDepartments = ({opened, onClose, form, handleSubmit, type = "Create"}) => {
  return (
    <Modal opened={opened} onClose={onClose} title={`${type} Departments`}>
      {/* Modal content */}


    </Modal>
  )
}

export default ModalFormDepartments