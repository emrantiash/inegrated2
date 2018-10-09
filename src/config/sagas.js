import { takeEvery, select, call, put } from 'redux-saga/effects';

import { SWAP_CURRENCY_CHANGE, CONVERSION_ADD_RESULT, REFRESHCURRENCY, REFRESH_VALUE_COME, CHANGE_BASE_CURRENCY_RESULT, CONVERSION_InI_RESULT, CHANGE_BASE_CURRENCY, CONVERSION_RESULT_ADD, GET_INITIAL_CONVERSION, SWAP_CURRENCY, CHANGE_QUOTE_CURRENCY, CONVERSION_RESULT, CONVERSION_ERROR, CONVERSION_RESULT_QUOTE, CONVERSION_RESULT_BASE, CONVERSION_RESULT_BASE_USD } from '../actions/currencies';

export const getbaseLatestRate = currency => fetch(`https://quotes.instaforex.com/api/quotesTick?m=json&q=${currency}USD`);


export const getquoteLatestRate = currency => fetch(`https://quotes.instaforex.com/api/quotesTick?m=json&q=USD${currency}`);



const fetchLatestConversionRates = function* (action) {


  try {


    let base_Currency, quote_Currency, quote_Currency_2;

    base_Currency = 'USD';//yield select(state => state.currencies.baseCurrency);
    quote_Currency = 'EUR';//yield select(state => state.currencies.quoteCurrency);
    quote_Currency_2 = 'GBP';

    const responsequote = yield call(getbaseLatestRate, quote_Currency);


    const resutBase = 1;
    const Resut_Quote = yield responsequote.json();
    const resutQuote = 1 / Resut_Quote[0].ask;

    const responsequote_2 = yield call(getbaseLatestRate, quote_Currency_2);

    const Resut_Quote_2 = yield responsequote_2.json();
    const resutQuote_2 = 1 / Resut_Quote_2[0].ask

    if (Resut_Quote.error) {
      yield put({ type: CONVERSION_ERROR, error: "error ON" });
    }
    else {

      yield put({ type: CONVERSION_InI_RESULT, resutBase, resutQuote, quote_Currency, quote_Currency_2, resutQuote_2 });

    }



  } catch (e) {
    console.log("Saga Error", e)
  }


};




const fetchFuncBaseDKKqutDKK = function* (base_Currency, quote_Currency, actionName, actionValue, C_currency) {

  const responsebase = yield call(getquoteLatestRate, base_Currency);
  const responsequote = yield call(getquoteLatestRate, quote_Currency);

  const resut_Base = yield responsebase.json();
  const r_esutbase = 1 / resut_Base[0].ask

  const Resut_Quote = yield responsequote.json();
  const resutquote = Resut_Quote[0].ask

  const resutQuote = resutquote * r_esutbase;
  const resutBase = 1;

  if (Resut_Quote.error) {
    yield put({ type: CONVERSION_ERROR, error: "error ON" });
  }
  else {

    if (actionName === 'CONVERSION_RESULT_ADD') {

      yield put({ type: CONVERSION_ADD_RESULT, resutBase, resutQuote, actionName, quote_Currency });

    } else {

      yield put({ type: CONVERSION_RESULT, resutBase, resutQuote, actionName, actionValue, quote_Currency, C_currency });

    }


  }

}



const fetchFuncBaseUSDqutDKK = function* (quote_Currency, actionName, actionValue, C_currency) {

  const responsequote = yield call(getquoteLatestRate, quote_Currency);


  const Resut_Quote = yield responsequote.json();
  const resutquote = Resut_Quote[0].ask

  const resutQuote = resutquote;
  const resutBase = 1;

  if (Resut_Quote.error) {
    yield put({ type: CONVERSION_ERROR, error: "error ON" });
  }
  else {

    if (actionName === 'CONVERSION_RESULT_ADD') {

      yield put({ type: CONVERSION_ADD_RESULT, resutBase, resutQuote, actionName, quote_Currency });

    } else {

      yield put({ type: CONVERSION_RESULT, resutBase, resutQuote, actionName, actionValue, quote_Currency, C_currency });

    }



  }

}


const fetchFuncBaseAUDqutDKK = function* (base_Currency, quote_Currency, actionName, actionValue, C_currency) {

  const responsequote = yield call(getbaseLatestRate, base_Currency);
  const responsebase = yield call(getquoteLatestRate, quote_Currency);


  const Resut_Quote = yield responsequote.json();
  const resutquote = Resut_Quote[0].ask

  const resut_Base = yield responsebase.json();
  const r_esutbase = resut_Base[0].ask

  const resutQuote = resutquote * r_esutbase;
  const resutBase = 1;

  if (Resut_Quote.error) {
    yield put({ type: CONVERSION_ERROR, error: "error ON" });
  }
  else {

    if (actionName === 'CONVERSION_RESULT_ADD') {

      yield put({ type: CONVERSION_ADD_RESULT, resutBase, resutQuote, actionName, quote_Currency });

    } else {

      yield put({ type: CONVERSION_RESULT, resutBase, resutQuote, actionName, actionValue, quote_Currency, C_currency });

    }


  }


}

const fetchFuncBaseUSD = function* (quote_Currency) {


  const responsequote = yield call(getquoteLatestRate, quote_Currency);

  const resutBase = 1;
  const Resut_Quote = yield responsequote.json();
  const resutQuote = Resut_Quote[0].ask;

  if (Resut_Quote.error) {
    yield put({ type: CONVERSION_ERROR, error: "error ON" });
  }
  else {

    yield put({ type: CONVERSION_RESULT, resutBase, resutQuote });

  }


}

const fetchFuncBaseUSDqutAUD = function* (quote_Currency, actionName, actionValue, C_currency) {

  const responsequote = yield call(getbaseLatestRate, quote_Currency);

  const resutBase = 1;
  const Resut_Quote = yield responsequote.json();
  const resutQuote = 1 / Resut_Quote[0].ask;

  if (Resut_Quote.error) {
    yield put({ type: CONVERSION_ERROR, error: "error ON" });
  }
  else {

    if (actionName === 'CONVERSION_RESULT_ADD') {

      yield put({ type: CONVERSION_ADD_RESULT, resutBase, resutQuote, actionName, quote_Currency });

    } else {

      yield put({ type: CONVERSION_RESULT, resutBase, resutQuote, actionName, actionValue, quote_Currency, C_currency });

    }
  }

}

const fetchFuncQuteUSDBaseAUD = function* (base_Currency, actionName, quote_Currency, actionValue, C_currency) {


  const responsequote = yield call(getbaseLatestRate, base_Currency);

  const resutBase = 1;
  const Resut_Quote = yield responsequote.json();
  const resutQuote = Resut_Quote[0].ask;

  if (Resut_Quote.error) {
    yield put({ type: CONVERSION_ERROR, error: "error ON" });
  }
  else {

    if (actionName === 'CONVERSION_RESULT_ADD') {

      yield put({ type: CONVERSION_ADD_RESULT, resutBase, resutQuote, actionName, quote_Currency });

    } else if (actionName === 'CHANGE_QUOTE_CURRENCY') {

      yield put({ type: CONVERSION_RESULT, resutBase, resutQuote, actionName, actionValue, C_currency });

    } else {

      yield put({ type: CONVERSION_RESULT, resutBase, resutQuote, actionName, actionValue, quote_Currency, C_currency });

    }

  }


}


const fetchFuncQuteAUDBaseDKK = function* (quote_Currency, base_Currency, actionName, actionValue, C_currency) {

  const responsequote = yield call(getbaseLatestRate, quote_Currency);
  const responsebase = yield call(getquoteLatestRate, base_Currency);


  const Resut_Quote = yield responsequote.json();
  const resutquote = 1 / Resut_Quote[0].ask

  const resut_Base = yield responsebase.json();
  const r_esutbase = 1 / resut_Base[0].ask

  const resutQuote = resutquote * r_esutbase;
  const resutBase = 1;

  if (Resut_Quote.error) {
    yield put({ type: CONVERSION_ERROR, error: "error ON" });
  }
  else {

    if (actionName === 'CONVERSION_RESULT_ADD') {

      yield put({ type: CONVERSION_ADD_RESULT, resutBase, resutQuote, actionName, quote_Currency });

    } else {

      yield put({ type: CONVERSION_RESULT, resutBase, resutQuote, actionName, actionValue, quote_Currency, C_currency });

    }

  }


}


const fetchFuncQuteAUDBaseAUD = function* (quote_Currency, base_Currency, actionName, actionValue, C_currency) {

  const responsequote = yield call(getbaseLatestRate, quote_Currency);
  const responsebase = yield call(getbaseLatestRate, base_Currency);


  const Resut_Quote = yield responsequote.json();
  const resutquote = 1 / Resut_Quote[0].ask

  const resut_Base = yield responsebase.json();
  const r_esutbase = resut_Base[0].ask

  const resutQuote = resutquote * r_esutbase;

  const resutBase = 1;

  if (Resut_Quote.error) {
    yield put({ type: CONVERSION_ERROR, error: "error ON" });
  }
  else {

    if (actionName === 'CONVERSION_RESULT_ADD') {

      yield put({ type: CONVERSION_ADD_RESULT, resutBase, resutQuote, actionName, quote_Currency });

    } else {

      yield put({ type: CONVERSION_RESULT, resutBase, resutQuote, actionName, actionValue, quote_Currency, C_currency });

    }

  }

}








const fetchLatestQuoteConversionRates = function* (action) {
  let currency = action.currency;
  const actionName = action.type;
  const actionValue = action.valueofindex;
  const C_currency = action.C_currency;


  try {

    let base_Currency, quote_Currency;


    base_Currency = yield select(state => state.currencies.baseCurrency);
    quote_Currency = yield select(state => state.currencies.quoteCurrency);

    if (quote_Currency === 'USD') { //for value array usd donee

      if (base_Currency === 'AUD' || base_Currency === 'EUR' || base_Currency === 'NZD' || base_Currency === 'GBP') {

        yield fetchFuncQuteUSDBaseAUD(base_Currency, actionName, actionValue, quote_Currency, C_currency);//done work qtotecurency /// C_currency

      } else {

        const responsequote = yield call(getquoteLatestRate, base_Currency);

        const resutBase = 1;
        const Resut_Quote = yield responsequote.json();
        const resutQuote = 1 / Resut_Quote[0].ask

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {

          yield put({ type: CONVERSION_RESULT, resutBase, resutQuote, actionName, actionValue, quote_Currency, C_currency }); ///C_currency

        }

      }



    }
    else if (quote_Currency === 'AUD' || quote_Currency === 'EUR' || quote_Currency === 'NZD' || quote_Currency === 'GBP') {

      if (base_Currency === 'AUD' || base_Currency === 'EUR' || base_Currency === 'NZD' || base_Currency === 'GBP') {

        yield fetchFuncQuteAUDBaseAUD(quote_Currency, base_Currency, actionName, actionValue, C_currency) //done quetequrrency doneee C_currency

      } else if (base_Currency === 'USD') {

        yield fetchFuncBaseUSDqutAUD(quote_Currency, actionName, actionValue, C_currency) //done work quotecurrency doneeee C_currency

      } else {

        yield fetchFuncQuteAUDBaseDKK(quote_Currency, base_Currency, actionName, actionValue, C_currency) //done work quetequrrency doneee C_currency

      }



    } else {

      if (base_Currency === 'AUD' || base_Currency === 'EUR' || base_Currency === 'NZD' || base_Currency === 'GBP') {

        yield fetchFuncBaseAUDqutDKK(base_Currency, quote_Currency, actionName, actionValue, C_currency) //done work quetecurrency C_currency

      } else if (base_Currency === 'USD') {

        yield fetchFuncBaseUSDqutDKK(quote_Currency, actionName, actionValue, C_currency);//done work with quetequrrency C_currency

      } else {

        yield fetchFuncBaseDKKqutDKK(base_Currency, quote_Currency, actionName, actionValue, C_currency) //done work with quetecurrency C_currency

      }
    }

  } catch (e) {
    console.log("Saga Error", e)
  }

};




const fetchLatestBaseConversionRates = function* (action) {


  try {
  let currency = action.currency;
  
  var base_Currency;

  if(currency === 'undefined'){
    base_Currency = yield select(state => state.currencies.baseCurrency);
  } else {
     base_Currency = currency;
  }
  
  
  let currenTinputValue = yield select(state => state.currencies.currenTinputValue);


  let valueArray = yield select(state => state.currencies.valueArray);

 

  for (let i = 0; i < valueArray.length; i++) {

    if (valueArray[i][0].qCurrency === 'USD') {

      if (base_Currency === 'AUD' || base_Currency === 'EUR' || base_Currency === 'NZD' || base_Currency === 'GBP') {

        const responsequote = yield call(getbaseLatestRate, base_Currency);

        const resutBase = 1;
        const Resut_Quote = yield responsequote.json();
        const resutQuote = Resut_Quote[0].ask;

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {
          valueArray[i][1].ResulT = resutQuote * currenTinputValue;
        }

      } else {

        const responsequote = yield call(getquoteLatestRate, base_Currency);

        const resutBase = 1;
        const Resut_Quote = yield responsequote.json();
        const resutQuote = 1 / Resut_Quote[0].ask

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {

          valueArray[i][1].ResulT = resutQuote * currenTinputValue;

        }

      }

    } else if (valueArray[i][0].qCurrency === 'AUD' || valueArray[i][0].qCurrency === 'EUR' || valueArray[i][0].qCurrency === 'NZD' || valueArray[i][0].qCurrency === 'GBP') {

      if (base_Currency === 'AUD' || base_Currency === 'EUR' || base_Currency === 'NZD' || base_Currency === 'GBP') {

        let quote_Currency = valueArray[i][0].qCurrency;

        const responsequote = yield call(getbaseLatestRate, quote_Currency);
        const responsebase = yield call(getbaseLatestRate, base_Currency);


        const Resut_Quote = yield responsequote.json();
        const resutquote = 1 / Resut_Quote[0].ask

        const resut_Base = yield responsebase.json();
        const r_esutbase = resut_Base[0].ask

        const resutQuote = resutquote * r_esutbase;

        const resutBase = 1;

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {
          valueArray[i][1].ResulT = resutQuote * currenTinputValue;
        }

      } else if (base_Currency === 'USD') {

        let quote_Currency = valueArray[i][0].qCurrency;


        const responsequote = yield call(getbaseLatestRate, quote_Currency);

        const resutBase = 1;
        const Resut_Quote = yield responsequote.json();
        const resutQuote = 1 / Resut_Quote[0].ask;

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {
          valueArray[i][1].ResulT = resutQuote * currenTinputValue;
        }

      } else {

        let quote_Currency = valueArray[i][0].qCurrency;

        const responsequote = yield call(getbaseLatestRate, quote_Currency);
        const responsebase = yield call(getquoteLatestRate, base_Currency);


        const Resut_Quote = yield responsequote.json();
        const resutquote = 1 / Resut_Quote[0].ask

        const resut_Base = yield responsebase.json();
        const r_esutbase = 1 / resut_Base[0].ask

        const resutQuote = resutquote * r_esutbase;
        const resutBase = 1;

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {

          valueArray[i][1].ResulT = resutQuote * currenTinputValue;

        }


      }

    } else {
      if (base_Currency === 'AUD' || base_Currency === 'EUR' || base_Currency === 'NZD' || base_Currency === 'GBP') {

        let quote_Currency = valueArray[i][0].qCurrency;

        const responsequote = yield call(getbaseLatestRate, base_Currency);
        const responsebase = yield call(getquoteLatestRate, quote_Currency);


        const Resut_Quote = yield responsequote.json();
        const resutquote = Resut_Quote[0].ask

        const resut_Base = yield responsebase.json();
        const r_esutbase = resut_Base[0].ask

        const resutQuote = resutquote * r_esutbase;
        const resutBase = 1;

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {
          valueArray[i][1].ResulT = resutQuote * currenTinputValue;
        }

      } else if (base_Currency === 'USD') {

        let quote_Currency = valueArray[i][0].qCurrency;

        const responsequote = yield call(getquoteLatestRate, quote_Currency);


        const Resut_Quote = yield responsequote.json();
        const resutquote = Resut_Quote[0].ask

        const resutQuote = resutquote;
        const resutBase = 1;

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {
          valueArray[i][1].ResulT = resutQuote * currenTinputValue;
        }

      } else {

        let quote_Currency = valueArray[i][0].qCurrency;

        const responsebase = yield call(getquoteLatestRate, base_Currency);
        const responsequote = yield call(getquoteLatestRate, quote_Currency);

        const resut_Base = yield responsebase.json();
        const r_esutbase = 1 / resut_Base[0].ask

        const Resut_Quote = yield responsequote.json();
        const resutquote = Resut_Quote[0].ask

        const resutQuote = resutquote * r_esutbase;
        const resutBase = 1;

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {
          valueArray[i][1].ResulT = resutQuote * currenTinputValue;
        }

      }
    }
  }

  // newArray = valueArray

  yield put({ type: CHANGE_BASE_CURRENCY_RESULT, base_Currency, valueArray });


} catch (e) 
{
    console.log("Saga Error", e)
}

};


const fatchSWAP_CURRENCYrates = function* (action) {

  try {

    let OldArray = action.Array_dat;//yield select(state => state.currencies.valueArray);
    let Swap_quote_Currency = action.C_Base;//yield select(state => state.currencies.baseCurrency);
    let base_Currency = action.value;


    let valueArray = OldArray.map(
      (content, i) => content.map((data, j) => data.qCurrency === action.value ? {qCurrency: Swap_quote_Currency} : data )
    )

    let currenTinputValue = yield select(state => state.currencies.currenTinputValue);

    for (let i = 0; i < valueArray.length; i++) {

      if (valueArray[i][0].qCurrency === 'USD') {
  
        if (base_Currency === 'AUD' || base_Currency === 'EUR' || base_Currency === 'NZD' || base_Currency === 'GBP') {
  
          const responsequote = yield call(getbaseLatestRate, base_Currency);
  
          const resutBase = 1;
          const Resut_Quote = yield responsequote.json();
          const resutQuote = Resut_Quote[0].ask;
  
          if (Resut_Quote.error) {
            yield put({ type: CONVERSION_ERROR, error: "error ON" });
          }
          else {
            valueArray[i][1].ResulT = resutQuote * currenTinputValue;
          }
  
        } else {
  
          const responsequote = yield call(getquoteLatestRate, base_Currency);
  
          const resutBase = 1;
          const Resut_Quote = yield responsequote.json();
          const resutQuote = 1 / Resut_Quote[0].ask
  
          if (Resut_Quote.error) {
            yield put({ type: CONVERSION_ERROR, error: "error ON" });
          }
          else {
  
            valueArray[i][1].ResulT = resutQuote * currenTinputValue;
  
          }
  
        }
  
      } else if (valueArray[i][0].qCurrency === 'AUD' || valueArray[i][0].qCurrency === 'EUR' || valueArray[i][0].qCurrency === 'NZD' || valueArray[i][0].qCurrency === 'GBP') {
  
        if (base_Currency === 'AUD' || base_Currency === 'EUR' || base_Currency === 'NZD' || base_Currency === 'GBP') {
  
          let quote_Currency = valueArray[i][0].qCurrency;
  
          const responsequote = yield call(getbaseLatestRate, quote_Currency);
          const responsebase = yield call(getbaseLatestRate, base_Currency);
  
  
          const Resut_Quote = yield responsequote.json();
          const resutquote = 1 / Resut_Quote[0].ask
  
          const resut_Base = yield responsebase.json();
          const r_esutbase = resut_Base[0].ask
  
          const resutQuote = resutquote * r_esutbase;
  
          const resutBase = 1;
  
          if (Resut_Quote.error) {
            yield put({ type: CONVERSION_ERROR, error: "error ON" });
          }
          else {
            valueArray[i][1].ResulT = resutQuote * currenTinputValue;
          }
  
        } else if (base_Currency === 'USD') {
  
          let quote_Currency = valueArray[i][0].qCurrency;
  
  
          const responsequote = yield call(getbaseLatestRate, quote_Currency);
  
          const resutBase = 1;
          const Resut_Quote = yield responsequote.json();
          const resutQuote = 1 / Resut_Quote[0].ask;
  
          if (Resut_Quote.error) {
            yield put({ type: CONVERSION_ERROR, error: "error ON" });
          }
          else {
            valueArray[i][1].ResulT = resutQuote * currenTinputValue;
          }
  
        } else {
  
          let quote_Currency = valueArray[i][0].qCurrency;
  
          const responsequote = yield call(getbaseLatestRate, quote_Currency);
          const responsebase = yield call(getquoteLatestRate, base_Currency);
  
  
          const Resut_Quote = yield responsequote.json();
          const resutquote = 1 / Resut_Quote[0].ask
  
          const resut_Base = yield responsebase.json();
          const r_esutbase = 1 / resut_Base[0].ask
  
          const resutQuote = resutquote * r_esutbase;
          const resutBase = 1;
  
          if (Resut_Quote.error) {
            yield put({ type: CONVERSION_ERROR, error: "error ON" });
          }
          else {
  
            valueArray[i][1].ResulT = resutQuote * currenTinputValue;
  
          }
  
  
        }
  
      } else {
        if (base_Currency === 'AUD' || base_Currency === 'EUR' || base_Currency === 'NZD' || base_Currency === 'GBP') {
  
          let quote_Currency = valueArray[i][0].qCurrency;
  
          const responsequote = yield call(getbaseLatestRate, base_Currency);
          const responsebase = yield call(getquoteLatestRate, quote_Currency);
  
  
          const Resut_Quote = yield responsequote.json();
          const resutquote = Resut_Quote[0].ask
  
          const resut_Base = yield responsebase.json();
          const r_esutbase = resut_Base[0].ask
  
          const resutQuote = resutquote * r_esutbase;
          const resutBase = 1;
  
          if (Resut_Quote.error) {
            yield put({ type: CONVERSION_ERROR, error: "error ON" });
          }
          else {
            valueArray[i][1].ResulT = resutQuote * currenTinputValue;
          }
  
        } else if (base_Currency === 'USD') {
  
          let quote_Currency = valueArray[i][0].qCurrency;
  
          const responsequote = yield call(getquoteLatestRate, quote_Currency);
  
  
          const Resut_Quote = yield responsequote.json();
          const resutquote = Resut_Quote[0].ask
  
          const resutQuote = resutquote;
          const resutBase = 1;
  
          if (Resut_Quote.error) {
            yield put({ type: CONVERSION_ERROR, error: "error ON" });
          }
          else {
            valueArray[i][1].ResulT = resutQuote * currenTinputValue;
          }
  
        } else {
  
          let quote_Currency = valueArray[i][0].qCurrency;
  
          const responsebase = yield call(getquoteLatestRate, base_Currency);
          const responsequote = yield call(getquoteLatestRate, quote_Currency);
  
          const resut_Base = yield responsebase.json();
          const r_esutbase = 1 / resut_Base[0].ask
  
          const Resut_Quote = yield responsequote.json();
          const resutquote = Resut_Quote[0].ask
  
          const resutQuote = resutquote * r_esutbase;
          const resutBase = 1;
  
          if (Resut_Quote.error) {
            yield put({ type: CONVERSION_ERROR, error: "error ON" });
          }
          else {
            valueArray[i][1].ResulT = resutQuote * currenTinputValue;
          }
  
        }
      }
    }

  
    yield put({ type: SWAP_CURRENCY_CHANGE, base_Currency, valueArray });
    

  } catch (e) {
    console.log("Saga Error", e)
  }


}


const fetchFuncADDnewCurency = function* (action) {

  const quote_Currency = action.currency;
  const actionName = action.type;

  let base_Currency = yield select(state => state.currencies.baseCurrency);

  try {

    if (quote_Currency === 'USD') {

      if (base_Currency === 'AUD' || base_Currency === 'EUR' || base_Currency === 'NZD' || base_Currency === 'GBP') {

        yield fetchFuncQuteUSDBaseAUD(base_Currency, actionName, quote_Currency); //done

      } else {

        const responsequote = yield call(getquoteLatestRate, base_Currency);

        const resutBase = 1;
        const Resut_Quote = yield responsequote.json();
        const resutQuote = 1 / Resut_Quote[0].ask

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {

          yield put({ type: CONVERSION_ADD_RESULT, resutBase, resutQuote, actionName, quote_Currency });

        }

      }



    }
    else if (quote_Currency === 'AUD' || quote_Currency === 'EUR' || quote_Currency === 'NZD' || quote_Currency === 'GBP') {

      if (base_Currency === 'AUD' || base_Currency === 'EUR' || base_Currency === 'NZD' || base_Currency === 'GBP') {

        yield fetchFuncQuteAUDBaseAUD(quote_Currency, base_Currency, actionName);//done

      } else if (base_Currency === 'USD') {

        yield fetchFuncBaseUSDqutAUD(quote_Currency, actionName, quote_Currency) //done

      } else {

        yield fetchFuncQuteAUDBaseDKK(quote_Currency, base_Currency, actionName) //done

      }



    } else {

      if (base_Currency === 'AUD' || base_Currency === 'EUR' || base_Currency === 'NZD' || base_Currency === 'GBP') {

        yield fetchFuncBaseAUDqutDKK(base_Currency, quote_Currency, actionName) //done

      } else if (base_Currency === 'USD') {

        yield fetchFuncBaseUSDqutDKK(quote_Currency, actionName); //done

      } else {

        yield fetchFuncBaseDKKqutDKK(base_Currency, quote_Currency, actionName) //done

      }
    }

  } catch (e) {
    console.log("Saga Error", e)
  }


}






const fetchLatestRefreshCheck = function* (action) {


  try {
  let currency = action.currency;
  var currenTinputValue = 1;
  
  let base_Currency = yield select(state => state.currencies.baseCurrency);


  let valueArray = yield select(state => state.currencies.valueArray);

  

  for (let i = 0; i < valueArray.length; i++) {

    if (valueArray[i][0].qCurrency === 'USD') {

      if (base_Currency === 'AUD' || base_Currency === 'EUR' || base_Currency === 'NZD' || base_Currency === 'GBP') {

        const responsequote = yield call(getbaseLatestRate, base_Currency);

        const resutBase = 1;
        const Resut_Quote = yield responsequote.json();
        const resutQuote = Resut_Quote[0].ask;

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {
          valueArray[i][1].ResulT = resutQuote * currenTinputValue;
        }

      } else {

        const responsequote = yield call(getquoteLatestRate, base_Currency);

        const resutBase = 1;
        const Resut_Quote = yield responsequote.json();
        const resutQuote = 1 / Resut_Quote[0].ask

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {

          valueArray[i][1].ResulT = resutQuote * currenTinputValue;

        }

      }

    } else if (valueArray[i][0].qCurrency === 'AUD' || valueArray[i][0].qCurrency === 'EUR' || valueArray[i][0].qCurrency === 'NZD' || valueArray[i][0].qCurrency === 'GBP') {

      if (base_Currency === 'AUD' || base_Currency === 'EUR' || base_Currency === 'NZD' || base_Currency === 'GBP') {

        let quote_Currency = valueArray[i][0].qCurrency;

        const responsequote = yield call(getbaseLatestRate, quote_Currency);
        const responsebase = yield call(getbaseLatestRate, base_Currency);


        const Resut_Quote = yield responsequote.json();
        const resutquote = 1 / Resut_Quote[0].ask

        const resut_Base = yield responsebase.json();
        const r_esutbase = resut_Base[0].ask

        const resutQuote = resutquote * r_esutbase;

        const resutBase = 1;

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {
          valueArray[i][1].ResulT = resutQuote * currenTinputValue;
        }

      } else if (base_Currency === 'USD') {

        let quote_Currency = valueArray[i][0].qCurrency;


        const responsequote = yield call(getbaseLatestRate, quote_Currency);

        const resutBase = 1;
        const Resut_Quote = yield responsequote.json();
        const resutQuote = 1 / Resut_Quote[0].ask;

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {
          valueArray[i][1].ResulT = resutQuote * currenTinputValue;
        }

      } else {

        let quote_Currency = valueArray[i][0].qCurrency;

        const responsequote = yield call(getbaseLatestRate, quote_Currency);
        const responsebase = yield call(getquoteLatestRate, base_Currency);


        const Resut_Quote = yield responsequote.json();
        const resutquote = 1 / Resut_Quote[0].ask

        const resut_Base = yield responsebase.json();
        const r_esutbase = 1 / resut_Base[0].ask

        const resutQuote = resutquote * r_esutbase;
        const resutBase = 1;

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {

          valueArray[i][1].ResulT = resutQuote * currenTinputValue;

        }


      }

    } else {
      if (base_Currency === 'AUD' || base_Currency === 'EUR' || base_Currency === 'NZD' || base_Currency === 'GBP') {

        let quote_Currency = valueArray[i][0].qCurrency;

        const responsequote = yield call(getbaseLatestRate, base_Currency);
        const responsebase = yield call(getquoteLatestRate, quote_Currency);


        const Resut_Quote = yield responsequote.json();
        const resutquote = Resut_Quote[0].ask

        const resut_Base = yield responsebase.json();
        const r_esutbase = resut_Base[0].ask

        const resutQuote = resutquote * r_esutbase;
        const resutBase = 1;

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {
          valueArray[i][1].ResulT = resutQuote * currenTinputValue;
        }

      } else if (base_Currency === 'USD') {

        let quote_Currency = valueArray[i][0].qCurrency;

        const responsequote = yield call(getquoteLatestRate, quote_Currency);


        const Resut_Quote = yield responsequote.json();
        const resutquote = Resut_Quote[0].ask

        const resutQuote = resutquote;
        const resutBase = 1;

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {
          valueArray[i][1].ResulT = resutQuote * currenTinputValue;
        }

      } else {

        let quote_Currency = valueArray[i][0].qCurrency;

        const responsebase = yield call(getquoteLatestRate, base_Currency);
        const responsequote = yield call(getquoteLatestRate, quote_Currency);

        const resut_Base = yield responsebase.json();
        const r_esutbase = 1 / resut_Base[0].ask

        const Resut_Quote = yield responsequote.json();
        const resutquote = Resut_Quote[0].ask

        const resutQuote = resutquote * r_esutbase;
        const resutBase = 1;

        if (Resut_Quote.error) {
          yield put({ type: CONVERSION_ERROR, error: "error ON" });
        }
        else {
          valueArray[i][1].ResulT = resutQuote * currenTinputValue;
        }

      }
    }
  }

  // newArray = valueArray


    yield put({ type: REFRESH_VALUE_COME, base_Currency, valueArray, currenTinputValue});



} catch (e) 
{
    console.log("Saga Error", e)
}

};


const rootSaga = function* () {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestBaseConversionRates);
  //yield takeEvery(REFRESHCURRENCY, fetchLatestRefreshCheck);
  yield takeEvery(REFRESHCURRENCY, fetchLatestConversionRates);
  yield takeEvery(CHANGE_QUOTE_CURRENCY, fetchLatestQuoteConversionRates);
  yield takeEvery(SWAP_CURRENCY, fatchSWAP_CURRENCYrates);
  yield takeEvery(CONVERSION_RESULT_ADD, fetchFuncADDnewCurency);

};

export default rootSaga;