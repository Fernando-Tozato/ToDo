import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from "@mui/material";
import { type TaskForm, TaskPriority, TaskStatus } from "../data";
import { enumToString, formatDateBR, parseDateBR } from "../utils.ts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale/pt-BR";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useState, useEffect } from "react";

interface TaskDialogProps {
	openDialog: boolean;
	handleCloseDialog: () => void;
	initialFormData?: TaskForm;
	taskId?: bigint;
	setSuccessMessage: React.Dispatch<React.SetStateAction<string>>
	setErrorMessage: React.Dispatch<React.SetStateAction<string>>
	openSuccessAlert: ()=>void;
	openErrorAlert: ()=>void;
	getTasks: () => void;
}

const TaskDialog: React.FC<TaskDialogProps> = ({
	                                               openDialog,
	                                               handleCloseDialog,
	                                               initialFormData,
	                                               taskId,
	                                               openErrorAlert,
	                                               setErrorMessage,
	                                               openSuccessAlert,
	                                               setSuccessMessage,
	                                               getTasks
}) => {
	
	const blankFormData: TaskForm = {
		name: '',
		description: '',
		status: TaskStatus.TO_DO,
		priority: TaskPriority.ALTA,
		dueDate: formatDateBR(new Date())
	}
	
	const [formData, setFormData] = useState<TaskForm>(blankFormData);
	
	const isEditing = Boolean(initialFormData && taskId);
	
	useEffect(() => {
		if (initialFormData && taskId) {
			setFormData(initialFormData);
		} else {
			setFormData(blankFormData);
		}
	}, [initialFormData, taskId]);
	
	const statusKeys = Object
		.keys(TaskStatus)
		.filter(k => isNaN(Number(k))) as Array<keyof typeof TaskStatus>;
	
	const priorityKeys = Object
		.keys(TaskPriority)
		.filter(k => isNaN(Number(k))) as Array<keyof typeof TaskPriority>;
	
	const handleSaveCreate = () => {
		let url: string;
		let method: string;
		
		if (isEditing) {
			url = `http://localhost:8080/api/tasks/${taskId}`;
			method = 'PATCH';
		} else {
			url = 'http://localhost:8080/api/tasks';
			method = 'POST';
		}
		
		fetch(url, {
			method: method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...formData, dueDate: parseDateBR(formData.dueDate) })
		})
			.then(async res => {
				if (!res.ok) {
					setErrorMessage('Erro ao salvar a tarefa');
					openErrorAlert()
					
					const errorText = await res.text();
					throw new Error(errorText);
				}
				else{
					setSuccessMessage('Tarefa criada com sucesso!');
					openSuccessAlert();
				}
				
				getTasks();
				handleCloseDialog();
				return res.json();
			})
	}
	
	return (
		<Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth sx={{gap: 2}}>
			<DialogTitle>{isEditing ? 'Editar' : 'Criar'} Tarefa</DialogTitle>
			<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
				{/* Nome */}
				<TextField
					label="Título"
					variant="outlined"
					fullWidth
					value={formData.name}
					onChange={e =>
						setFormData(prev => ({ ...prev, name: e.target.value }))
					}
				/>
				
				{/* Descrição */}
				<TextField
					label="Descrição"
					variant="outlined"
					fullWidth
					multiline
					minRows={3}
					value={formData.description}
					onChange={e =>
						setFormData(prev => ({ ...prev, description: e.target.value }))
					}
				/>
				
				{/* Status */}
				<FormControl fullWidth>
					<InputLabel id="status-label">Status</InputLabel>
					<Select
						labelId="status-label"
						label="Status"
						value={formData.status}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								status: e.target.value as TaskStatus
							}))
						}
					>
						{statusKeys.map((statusKey) => {
							const value = TaskStatus[statusKey];
							return (
								<MenuItem key={statusKey} value={value}>
									{enumToString(TaskStatus, value)}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				
				{/* Priority */}
				<FormControl fullWidth>
					<InputLabel id="priority-label">Prioridade</InputLabel>
					<Select
						labelId="priority-label"
						label="Prioridade"
						value={formData.priority}
						onChange={e =>
							setFormData(prev => ({
								...prev,
								priority: e.target.value as TaskPriority
							}))
						}
					>
						{priorityKeys.map((priorityKey) => {
							const value = TaskPriority[priorityKey];
							return (
								<MenuItem key={priorityKey} value={value}>
									{enumToString(TaskPriority, value)}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				
				{/* Due Date */}
				<LocalizationProvider
					dateAdapter={AdapterDateFns}
					adapterLocale={ptBR}
				>
					<DateTimePicker
						label="Prazo"
						value={parseDateBR(formData.dueDate)}
						onChange={(newValue) =>
							setFormData(prev => ({
								...prev,
								dueDate: newValue ? formatDateBR(newValue) : ''
							}))
						}
						disablePast
						slotProps={{
							textField: {
								fullWidth: true
							}
						}}
					/>
				</LocalizationProvider>
			</DialogContent>
			
			<DialogActions>
				<Button onClick={handleCloseDialog} color="error">Cancelar</Button>
				<Button onClick={handleSaveCreate} variant="contained" color="primary">Salvar</Button>
			</DialogActions>
		</Dialog>
	)
}

export default TaskDialog;