import { StyleSheet } from 'react-native';




export default StyleSheet.create({
    // $underlayColor: '#E2E2E2',
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  text: {
    color: '#343434',
    fontSize: 16,
  },
  separator: {
    backgroundColor: '#E2E2E2',
    height: StyleSheet.hairlineWidth,
    flex: 1,
    marginLeft: 20,
  },
  icon: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconVisible: {
    backgroundColor: '#4F6D7A',
  },
  checkIcon: {
    width: 18,
  },

});