import React from 'react'
import { Modal, Button, Text, Input, Row, Checkbox } from '@nextui-org/react'

export default function LongModal({
  visible,
  onClose,
  header,
  body,
  btn,
  color,
  scroll
}) {
  return (
    <Modal
      css={{ paddingBottom: 0, cursor: 'auto' }}
      closeButton
      blur
      scroll={scroll}
      preventClose
      aria-labelledby='modal-title'
      open={visible}
      onClose={onClose}
    >
      <Modal.Header>
        <Text b size={18}>
          {header}
        </Text>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button bordered auto color={color} onClick={onClose}>
          {btn}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
