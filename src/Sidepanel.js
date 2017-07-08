
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'

class Sidebar extends React.Component {
    render() {
        return (
            <Modal className='Sidebar left' show={ this.props.isVisible } onHide={this.props.onHide}
                   autoFocus keyboard
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sidebar Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { this.props.children }
                </Modal.Body>
            </Modal>
        );
    }
}

class Sidepanel extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isVisible: false,
        };
    }

    updateModal(isVisible) {
        this.state.isVisible = isVisible;
        this.forceUpdate();
    }

    render() {
        return (
            <div className='col-lg-2 Sidebar-demo'>
                <Button onClick={ () => this.updateModal(true) }>Display Modal Dialog</Button>
                <Sidebar side='left' isVisible={ this.state.isVisible } onHide={ () => this.updateModal(false) }>
                    <Nav>
                        <NavItem href='#'>Item 1</NavItem>
                        <NavItem href='#'>Item 2</NavItem>
                        <NavItem href='#'>Item 3</NavItem>
                        <NavItem href='#'>Item 4</NavItem>
                        <NavItem href='#'>Item 5</NavItem>
                    </Nav>
                </Sidebar>
            </div>
        );
    }
}

export default Sidepanel;