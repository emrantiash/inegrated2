export const CHANGE_CURRENCY_AMOUNT = 'CHANGE_CURRENCY_AMOUNT';
export const CHANGE_BASE_CURRENCY = 'CHANGE_BASE_CURRENCY';
export const CHANGE_QUOTE_CURRENCY = 'CHANGE_QUOTE_CURRENCY';
export const GET_INITIAL_CONVERSION = 'GET_INITIAL_CONVERSION';
export const CONVERSION_RESULT_BASE_USD = 'CONVERSION_RESULT_BASE_USD';
export const SWAP_CURRENCY = 'SWAP_CURRENCY';
export const CHANGE_BASE_CURRENCY_RESULT = 'CHANGE_BASE_CURRENCY_RESULT';

export const CONVERSION_RESULT = 'CONVERSION_RESULT';
export const CONVERSION_ERROR = 'CONVERSION_ERROR';
export const CONVERSION_RESULT_QUOTE = 'CONVERSION_RESULT_QUOTE';
export const CONVERSION_RESULT_BASE = 'CONVERSION_RESULT_BASE'; 
export const CONVERSION_RESULT_ADD = 'CONVERSION_RESULT_ADD'; 
export const CONVERSION_ADD_RESULT = 'CONVERSION_ADD_RESULT';
export const CONVERSION_InI_RESULT = 'CONVERSION_InI_RESULT';
export const REFRESHCURRENCY = 'REFRESHCURRENCY';
export const REFRESH_VALUE_COME = 'REFRESH_VALUE_COME';
export const SHOW_CLICK_RESULT = 'SHOW_CLICK_RESULT';
export const DELETE_Currency = 'DELETE_Currency';
export const SWAP_CURRENCY_CHANGE = 'SWAP_CURRENCY_CHANGE';

// export const changeCurrencyAmount = amount => ({
//   type: CHANGE_CURRENCY_AMOUNT,
//   amount: parseFloat(amount),
// });

export const refreshCurrency = () => ({
  type: REFRESHCURRENCY
});

export const swapCurrency = (key, value, C_Base, Array_dat) => ({
  type: SWAP_CURRENCY,
  key,
  value,
  C_Base, Array_dat
});

export function changeCurrencyAmount(amount){
  return {
  type: CHANGE_CURRENCY_AMOUNT,
  amount: parseFloat(amount)
  }
};

export function changeBaseCurrency(currency){
  return{
  type: CHANGE_BASE_CURRENCY,
  currency
  }
};

export function changeQuoteCurrency(currency, valueofindex, C_currency){
  return {
  type: CHANGE_QUOTE_CURRENCY,
  currency,
  valueofindex,
  C_currency
  }
};

export function getInitialConversion(){
  return {
  type: GET_INITIAL_CONVERSION
  }
};


export function addnewCurrenyResult(currency){
  return {
    type : CONVERSION_RESULT_ADD,
    currency
  }
};

export function ShowBoxToggle(key){
  return {
    type: SHOW_CLICK_RESULT,
    key: key
  }
}

export function Delete_Currency_List(key, value){
  return{
    type: DELETE_Currency,
    key: key,
    value: value
  }
}

