export type User = {
	id: number
	email: string
	/**
	 * user name is a email part before '@'
	 */
	username: string
	password: string
}
