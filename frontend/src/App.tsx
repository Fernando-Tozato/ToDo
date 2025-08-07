import { useEffect, useState } from "react";
import { Alert, AlertTitle, Container, Fab, Grid, IconButton, Paper, Snackbar, Stack, Typography } from '@mui/material';
import { type Task, TaskStatus } from "./data";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { TaskItem, TaskDialog } from './components';
import { useTheme } from "@mui/material/styles";


function App() {
	const theme = useTheme();
	
	const [todo_tasks, setTodoTasks] = useState<Task[]>([]);
	const [in_progress_tasks, setInProgressTasks] = useState<Task[]>([]);
	const [completed_tasks, setCompletedTasks] = useState<Task[]>([]);
	const [cancelled_tasks, setCancelledTasks] = useState<Task[]>([]);
	
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenCreateDialog = () => setOpenDialog(true);
	const handleCloseCreateDialog = () => setOpenDialog(false);
	
	const [errorAlertMessage, setErrorAlertMessage] = useState('');
	const [openErrorAlert, setOpenErrorAlert] = useState(false);
	const handleOpenErrorAlert = () => setOpenErrorAlert(true);
	const handleCloseErrorAlert = () => setOpenDialog(false);
	
	const [successAlertMessage, setSuccessAlertMessage] = useState('');
	const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
	const handleOpenSuccessAlert = () => setOpenSuccessAlert(true);
	const handleCloseSuccessAlert = () => setOpenSuccessAlert(false);
	
	const getTasks = () => {
		fetch('http://localhost:8080/api/tasks')
			.then(res => res.json())
			.then(tasks => {
				let tasks0: Task[] = [];
				let tasks1: Task[] = [];
				let tasks2: Task[] = [];
				let tasks3: Task[] = [];
				
				tasks.forEach((task: Task) => {
					switch (task.status) {
						case TaskStatus.TO_DO:
							tasks0.push(task);
							break;
						
						case TaskStatus.EM_PROGRESSO:
							tasks1.push(task);
							break;
						
						case TaskStatus.COMPLETO:
							tasks2.push(task);
							break;
						
						case TaskStatus.CANCELADO:
							tasks3.push(task);
							break;
					}
				});
				
				setTodoTasks(tasks0);
				setInProgressTasks(tasks1);
				setCompletedTasks(tasks2);
				setCancelledTasks(tasks3);
			})
			.catch(err => console.error(err));
	}
	
	
	useEffect(() => {getTasks()}, []);
	
	return (
		<div className="MainDiv">
			<Container fixed sx={{marginY: 15}}>
				
				{/* ===== Task Grid ===== */}
				<Grid container spacing={2}>
					<Grid size={{ xs: 3 }}>
						<Paper sx={{
							p: 2,
							backgroundColor: theme.palette.status.cancelled,
							color: theme.palette.getContrastText(theme.palette.status.cancelled)
						}}>
							<Stack spacing={1}>
								<Typography variant="h4">
									Cancelado
								</Typography>
								{cancelled_tasks.map((task) => (
									<TaskItem
										key={task.id}
										task={task}
										openErrorAlert={handleOpenErrorAlert}
										setErrorMessage={setErrorAlertMessage}
										openSuccessAlert={handleOpenSuccessAlert}
										setSuccessMessage={setSuccessAlertMessage}
										getTasks={getTasks}
									/>
								))}
							</Stack>
						</Paper>
					</Grid>
					
					<Grid size={{ xs: 3 }}>
						<Paper sx={{
							p: 2,
							backgroundColor: theme.palette.status.todo,
							color: theme.palette.getContrastText(theme.palette.status.todo)
						}}>
							<Stack spacing={1}>
								<Typography variant="h4">
									To Do
								</Typography>
								{todo_tasks.map((task) => (
									<TaskItem
										key={task.id}
										task={task}
										openErrorAlert={handleOpenErrorAlert}
										setErrorMessage={setErrorAlertMessage}
										openSuccessAlert={handleOpenSuccessAlert}
										setSuccessMessage={setSuccessAlertMessage}
										getTasks={getTasks}
									/>
								))}
							</Stack>
						</Paper>
					</Grid>
					
					<Grid size={{ xs: 3 }}>
						<Paper sx={{
							p: 2,
							backgroundColor: theme.palette.status.inProgress,
							color: theme.palette.getContrastText(theme.palette.status.inProgress)
						}}>
							<Stack spacing={1}>
								<Typography variant="h4">
									Em Progresso
								</Typography>
								{in_progress_tasks.map((task) => (
									<TaskItem
										key={task.id}
										task={task}
										openErrorAlert={handleOpenErrorAlert}
										setErrorMessage={setErrorAlertMessage}
										openSuccessAlert={handleOpenSuccessAlert}
										setSuccessMessage={setSuccessAlertMessage}
										getTasks={getTasks}
									/>
								))}
							</Stack>
						</Paper>
					</Grid>
					
					<Grid size={{ xs: 3 }}>
						<Paper sx={{
							p: 2,
							backgroundColor: theme.palette.status.completed,
							color: theme.palette.getContrastText(theme.palette.status.completed)
						}}>
							<Stack spacing={1}>
								<Typography variant="h4">
									Completo
								</Typography>
								{completed_tasks.map((task) => (
									<TaskItem
										key={task.id}
										task={task}
										openErrorAlert={handleOpenErrorAlert}
										setErrorMessage={setErrorAlertMessage}
										openSuccessAlert={handleOpenSuccessAlert}
										setSuccessMessage={setSuccessAlertMessage}
										getTasks={getTasks}
									/>
								))}
							</Stack>
						</Paper>
					</Grid>
				</Grid>
				
				
				{/* ===== FAB ===== */}
				<Fab variant="extended" color="primary" onClick={handleOpenCreateDialog} sx={theme => ({position: 'fixed', bottom: theme.spacing(4), right:  theme.spacing(4), zIndex: theme.zIndex.tooltip})}>
					<AddIcon sx={{ mr: 1 }} />
					Adicionar Tarefa
				</Fab>
				
				{/* ===== Create Dialog ===== */}
				<TaskDialog
					openDialog={openDialog}
					handleCloseDialog={handleCloseCreateDialog}
					setSuccessMessage={setSuccessAlertMessage}
					setErrorMessage={setErrorAlertMessage}
					openSuccessAlert={handleOpenSuccessAlert}
					openErrorAlert={handleOpenErrorAlert}
					getTasks={getTasks}
				/>
				
				{/* ===== Alerts ===== */}
				<Snackbar open={openErrorAlert} autoHideDuration={10000} onClose={handleCloseErrorAlert}>
					<Alert
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={handleCloseErrorAlert}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
						severity="error"
						variant="filled"
					>
						<AlertTitle>Erro!</AlertTitle>
						{errorAlertMessage}
					</Alert>
				</Snackbar>
				<Snackbar open={openSuccessAlert} autoHideDuration={10000} onClose={handleCloseSuccessAlert}>
				<Alert
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={handleCloseSuccessAlert}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					severity="success"
					variant="filled"
				>
					<AlertTitle>Sucesso!</AlertTitle>
					{successAlertMessage}
				</Alert>
			</Snackbar>
			</Container>
		</div>
	)
}

export default App
