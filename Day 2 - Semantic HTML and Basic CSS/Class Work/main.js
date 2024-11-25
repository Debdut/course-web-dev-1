function useState(initialValue, updater) {
	let value = initialValue
	
	function setValue(f) {
		return function() {
			value = f(value)
			updater(value)
		}
	}

	return [value, setValue]
}

function createElement(tag, value, isUpdate) {
	const element = document.createElement(tag)
	if (value) {
		element.innerText = value
	}

	function update(newValue) {
		element.innerText = newValue
	}

	if (isUpdate) {
		return [element, update]
	}

	return element
}

function Counter() {

	const counter = createElement("counter")
	const incrementButton = createElement("button", "+")
	const decrementButton = createElement("button", "-")
	const [span, spanUpdate] = createElement("span", 5, true)

	counter.appendChild(incrementButton)
	counter.appendChild(span)
	counter.appendChild(decrementButton)

	const [count, setCount] = useState(5, spanUpdate)

	incrementButton.onclick = setCount(x => x+1)
	decrementButton.onclick = setCount(x => x-1)

	return counter
}

document.body.appendChild(Counter())