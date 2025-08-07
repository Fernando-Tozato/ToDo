import React, { type MouseEvent, useState } from "react";
import type { Task } from "../data";
import { TaskPriority } from "../data";
import { enumToString, formatDateBR } from "../utils";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle, Divider,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Paper,
	Typography
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskDialog from "./TaskDialog.tsx";

interface TaskItemProps {
	task: Task;
	setSuccessMessage: React.Dispatch<React.SetStateAction<string>>
	setErrorMessage: React.Dispatch<React.SetStateAction<string>>
	openSuccessAlert: ()=>void;
	openErrorAlert: ()=>void;
	getTasks: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, openErrorAlert, setErrorMessage, openSuccessAlert, setSuccessMessage, getTasks }) => {
	// MENU
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);
	const handleMenuOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);
	
	// CONFIRM DELETE DIALOG
	const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
	const handleConfirmOpen = () => setOpenConfirmDelete(true);
	const handleConfirmClose = () => setOpenConfirmDelete(false);
	const handleDeleteTask = () => {
		fetch(`http://localhost:8080/api/tasks/${task.id}`, {
			method: 'DELETE',
		})
			.then(async res => {
				if (!res.ok) {
					setErrorMessage('Erro ao deletar a tarefa');
					openErrorAlert();
					
					const errorText = await res.text();
					throw new Error(errorText);
				}
				else {
					setSuccessMessage('Tarefa deletada com sucesso');
					openSuccessAlert();
				}
				
				getTasks();
				handleConfirmClose();
				return res.json();
			})
	}
	
	// EDIT DIALOG
	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);
	const formData = {
		id: task.id,
		name: task.name,
		description: task.description,
		status: task.status,
		priority: task.priority,
		dueDate: formatDateBR(task.dueDate)
	}
	
	
	return (
		<>
			<Paper sx={{ p: 2, backgroundColor: '#323232CC', position: 'relative' }}>
				<IconButton
					size="small"
					onClick={handleMenuOpen}
					sx={{ position: 'absolute', top: 8, right: 8 }}
				>
					<MoreVertIcon fontSize="small" />
				</IconButton>
				
				<Typography variant="h6">{task.name}</Typography>
				<Divider/>
				<Typography variant="body1" color="textSecondary" sx={{ marginY: 1 }}>
					{task.description}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					Prioridade: {enumToString(TaskPriority, task.priority)}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					Prazo: {formatDateBR(task.dueDate)}
				</Typography>
				
				<Menu
					anchorEl={anchorEl}
					open={openMenu}
					onClose={handleMenuClose}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				>
					<MenuItem
						onClick={() => {
							handleOpenDialog()
							handleMenuClose();
						}}
					>
						<ListItemIcon>
							<EditIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>Editar</ListItemText>
					</MenuItem>
					
					<MenuItem
						onClick={() => {
							handleConfirmOpen();
							handleMenuClose();
						}}
					>
						<ListItemIcon>
							<DeleteIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>Deletar</ListItemText>
					</MenuItem>
				</Menu>
			</Paper>
			
			<Dialog open={openConfirmDelete} onClose={handleConfirmClose}>
				<DialogTitle>Deletar Tarefa</DialogTitle>
				<DialogContent>
					Você tem certeza que deseja deletar a tarefa "{task.name}"?
				</DialogContent>
				<DialogActions>
					<Button onClick={handleConfirmClose} color="primary">Cancelar</Button>
					<Button onClick={handleDeleteTask} variant="contained" color="error">Deletar</Button>
				</DialogActions>
			</Dialog>
			
			<TaskDialog
				openDialog={openDialog}
				handleCloseDialog={handleCloseDialog}
				setSuccessMessage={setSuccessMessage}
				setErrorMessage={setErrorMessage}
				openSuccessAlert={openSuccessAlert}
				openErrorAlert={openErrorAlert}
				getTasks={getTasks}
				taskId={task.id}
				initialFormData={formData}
			/>
		</>
	);
};

export default TaskItem;
