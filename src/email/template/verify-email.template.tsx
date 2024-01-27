import { FC } from 'react'
import { Html } from '@react-email/html'
import * as React from 'react'
import { Paper } from '@mui/material'

interface IProps {
	username: string
}

export const VerifyEmailTemplate: FC<IProps> = ({
													username
												}) => {

	return (
		<Html>
			<Paper elevation={2} sx={{ padding: '20px' }}>

			</Paper>
		</Html>
	)
}