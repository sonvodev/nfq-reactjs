import * as React from 'react'
import './Modal.scss'
import { IProps, IState } from './ModalPropsState'
import { Modal, Button, Glyphicon } from 'react-bootstrap'
class ModalComponent extends React.Component<IProps, IState>{
  constructor(props: Readonly<IProps>) {
    super(props);
  }

  render() {
    const { show, onClose, onSave, title, showHeader } = this.props
    return (
      <Modal
        bsSize="large"
        {...{ show: show }}
        onHide={onClose!}>
        {
          showHeader && <Modal.Header closeButton >
            <Modal.Title id="contained-modal-title">
              {title}
            </Modal.Title>
          </Modal.Header>
        }
        <Modal.Body>
          {this.props.children}
        </Modal.Body>
        <Modal.Footer className={showHeader ? 'text-center' : 'text-left'}>
          <Button onClick={onClose}><Glyphicon glyph='remove' />{' '}Close</Button>
          <Button bsStyle='primary' onClick={onSave}><Glyphicon glyph='ok' />{' '}Save</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ModalComponent;