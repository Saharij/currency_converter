import T from 'prop-types';
import { Container, Navbar, Nav } from 'react-bootstrap';

import { priceFormat } from '../utils';

const iconByCurrency = {
  USD: 'fa-solid fa-dollar-sign',
  EUR: 'fa-solid fa-euro-sign'
};

const Header = ({ currencies }) => {
  const displayCurrencies = currencies.filter(({ target }) => target === 'UAH');

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Currency Converter</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            {displayCurrencies.map(({ base, sale, buy }) => (
              <Nav.Item key={base} className="ms-4">
                <i className={iconByCurrency[base]} />
                <span className="ms-2">{priceFormat(buy)}/{priceFormat(sale)}</span>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  currencies: T.arrayOf(
    T.shape({
      base: T.string,
      sale: T.string,
      buy: T.string,
    }),
  ),
};

export default Header;
