import { SWAP_CURRENCY_CHANGE, DELETE_Currency, SHOW_CLICK_RESULT, CHANGE_CURRENCY_AMOUNT, REFRESH_VALUE_COME, CONVERSION_InI_RESULT, CHANGE_BASE_CURRENCY_RESULT, CONVERSION_RESULT_ADD, CONVERSION_ADD_RESULT, SWAP_CURRENCY, CHANGE_BASE_CURRENCY, CHANGE_QUOTE_CURRENCY, CONVERSION_RESULT, GET_INITIAL_CONVERSION, CONVERSION_RESULT_QUOTE, CONVERSION_RESULT_BASE, CONVERSION_RESULT_BASE_USD } from '../actions/currencies';
import DATAcurrencies from '../data/currencies';

const initialState = {
  baseCurrency: 'USD',
  quoteCurrency: 'EUR',
  amount: 1,
  error: null,
  conversions_base: 0,
  conversions_quote: 0,
  actionName: 'NULL',
  valueArray: [],
  actionValue: '',
  dataItemLoaded: DATAcurrencies,
  addChangeData: [],
  currenTinputValue: 1,
  ShowingStarReal: false,
  isHiddenBox: false,
  NowBoxValue: 0,
  ShowourView: true

};

const setConversions = (state, action) => {
  // let conversion = {
  //   isFetching: true,
  //   date: '',
  //   rates: {},
  // };

  // if (state.conversions[action.currency]) {
  //   conversion = state.conversions[action.currency];
  // }
  //   return { 
  //     ...state, 
  //     contents: state.contents.map(
  //         (content, i) => i === 1 ? {...content, text: action.payload}
  //                                 : content
  //     )
  //  }
  // const newState = { ...state };
  // newState.valueArray = 
  //   [
  //     newState.valueArray[0][0],
  //     {qCurrency: newState.contnets[1].title, text: action.payload}
  //   ];

  //   return newState

  // return {
  //   ///...state.conversions,
  //   // [action.currency]: conversion,
  //   // valueArray[actionValue][actionValue]:{}

  //   valueArray : [...state.valueArray, [[action.actionValue][action.actionValue].qCurrency = action.resutQuote]] 
  // };


  //dataItemLoaded:  state.dataItemLoaded.filter(task => task !== action.quote_Currency && task !== action.quote_Currency_2 ),
};

const arrayAddPush = (data, key, newData) => {
  let result = data.filter(task => task !== key);

  let newResult = result.push(newData)
  return result;
}

const arrayRemove = (data, key) => {
  let newData = data.filter((val, index) => {
    return index !== key
  })
  return newData;
}


export default (state = initialState, action) => {
  switch (action.type) {
    case REFRESH_VALUE_COME:
      return ({
        ...state,
        addChangeData: action.valueArray,
        baseCurrency: action.base_Currency,
        currenTinputValue: action.currenTinputValue
      });
    case CHANGE_CURRENCY_AMOUNT:
      return {
        ...state,
        addChangeData: state.valueArray.map((content, i) => content.map((data, j) => j === 1 ? { 'ResulT': data.ResulT * action.amount } : data)),
        currenTinputValue: action.amount
      };
    case CHANGE_BASE_CURRENCY_RESULT:
      return ({
        ...state,
        addChangeData: action.valueArray,
        baseCurrency: action.base_Currency
      });
    case CHANGE_QUOTE_CURRENCY:
      return ({
        ...state,
        quoteCurrency: action.currency,
      });
    case CONVERSION_RESULT:
      return ({
        ...state,
        conversions_base: action.resutBase,
        conversions_quote: action.resutQuote,
        actionName: action.actionName,
        actionValue: action.actionValue,
        dataItemLoaded: arrayAddPush(state.dataItemLoaded, action.quote_Currency, action.C_currency) ,//state.dataItemLoaded.filter(task => task !== action.quote_Currency).push('fourth') ,
        addChangeData: state.valueArray.map(
          (content, i) => i === action.actionValue ? content.map((data, j) => j === 0 ? { 'qCurrency': action.quote_Currency } : { 'ResulT': action.resutQuote.toString() }) : content //{...content, text: action.payload}
        ),
        valueArray: state.valueArray.map(
          (content, i) => i === action.actionValue ? content.map((data, j) => j === 0 ? { 'qCurrency': action.quote_Currency } : { 'ResulT': action.resutQuote.toString() }) : content //{...content, text: action.payload}
        )
      });
    case CONVERSION_RESULT_QUOTE:
      return ({
        ...state,
        conversions_quote: action.resutQuote
      });
    case CONVERSION_RESULT_BASE:
      return ({
        ...state,
        conversions_base: action.resutBase,
        conversions_quote: action.resutQuote["0"].ask
      });
    case CONVERSION_RESULT_BASE_USD:
      return ({
        ...state,
        conversions_quote: action.resutQuote,
      });
    case SWAP_CURRENCY_CHANGE:
      return {
        ...state,
         baseCurrency: action.base_Currency,
         addChangeData: action.valueArray,
         valueArray: action.valueArray
      };
    case CONVERSION_ADD_RESULT:
      return {
        ...state,
        actionName: action.actionName,
        ShowingStarReal: true,
        conversions_base: action.resutBase,
        conversions_quote: action.resutQuote,
        quoteCurrency: action.quote_Currency,
        valueArray: [...state.valueArray, [{ 'qCurrency': action.quote_Currency }, { 'ResulT': action.resutQuote.toString() }]],
        dataItemLoaded: state.dataItemLoaded.filter(task => task !== action.quote_Currency),
        addChangeData: state.addChangeData.length === 0 ? [] : [...state.addChangeData, [{ 'qCurrency': action.quote_Currency }, { 'ResulT': action.resutQuote * state.currenTinputValue }]]
      };

    case CONVERSION_InI_RESULT:
      return {
        ...state,
        baseCurrency: 'USD',
        isHiddenBox: false,
        conversions_base: action.resutBase,
        ShowingStarReal: false,
        conversions_quote: action.resutQuote,
        quoteCurrency: action.quote_Currency,
        valueArray: [[{ 'qCurrency': action.quote_Currency }, { 'ResulT': action.resutQuote.toString() }], [{ 'qCurrency': action.quote_Currency_2 }, { 'ResulT': action.resutQuote_2.toString() }]],
        dataItemLoaded: DATAcurrencies.filter(task => task !== 'EUR' && task !== 'GBP'),
        addChangeData: [[{ 'qCurrency': action.quote_Currency }, { 'ResulT': action.resutQuote.toString() }], [{ 'qCurrency': action.quote_Currency_2 }, { 'ResulT': action.resutQuote_2.toString() }]]
      };

    case SHOW_CLICK_RESULT:
      return {
        ...state,
        isHiddenBox: state.isHiddenBox == false ? true : false,
        NowBoxValue: action.key
      }
    case DELETE_Currency:
      return {
        ...state,
        //addChangeData: state.addChangeData.map((element, i) => element.map((ip, jp) => ip.map((op, up) => console.log(op)))),//state.addChangeData.filter(task => console.log(task)),//map((content, i) => content.map((data, j) => data.qCurrency !== action.value)),
        addChangeData: arrayRemove(state.addChangeData, action.key),
        isHiddenBox: false,
        valueArray: '',
        ShowourView: state.addChangeData.length === 0 ? false : true
      }

    default:
      return state;
  }
};  