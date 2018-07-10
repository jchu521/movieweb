import React, { Component } from 'react';
import '../App.css';
import {
  Navbar,
  Nav,
  NavItem,
  FormGroup,
  FormControl,
  InputGroup,
  Button,
  Badge
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Menu extends Component {

  state = {
    found: false,
    query:'',
  }

  render() {
    // console.log(this);
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link  to="/">MovieDB</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem  componentClass={Link}  href="/movies" to="/Movies" eventKey={1} >Movies</NavItem>
            <NavItem  componentClass={Link}  href="/TVShows" to="/tvshows" eventKey={2} >TV Shows</NavItem>
          </Nav>
          <Navbar.Form pullRight>
            <FormGroup>
              <InputGroup>
                <FormControl id='search' value={this.state.query} type="text" placeholder="Search Movies or TV Shows" onChange={(e)=> this.setState({query: e.target.value})}/>
                <InputGroup.Button>
                  <Link to={`/search/${this.state.query}`} >
                    <Button type='submit' bsStyle={!this.state.found ? 'default':'danger'} onClick={() => this.setState({query: ''})}>
                      Search
                    </Button>
                  </Link>
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

export default (Menu);
