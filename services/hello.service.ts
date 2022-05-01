const getHello = async ():Promise<string> => {
	// throw new Error('Hello Error')
	return 'Hello,World!'
}

export default {
	getHello,
}