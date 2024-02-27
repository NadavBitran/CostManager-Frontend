import Food from '../images/food_image.jpg';
import Health from '../images/health_image.jpg';
import Housing from '../images/housing_image.jpg';
import Travel from '../images/travel_image.jpg'; 
import Education from '../images/education_image.jpg';
import Other from "../images/question_mark_image.jpg";

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
}

const categoryDictionary = {
    'FOOD' :  Food,
    'HEALTH' : Health,
    'HOUSING' : Housing,
    'TRAVEL' : Travel,
    'EDUCATION' : Education,
    'OTHER' : Other
};

const convertToFormattedMonthAndYear = (numberOfMonth, numberOfYear) => `${monthDictionary[numberOfMonth]} ${numberOfYear}`;

const convertToImageOfCategory = (category) => categoryDictionary[category];

export {convertToImageOfCategory, convertToFormattedMonthAndYear}