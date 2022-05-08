import { StyleSheet } from 'react-native';

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
    textInput: {
        height: 40,
        fontFamily: 'roboto',
        width: '100%',
        borderRadius: 6,
        borderWidth: 1,
        fontSize: 16,
        textAlign: 'center'
    },
    buttonText: {
        fontFamily: 'roboto',
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        marginTop: 8
    }
});