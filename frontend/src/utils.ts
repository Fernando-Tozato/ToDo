/**
 * Converte qualquer enum (numérico ou de string) no seu rótulo formatado.
 *
 * @param enumObj - o objeto do enum (ex: Status)
 * @param value   - o valor do enum (ex: Status.IN_PROGRESS)
 * @returns       - string formatada (ex: "In Progress"), ou "" se não encontrar
 */
export function enumToString<T extends { [k: string]: string | number }>(
	enumObj: T,
	value: T[keyof T]
): string {
	// 1) encontra a chave original do enum
	const entry = Object.entries(enumObj).find(([, v]) => v === value);
	if (!entry) return "";
	
	let key = entry[0]; // ex: "IN_PROGRESS" ou "myEnumValue"
	
	// 2) separa em palavras:
	//    - quebra em espaços antes de letra maiúscula (camelCase)
	//    - depois quebra em partes por _ ou espaços
	const words = key
		.replace(/([a-z0-9])([A-Z])/g, "$1 $2") // camelCase → "my Enum Value"
		.split(/[_\s]+/);                         // snake_case ou espaços
	
	// 3) capitaliza cada palavra
	const pretty = words
		.map(w => {
			const lower = w.toLowerCase();
			return lower.charAt(0).toUpperCase() + lower.slice(1);
		})
		.join(" ");
	
	return pretty;
}


export function formatDateBR(
	date: string | Date,
	options: Intl.DateTimeFormatOptions = {
		day:   "2-digit",
		month: "2-digit",
		year:  "numeric",
		hour:   "2-digit",
		minute: "2-digit",
		timeZone: "America/Sao_Paulo"
	}
): string {
	const dt = typeof date === "string" ? new Date(date) : date;
	return new Intl.DateTimeFormat("pt-BR", options).format(dt);
}


export function parseDateBR(dateString: string): Date {
	const parts = dateString.trim().match(
		/^(\d{2})\/(\d{2})\/(\d{4})(?:[,\s]+(\d{2}):(\d{2}))?$/
	);
	
	if (!parts) {
		throw new Error(
			`Formato inválido: "${dateString}". Use "dd/mm/yyyy" ou "dd/mm/yyyy, HH:mm".`
		);
	}
	
	const [, dd, mm, yyyy, hh = "00", min = "00"] = parts;
	const day   = parseInt(dd,  10);
	const month = parseInt(mm,  10) - 1; // JS Date: 0 = janeiro
	const year  = parseInt(yyyy,10);
	const hour  = parseInt(hh,  10);
	const minute= parseInt(min, 10);
	
	return new Date(year, month, day, hour, minute);
}