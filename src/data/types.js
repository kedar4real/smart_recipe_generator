/**
 * @typedef {Object} Ingredient
 * @property {string} name
 * @property {number} amount
 * @property {string} unit
 * @property {string} [notes]
 */

/**
 * @typedef {Object} Nutrition
 * @property {number} calories
 * @property {number} protein
 * @property {number} carbs
 * @property {number} fat
 * @property {number} fiber
 * @property {number} sodium
 */

/**
 * @typedef {Object} Recipe
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} image
 * @property {string} cuisine
 * @property {string} difficulty
 * @property {number} prepTime
 * @property {number} cookTime
 * @property {number} totalTime
 * @property {number} servings
 * @property {Ingredient[]} ingredients
 * @property {string[]} instructions
 * @property {Nutrition} nutrition
 * @property {string[]} dietary
 * @property {string[]} tags
 * @property {string[]} coreIngredients
 * @property {string} createdAt
 */

export {}
