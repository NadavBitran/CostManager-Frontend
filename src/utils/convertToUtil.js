/* Authors:
* Eyal Chachmishvily 209786094
* Idan Eliyahu 204174155
* Nadav Bitran Numa 325122075
*/

// Importing Matching Category images
import Food from '../images/food_image.jpg';
import Health from '../images/health_image.jpg';
import Housing from '../images/housing_image.jpg';
import Travel from '../images/travel_image.jpg'; 
import Education from '../images/education_image.jpg';
import Other from '../images/question_mark_image.jpg';

// Dictionary for mapping month numbers to month names
const monthDictionary = {
    '1' : 'January',
    '2' : 'February',
    '3' : 'March',
    '4' : 'April',
    '5' : 'May',
    '6' : 'June',
    '7' : 'July',
    '8' : 'August',
    '9' : 'September',
    '10' : 'October',
    '11' : 'November',
    '12' : 'December'
};

// Dictionary for mapping category names to category images
const categoryDictionary = {
    'FOOD' :  Food,
    'HEALTH' : Health,
    'HOUSING' : Housing,
    'TRAVEL' : Travel,
    'EDUCATION' : Education,
    'OTHER' : Other
};

// Function to convert month and year to formatted string
const convertToFormattedMonthAndYear = (numberOfMonth, numberOfYear) => `${monthDictionary[numberOfMonth]} ${numberOfYear}`;

// Function to convert category name to corresponding image
const convertToImageOfCategory = (category) => categoryDictionary[category];

// Exporting the utility functions
export {convertToImageOfCategory, convertToFormattedMonthAndYear};
