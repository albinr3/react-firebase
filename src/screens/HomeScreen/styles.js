import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonUpdate: {
    height: 28,
    borderRadius: 5,
    backgroundColor: '#00FF00',
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
    padding: 5
  },
  buttonDelete: {
    height: 28,
    borderRadius: 5,
    backgroundColor: '#dc0000',
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
    padding: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  listContainer: {
    marginTop: 20,
    padding: 20
  },
  entityContainer: {
    marginTop: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 16,
    flexDirection: 'row'
  },
  entityText: {
    fontSize: 20,
    color: '#333'
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginTop: 40,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
})