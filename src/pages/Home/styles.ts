import { StyleSheet } from 'react-native'

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },

    title: {
        width: 334,
        height: 38,
        marginTop: 100,
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 32,
        lineHeight: 38,
        color: '#17171B',
    },

    description: {
        width: 334,
        height: 40,
        marginTop: 10,
        marginBottom: 20,
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 19,
        color: '#747476',
    },

    searchItem: {
        width: 334,
        height: 60,
        marginBottom: 45,
        backgroundColor: '#F2F2F2',
        borderColor: '#F2F2F2',
        borderRadius: 10,
    },

    searchInput: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 16,
        lineHeight: 19,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        display: 'flex'
    }

})