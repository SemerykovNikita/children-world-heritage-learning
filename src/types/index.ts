export type User = {
	id: string
	email: string
	/**
	 * user name is a email part before '@'
	 */
	username: string
	password: string
}
