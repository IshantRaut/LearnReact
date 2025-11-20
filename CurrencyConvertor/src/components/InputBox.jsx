import React, {useId} from 'react'

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
   const amountInputId = useId() // Generates a unique ID for the input field for accessibility

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId}  className="text-black/40 mb-2 inline-block">
                    {label} {/* Label for the input box (e.g., "From", "To") */}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount} // Current amount displayed in the input
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))} // Calls onAmountChange prop when input value changes, converting to a number
                />
            </div>
            <div className="w-1/2 flex flex-col flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p> {/* Label for the currency selection */}
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency} // Currently selected currency
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)} // Calls onCurrencyChange prop when currency selection changes
                    disabled={currencyDisable} // Disables the currency selection if true
                >
                    
                        {currencyOptions.map((currency) => ( // Maps through currency options to create <option> elements
                            <option key={currency} value={currency}>
                            {currency}
                            </option>
                        ))}
                
                </select>
            </div>
        </div>
    );
}

export default InputBox;