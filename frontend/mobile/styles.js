import { StyleSheet } from 'react-native';

const errColor = '#b71c1c';

export const globalStyles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        alignItems: 'center'
    },
    sectionContainer: {
        backgroundColor: 'white',
        borderRadius: 6,
        borderWidth: 3,
        width: '85%',
        alignItems: 'center',
        marginTop: 32,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24
    },
    fieldHeadingText: {
        fontSize: 20,
        fontFamily: 'roboto',
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
        marginTop: 16
    },
    fieldErrorText: {
        fontSize: 12,
        fontFamily: 'roboto',
        fontWeight: 'bold',
        color: errColor,
        textAlign: 'center',
        marginTop: 4
    },
    fieldErrorBorderColor: {
        color: errColor
    },
    serverErrorText: {
        fontSize: 18,
        fontFamily: 'roboto',
        fontWeight: 'bold',
        color: errColor,
        textAlign: 'center',
        marginTop: 16
    },
    textInput: {
        height: 40,
        fontFamily: 'roboto',
        width: '100%',
        borderRadius: 6,
        borderWidth: 1,
        fontSize: 16,
        textAlign: 'center'
    }
});