Array.prototype.at = function(index) {
	if (index > 0 && index < this.length) {
		return this[index]
	}
	if (index < 0 && index < -this.length) {
		return this[index + this.length]
	}
	return undefined
}

/**
 * param {[]} array1
 * returns {[]}
 **/
Array.prototype.concat = function (array1) {
	let concatedArray = []

	for (var i = 0; i < array1.length; i++) {
		const item = array1[i]
		concatedArray.push(...item)
	}

	for (var i = 0; i < array2.length; i++) {
		const item = array2[i]
		concatedArray.push(...item)
	}

	return concatedArray
}


//console.log(concat(array1, array2))


function findIndex(array, fn) {
	for (var i = 0; i < array.length; i++) {
		const item = array[i]
		if(fn(item)) {
			return i
		}
	}
}

//let array = [23, 7, 9, 76, 12, 8]

//console.log(findIndex(array, (x) => x === 76))


function flat(array, depth) {
	let flatedArray = []
	if (depth === 0) {
		return array
	}

	for (var i = 0; i < array.length; i++) {
		const item = array[i]
		if (Array.isArray(item)) {
			let nestedArray = flat(item, depth - 1)
			flatedArray.push(...nestedArray)
		} else if (typeof(item) === 'object') {
			let keys = Object.keys(item)
			let values = Object.values(item)
			for (var i = 0; i < keys.length; i++) {
				const key = keys[i]
				for (var i = 0; i < values.length; i++) {
					let value = values[i]
					flatedArray.push(value)
				}
				flatedArray.push(key)
			}
			flatedArray.push(...keys)
			flatedArray.push(...values)
		} else {
			flatedArray.push(item)
		}
	}

	return flatedArray
}


let array = [2, 3 , 4, 7 , 9] // 0 + 3 = 3

function slice(array, start, end) {
	let slicedArray = []
	if(!(start || end)) { // start and end is false
		return array
	}
	else { // start and end both true
		if (start < 0 && end >= 0) {  // start is negetive and end is positive   
			start = array.length + start // 5 - 2 = 3
			for (var i = 0; i < end; i++) {
				const item = array[i]
				slicedArray.push(item)
		} else {
	 		for (var i = start; i < end ; i++) {
				const item = array[i]
				slicedArray.push(item)
			}
		}
	}
	return slicedArray
}

console.log(slice(array, -1))



function check(var1, var2, var3) {
	if (var1 && (!(var2 && var3))) {
		console.log("I'm Here")
	}

}

!a && !b === !(a || b)
!(a && b)
console.log(check(true, false, false))
console.log(check(true, false, true))

