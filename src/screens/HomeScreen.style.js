import { StyleSheet } from "react-native";
import { theme } from "../constants";

export default StyleSheet.create({
  container: {
    padding: 8,
    position: 'relative',
    zIndex: 40,
    justifyContent: 'center',
    alignContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 32,
    height: 50,
  },
  input: {
    paddingLeft: 8,
    flex: 1,
    padding: 16,
    color: 'white',
    height: 50,
  },
  icon: {
    backgroundColor: theme.bgWhite('0.4'),
    padding: 8,
    borderRadius: 32,
    marginRight: 6,
  },
  searchSuggestionContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'lightgray',
    top: 70,
    left: 8,
    borderRadius: 16,
  },
  searchSuggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
   
  },
  locationName: {
    marginVertical: 32,
    justifyContent: 'center',
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  city: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  state: {
    fontSize: 16,
    color: 'lightgray',
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '20%',
  },
  image: {
    width: 200,
    height: 200,
  },
  degreeCelcius: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  weatherName: {
    color: 'white',
    marginTop: 8,
    fontSize: 16,
  },
  otherStateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  otherState: {
    fontSize: 20,
    color: 'lightgray',
  },
});