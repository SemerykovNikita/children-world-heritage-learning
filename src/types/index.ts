export type User = {
	id: number
	email: string
	/**
	 * user name is a email part before '@'
	 */
	username: string
	password: string
}

export type Heritage = {
	id: number
	title: string
	description: string
	imageBlob: string
	userId: number
	dateOfCreation: string
}
