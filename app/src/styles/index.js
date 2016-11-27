const Styles = {
    menuView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: 20
    },
    playButton: {
        height: 40,
        borderRadius: 5
    },
    playButtonText: {
        fontSize: 18,
        color: 'white'
    },
    gameContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    gameBoard: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 20

    },
    gameSquare: {
        width: 120,
        height: 120,
        borderWidth: 2,
        borderColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameBoxText: {
        fontSize: 40
    },
    gameOverContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameOverText: {
        fontSize: 36
    },
    finishButton: {
        padding: 19
    }

}

export default Styles;