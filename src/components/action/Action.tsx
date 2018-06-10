import * as React from 'react'
import './Action.scss'
import { IProps, IState } from './ActionPropsState'
import { Navbar, Button, Glyphicon } from 'react-bootstrap'
class ActionComponent extends React.Component<IProps | any, IState>{
  /**
   *
   */
  constructor(props: Readonly<IProps | any>) {
    super(props);

  }
  render() {
    const { onCreate } = this.props
    return (
      <Navbar >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="javascript:void(0)">VO HONG SON | ReactJS Assignment</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullRight>
            <Button bsStyle="success" onClick={onCreate} >
              <Glyphicon glyph='plus' /> {' '}Create
          </Button>
          </Navbar.Form>
          <Navbar.Form pullRight>
            {this.props.children}
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default ActionComponent;