// 🐨 you're gonna need this stuff:
import {render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Modal, ModalContents, ModalOpenButton} from '../modal'
import React from 'react'

test('can be opened and closed', async () => {
  const modalLabel = 'Modal label'
  const modalTitle = 'Modal title'
  const modalContent = 'Modal content'
  render(
    <Modal>
      <ModalOpenButton>
        <button>Open</button>
      </ModalOpenButton>
      <ModalContents aria-label={modalLabel} title={modalTitle}>
        <div>{modalContent}</div>
      </ModalContents>
    </Modal>,
  )
  await userEvent.click(screen.getByRole('button', {name: /open/i}))
  const modal = screen.getByRole('dialog')
  expect(modal).toHaveAttribute('aria-label', modalLabel)
  const inModal = within(modal)
  expect(inModal.getByRole('heading', {name: modalTitle})).toBeInTheDocument()
  expect(inModal.getByText(modalContent)).toBeInTheDocument()

  await userEvent.click(inModal.getByRole('button', {name: /close/i}))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
