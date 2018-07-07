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
  Badge
} from 'react-bootstrap';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Menu extends Component {

  state = {
    movies: null,
    found: false
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.movies.message ==='Not Found'){
      this.setState({found: true})
    }else if(nextProps.movies.message ==='Found'){
      this.setState({found: false})
    }
  }

  onSearch = () => {
    const {searchByMovieName} = this.props;
    let query = document.getElementById('search').value;

    if(query.length !== 0 ){
      this.setState({found: false});
      searchByMovieName(query, 1);
    }
  }

  render() {
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
            <NavItem eventKey={1} href="#">Movies</NavItem>
            <NavItem eventKey={2} href="#">TV Shows</NavItem>
          </Nav>
          <Navbar.Form pullRight>
            <FormGroup>
              <InputGroup>
                <FormControl id='search' type="text" placeholder="Search Movies" />
                <InputGroup.Button>
                  <Button type='submit' bsStyle={!this.state.found ? 'default':'danger'} onClick={() => this.onSearch()}>
                    Search
                  </Button>
                </InputGroup.Button>
              </InputGroup>
              {this.state.found && <Badge>Not Found</Badge>}
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
