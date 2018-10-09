import { StyleSheet } from 'react-native';

const INPUT_HEIGHT = 48;
const BORDER_RADIUS = 4;

export default StyleSheet.create({
  //   $buttonBackgroundColorBase: '#ffffff',
  //   $buttonBackgroundColorModifier: 0.1,
  container: {
    backgroundColor: '#ffffff',
    width: '90%',
    height: INPUT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS,
    marginVertical: 11,
  },
  containerDisabled: {
    backgroundColor: '#F0F0F0',
  },
  buttonContainer: {
    height: INPUT_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    paddingHorizontal: 16,
    color: '#4F6D7A',
  },
  separator: {
    height: INPUT_HEIGHT,
    width: StyleSheet.hairlineWidth,
    backgroundColor: '#979797',
  },
  input: {
    flex: 1,
    height: INPUT_HEIGHT,
    borderTopRightRadius: BORDER_RADIUS,
    paddingHorizontal: 8,
    color: '#797979',
    fontSize: 18,
  },
  buttonCurreny: {
    width: '80%'
  },
  hairline: {
    backgroundColor: '#1A273C',
    height: 2,
    width: '100%',
    marginTop: 20

  },
  hairline1: {
    backgroundColor: '#1A273C',
    height: 2,
    width: '100%',
    marginTop: 20
  },
  extraImage: {
    height: 21,
    width: 22,
    marginTop: 20,
    marginLeft: 10
  },
  //ExtaSaveData
  ExtraTouch: {
    marginLeft: 10,
    marginTop: 10
  },
  ExtraView1: {
    flexDirection: 'column',
    width: '50%',
    paddingLeft: 10
  },
  ExtraTouch1: {
    flexDirection: 'column',
    marginTop: 12
  },
  ExtraText1: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'left'
  },
  ExtraText2: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'left'
  },
  ExtraView2: {
    width: '25%',
    paddingTop: 19
  },
  ExtraText3: {
    fontSize: 18,
    color: '#D3BC3F',
    textAlign: 'right'
  }
});