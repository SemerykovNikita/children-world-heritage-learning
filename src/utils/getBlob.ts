export const getBlob = (file: FileList) => {
	const reader = new FileReader()
	return new Promise<string | undefined>((resolve, reject) => {
		reader.onload = () => resolve(reader.result?.toString())
		reader.onerror = reject
		reader.readAsDataURL(file[0])
	})
}
