import styles from './index.module.scss'

type Props = {
	children: React.ReactNode
} & React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

export const Form = ({ children, ...props }: Props) => {
	return (
		<form {...props} className={styles.form}>
			{children}
		</form>
	)
}
