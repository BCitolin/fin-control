export function formatCurrency(value: number, type: string) {
    const formated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

    if (type === 'INCOME') {
        return `+${formated}`
    }

    if (type === 'EXPENSE') {
        return `-${formated.replace('-', '')}`
    }

}

export function formatDate(dateString: string) {
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day)

    return new Intl.DateTimeFormat('pt-BR').format(date)
}