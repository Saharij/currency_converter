import T from 'prop-types';
import { useReducer } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import reducer from './reducer'
import { priceFormat } from '../../utils';
import ConverterControl from './components/ConverterControl';

const init = (currencies) => {
  const [{ target, base, sale }] = currencies;
  const baseValue = '1';

  return {
    currencies,
    baseCurrency: base,
    baseValue,
    targetCurrency: target,
    targetValue: priceFormat(baseValue * sale),
  }
};

const CurrencyConverter = ({ currencies }) => {
  const [state, dispatch] = useReducer(reducer, currencies, init);

  const handleBaseChange = (value) => {
    dispatch({ type: 'baseValueChange', value });
  };

  const handleTargetChange = (value) => {
    dispatch({ type: 'targetValueChange', value });
  };

  const handleBaseCurrency = (value) => {
    dispatch({ type: 'baseCurrencyChange', value });
  };

  const handleTargetCurrency = (value) => {
    dispatch({ type: 'targetCurrencyChange', value });
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <ConverterControl
            value={state.baseValue}
            currency={state.baseCurrency}
            currencies={currencies}
            onChange={handleBaseChange}
            onCurrencyChange={handleBaseCurrency}
          />
          <ConverterControl
            value={state.targetValue}
            currency={state.targetCurrency}
            currencies={currencies}
            onChange={handleTargetChange}
            onCurrencyChange={handleTargetCurrency}
          />
        </Col>
      </Row>
    </Container>
  );
};

CurrencyConverter.propTypes = {
  currencies: T.arrayOf(
    T.shape({
      base: T.string,
      sale: T.string,
      buy: T.string,
    }),
  ).isRequired,
};

export default CurrencyConverter;
