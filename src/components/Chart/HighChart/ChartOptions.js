//Backend Logics Coded By Manal @16 September, 2018

const ChartOptions = () => {
    const generalOptions = {
        global: {
            useUTC: false
        },
        lang: {
            rangeSelectorZoom: 'Scale: ',
        }
    };
    return generalOptions;
}

export { ChartOptions }