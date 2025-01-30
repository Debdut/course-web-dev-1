// Global constants and variables
const GARBAGE_COLLECTION_INTERVAL = 1000
const ALWAYS_CONNECTED_DOM = { isConnected: true }
const OBJECT_PROTO = Object.getPrototypeOf(ALWAYS_CONNECTED_DOM)
const FUNCTION_PROTO = Object.getPrototypeOf(() => {})

/**
 * @typedef {Object} Binding
 * @property {Function} renderFunction - The function that generates the DOM content based on state.
 * @property {HTMLElement|null} _dom - The DOM element that is bound to the state.
 */

 /**
  * @typedef {Object} Listener
  * @property {Function} func - The function to recompute the derived state.
  * @property {State} state - The state that depends on this listener.
  * @property {HTMLElement|null} _dom - Optional DOM element associated with this listener.
  */

  /**
   * @type {Set<State>|null}
   * Tracks states that are marked for garbage collection.
   * Set to null when no states need to be collected.
   */
  let garbageCollectionStates = new Set()

  /**
   * @type {Set<State>|null}
   * Tracks states whose values have recently changed and require updates.
   * Set to null when no states are pending updates.
   */
  let changedStates = new Set()

  /**
   * @type {Set<State>|null}
   * Tracks states derived from other states, ensuring they are updated as needed.
   * Set to null when there are no derived states to process.
   */
  let derivedStates = new Set()

  /**
   * @typedef {Object} Dependencies
   * @property {Set<State>} _getters - States being accessed for reading during a function's execution.
   * @property {Set<State>} _setters - States being written to during a function's execution.
   */

  /**
   * @type {Dependencies|null}
   * Tracks dependencies (getters and setters) during the execution of a reactive function.
   * Set to null when no function is being tracked.
   */
  let currentDependencies = null

  /**
   * @type {Array<Listener>|null}
   * Tracks listeners (derived states or computations) being created in the current reactive context.
   * Set to null when no new listeners are being tracked.
   */
  let currentNewDerives = []

  /**
   * @type {Object.<string, Function>}
   * A cache for property setters to optimize DOM updates.
   * Keys are property names, and values are setter functions.
   */
  let propertySetterCache = {}

/**
 * Add an item to a Set and schedule a function if it's the first addition.
 * @param {Set} set - The Set to add to.
 * @param {*} item - The item to add.
 * @param {Function} func - The function to schedule.
 * @param {number} waitMs - The delay in milliseconds.
 * @returns {Set} The updated Set.
 */
function addAndScheduleOnFirst(set, item, func, waitMs) {
  if (!set) {
    setTimeout(func, waitMs)
    set = new Set()
  }
  set.add(item)
  return set
}

/**
 * Run a function while capturing dependencies.
 * @param {Function} func - The function to run.
 * @param {Object} dependencies - Dependency tracking object.
 * @param {*} arg - Argument to pass to the function.
 * @returns {*} The result of the function.
 */
function runAndCaptureDependencies(func, dependencies, arg) {
  const previousDependencies = currentDependencies
  currentDependencies = dependencies

  let result
  try {
    result = func(arg)
  } catch (error) {
    console.error(error)
    result = arg
  } finally {
    currentDependencies = previousDependencies
  }

  return result
}

/**
 * Filter bindings or listeners that are still connected to the DOM.
 * @param {Array<Binding|Listener>} list - The list of bindings or listeners to filter.
 * @returns {Array<Binding|Listener>} The filtered list of connected bindings or listeners.
 */
function keepConnected(list) {
  /** @type {Array<Binding|Listener>} */
  for (let item of list) {
    if (item._dom && item._dom.isConnected) {
      filtered.push(item)
    }
  }
  return filtered
}

/**
 * Add states to garbage collection and schedule cleanup.
 * @param {State} state - The state to add.
 */
function addStatesToGarbageCollection(state) {
  garbageCollectionStates = addAndScheduleOnFirst(
    garbageCollectionStates,
    state,
    cleanUpGarbageCollectedStates,
    GARBAGE_COLLECTION_INTERVAL
  )
}

/**
 * Clean up states marked for garbage collection.
 */
function cleanUpGarbageCollectedStates() {
  for (let state of garbageCollectionStates) {
    state._bindings = keepConnected(state._bindings)
    state._listeners = keepConnected(state._listeners)
  }
  garbageCollectionStates = null
}

/**
 * Represents a reactive state in the system.
 */
class State {
  /**
   * Creates a new reactive state.
   * @param {*} initialValue - The initial value of the state.
   */
  constructor(initialValue) {
    this.rawValue = initialValue
    this.oldValue = initialValue

    /**
     * An array of bindings associated with this state.
     * @type {Array<Binding>}
     */
    this._bindings = []

    /**
     * An array of listeners associated with this state.
     * @type {Array<Listener>}
     */
    this._listeners = []
  }

  /**
   * Gets the current value of the state.
   * Adds the state to the current dependencies' getters if tracking is active.
   * @returns {*} The current value of the state.
   */
  get value() {
    if (currentDependencies && currentDependencies._getters) {
      currentDependencies._getters.add(this)
    }
    return this.rawValue
  }

  /**
   * Sets a new value for the state.
   * Triggers updates for bindings and listeners if the value changes.
   * @param {*} newValue - The new value to set.
   */
  set value(newValue) {
    if (currentDependencies && currentDependencies._setters) {
      currentDependencies._setters.add(this)
    }

    if (newValue !== this.rawValue) {
      this.rawValue = newValue

      // Trigger updates for bindings and listeners
      if (this._bindings.length > 0 || this._listeners.length > 0) {
        derivedStates = addAndScheduleOnFirst(derivedStates, this, updateDerivedStates, 0)
        changedStates = addAndScheduleOnFirst(changedStates, this, updateBindings, 0)
      } else {
        this.oldValue = newValue
      }
    }
  }
}

/**
 * Create a new state instance.
 * @param {*} initialValue - The initial value of the state.
 * @returns {State} A new state instance.
 */
function createState(initialValue) {
  return new State(initialValue)
}

/**
 * Update all derived states based on the changes in their dependencies.
 * This function processes `changedStates` and ensures all derived states
 * and listeners are recomputed as needed, up to a safety limit of 100 iterations.
 */
function updateDerivedStates() {
  let iterations = 0

  /**
   * Array of states that require derived updates.
   * @type {Array<State>}
   */
  let derivedArray = []

  // Populate derivedArray with states that have changed
  for (let state of changedStates) {
    if (state.rawValue !== state.oldValue) {
      derivedArray.push(state)
    }
  }

  // Process derived states until no more updates or iteration limit is reached
  do {
    /**
     * A set to collect newly derived states during this iteration.
     * @type {Set<State>}
     */
    const newDerivedStates = new Set()

    // Iterate through the current derivedArray and update listeners
    for (let state of derivedArray) {
      // Filter out disconnected listeners
      state._listeners = keepConnected(state._listeners)

      // Process each listener for the state
      for (let listener of state._listeners) {
        derive(listener.func, listener.state, listener._dom)
        listener._dom = null // Clear the DOM reference after processing
      }
    }

    // Update the derivedStates set for the next iteration
    derivedStates = newDerivedStates

    // Collect states that need further processing
    derivedArray = []
    for (let state of derivedStates) {
      if (state.rawValue !== state.oldValue) {
        derivedArray.push(state)
      }
    }

    iterations++
  } while (iterations < 100 && derivedArray.length > 0)

  // Finalize all changed states
  for (let state of changedStates) {
    state.oldValue = state.rawValue
  }

  // Clear the changedStates set
  changedStates = null
}
