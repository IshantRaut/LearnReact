import { useState, useEffect } from 'react' // Import useEffect for initial conversion
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)
  
  // Function to swap 'from' and 'to' currencies
  const swap = () => {
    setFrom(to)
    setTo(from)
    // When swapping, the amount should remain the same, and the converted amount should be recalculated
    // The previous 'convertedAmount' becomes the new 'amount' for the 'from' currency.
    // The previous 'amount' becomes the new 'convertedAmount' for the 'to' currency.
    setAmount(convertedAmount) // The amount in the 'from' box becomes the previously converted amount
    setConvertedAmount(amount) // The amount in the 'to' box becomes the previous 'from' amount
  }
  
  // Function to perform the currency conversion
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  // Use useEffect to perform an initial conversion or whenever 'amount', 'from', or 'to' changes
  useEffect(() => {
    convert();
  }, [amount, from, to]); // Dependencies: re-run when amount, from, or to changes
  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount} // Display the 'amount' state
                            currencyOptions={options} // Pass available currency options
                            onCurrencyChange={(currency) => setFrom(currency)} // Update 'from' currency when changed
                            selectCurrency={from} // Set the selected 'from' currency
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options} // Pass available currency options
                            onCurrencyChange={(currency) => setTo(currency)} // Update 'to' currency when changed
                            selectCurrency={to} // Set the selected 'to' currency (was 'from', corrected to 'to')
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default App
