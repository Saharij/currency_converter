import T from 'prop-types';
import { Row, Col, Form } from 'react-bootstrap';

import { validateNumbers } from '../../../utils';

const ConverterControl = ({
  currencies,
  value,
  currency,
  onChange,
  onCurrencyChange,
}) => {
  const currenciesOptions = currencies.reduce((acc, { target, base }) => {
    const currs = [];

    if (!acc.includes(target)) currs.push(target);
    if (!acc.includes(base)) currs.push(base);

    return [...acc, ...currs]
  }, []);

  const handleInputChange = ({ target: { value } }) => {
    if (!value || validateNumbers(value)) {
      onChange(value);
    }
  };

  const handleSelectChange = ({ target: { value } }) => {
    onCurrencyChange(value);
  }

  return (
    <Row className="justify-content-center mb-2">
      <Col className="mb-2" sm={4} md={3} lg={2}>
        <Form.Control
          value={value}
          onChange={handleInputChange}
        />
      </Col>
      <Col className="mb-2" sm={4} md={3} lg={2} xxl={1}>
        <Form.Select
          value={currency}
          onChange={handleSelectChange}
        >
          {currenciesOptions.map(item => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
};

ConverterControl.propTypes = {
  currencies: T.arrayOf(
    T.shape({
      base: T.string,
      sale: T.string,
      buy: T.string,
    }),
  ).isRequired,
  value: T.string.isRequired,
  currency: T.string.isRequired,
  onChange: T.func.isRequired,
  onCurrencyChange: T.func.isRequired,
};

export default ConverterControl;
