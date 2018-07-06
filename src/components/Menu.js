import React, { Component } from 'react';
import '../App.css';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  FormGroup,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Menu extends Component {

  state = {
    movies: null,
  }

  onSearch = () => {
    const {searchByMovieName} = this.props;
    let query = document.getElementById('search').value;

    searchByMovieName(query);
    // .then( data =>
    //   this.setState({ movies: data.results})
    // );
  }

  render() {
    console.log(this.props);
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">MovieDB</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">
              Link
            </NavItem>
            <NavDropdown title="C" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Navbar.Form pullRight>
            <FormGroup>
              <InputGroup>
                <FormControl id='search' type="text" placeholder="Search Movies" />
                <InputGroup.Button>
                  <Button type='submit' onClick={() => this.onSearch()}>Search</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>{' '}
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state)=>({
  ...state
})

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators(actions,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
