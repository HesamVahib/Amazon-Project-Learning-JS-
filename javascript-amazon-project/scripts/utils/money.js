export function formatCurrency(priceInCent) {
    return (Math.round(priceInCent)/100).toFixed(2);
};

export default formatCurrency;