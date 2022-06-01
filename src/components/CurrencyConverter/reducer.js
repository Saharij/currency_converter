import { priceFormat } from "../../utils";

const getTargetValue = ({
  baseValue,
  currencies,
  baseCurrency,
  targetCurrency,
}) => {
  const { sale } = currencies.find(({ target, base }) => (
    baseCurrency === base && targetCurrency === target
  ));

  return { targetValue: priceFormat(baseValue * sale) };
};

const getBaseValue = ({
  targetValue,
  currencies,
  baseCurrency,
  targetCurrency,
}) => {
  const { sale } = currencies.find(({ target, base }) => (
    baseCurrency === base && targetCurrency === target
  ));

  return { baseValue: priceFormat(targetValue / sale) };
};

export default (state, action) => {
  switch (action.type) {
    case 'baseValueChange':
      return {
        ...state,
        baseValue: action.value,
        ...getTargetValue({
          ...state,
          baseValue: action.value,
        }),
      };

    case 'targetValueChange':
      return {
        ...state,
        targetValue: action.value,
        ...getBaseValue({
          ...state,
          targetValue: action.value,
        }),
      };

    case 'baseCurrencyChange':
      return {
        ...state,
        baseCurrency: action.value,
        ...(state.targetCurrency === action.value ? { targetCurrency: state.baseCurrency } : {}),
        ...getTargetValue({
          ...state,
          baseCurrency: action.value,
          ...(state.targetCurrency === action.value ? { targetCurrency: state.baseCurrency } : {}),
        }),
      };

    case 'targetCurrencyChange':
      return {
        ...state,
        targetCurrency: action.value,
        ...(state.baseCurrency === action.value ? { baseCurrency: state.targetCurrency } : {}),
        ...getTargetValue({
          ...state,
          targetCurrency: action.value,
          ...(state.baseCurrency === action.value ? { baseCurrency: state.targetCurrency } : {}),
        }),
      };

    default:
      return state;
  }
};
