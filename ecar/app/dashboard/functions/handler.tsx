/* handleInput() Functions
    All input handling in both
    'Form' components is done by
    the following functions which 
    work in hand with 'session'
    props from 'modules' folder. */

// Custom component imports
import { DashboardImage } from '../components/imports/DashboardImage'
// Custom module imports
var session = require('../modules/session')

// For typed inputs
export function handleInputChange(e: any) {
    const { name, value } = e.target;
    session.setData((prevProps: any) => ({
      ...prevProps,
      [name]: value
    }))
};

// For file (image) inputs
export function handleFileInput(e: any) {
    // Handle file validations
    console.log('handleFileInput triggered')
    session.setImage(e.target.files[0]);  
    // Re-render DashboardImage component
    DashboardImage();
}