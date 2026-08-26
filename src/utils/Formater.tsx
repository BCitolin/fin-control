export function formatCurrency(value: number, type: string) {
    const formated = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

    if (type === 'INCOME') {
        return `+${formated}`
    }

    if (type === 'EXPENSE') {
        return `-${formated.replace('-', '')}`
    }

}

export function maskCurrency(value: string) :string {
    const cleanValue = value.replace(/\D/g, "")

    if(!cleanValue) return ""

    const numberValue = Number(cleanValue)/100

    return new Intl.NumberFormat("pt-BR", {style: 'currency', currency:'BRL'}).format(numberValue)
}

export function formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR').format(date);
}