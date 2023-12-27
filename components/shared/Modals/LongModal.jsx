import React from 'react'
import { Modal, Button, Text } from '@nextui-org/react'

export default function LongModal({
  visible,
  onClose,
  onTask,
  header,
  body,
  btn,
  color,
  scroll,
  bodyColor,
  preventClose = true
}) {
  return (
    <Modal
      css={{ paddingBottom: 0, cursor: 'auto' }}
      closeButton
      blur
      scroll={scroll}
      preventClose={preventClose}
      aria-labelledby='modal-title'
      open={visible}
      onClose={onClose}
    >
      <Modal.Header>
        <Text
          b
          color={bodyColor}
          className='text-xs md:text-lg'
        >
          {header}
        </Text>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {btn && (
          <Button
            bordered
            auto
            color={color}
            onPress={onTask || onClose}
          >
            {btn}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}
